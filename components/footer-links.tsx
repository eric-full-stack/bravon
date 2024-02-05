import Link from "next/link";

import { Separator } from "@/components/ui/separator";

export function FooterLinks() {
  return (
    <div className="mb-5 flex h-5 w-full items-center justify-center space-x-2 text-sm">
      <Link href="/#contato">Contato</Link>
      <Separator orientation="vertical" />
      <Link href="/termos-de-uso">Privacidade e termos</Link>
    </div>
  );
}
