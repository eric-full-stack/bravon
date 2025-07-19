import { NextResponse } from "next/server";
import { PostHog } from "posthog-node";
import path from "path";
import fs from "fs";
import mime from "mime-types";
import crypto from "crypto";

function getPosthogClient() {
  const posthogClient = new PostHog(
    process.env.NEXT_PUBLIC_POSTHOG_KEY_EVENT!,
    {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST_EVENT,
      flushAt: 1,
      flushInterval: 0,
    },
  );
  return posthogClient;
}

export async function GET(
  req: Request,
  { params }: { params: { slug: string[] } },
) {
  const { searchParams } = new URL(req.url);
  const phone = searchParams.get("phone");

  const slug = params.slug.join("/");
  const distinctId = phone || `anonymous_${crypto.randomUUID()}`;

  const posthog = getPosthogClient();
  posthog.capture({
    distinctId: distinctId,
    event: "file_downloaded",
    properties: {
      file_path: slug,
    },
  });
  await posthog.shutdown();

  const filePath = path.join(process.cwd(), "public", "files", slug);

  try {
    const fileBuffer = fs.readFileSync(filePath);
    const mimeType = mime.lookup(filePath) || "application/octet-stream";
    const fileName = path.basename(filePath);

    // Slugify the filename to remove non-ASCII characters
    const sanitizedFileName = fileName
      .normalize("NFD") // Decompose accented characters
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
      .replace(/[^a-zA-Z0-9.\-_\s]/g, "") // Remove remaining non-safe characters
      .replace(/\s+/g, "_"); // Replace spaces with underscores

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `inline; filename="${sanitizedFileName}"`,
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("File not found.", { status: 404 });
  }
}
