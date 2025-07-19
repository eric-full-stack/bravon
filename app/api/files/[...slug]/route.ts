import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
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
  const { userId } = auth();

  const slug = params.slug.join("/");
  const distinctId = userId || `anonymous_${crypto.randomUUID()}`;

  const posthog = getPosthogClient();
  posthog.capture({
    distinctId: distinctId,
    event: "file_downloaded",
    properties: {
      file_path: slug,
      is_anonymous: !userId,
    },
  });
  await posthog.shutdown();

  const filePath = path.join(process.cwd(), "public", "files", slug);

  try {
    const fileBuffer = fs.readFileSync(filePath);
    const mimeType = mime.lookup(filePath) || "application/octet-stream";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `inline; filename="${path.basename(filePath)}"`,
      },
    });
  } catch (error) {
    return new NextResponse("File not found.", { status: 404 });
  }
}
