import { Button } from "@/components/ui/button";
import { LogoText } from "./logo";
import Link from "next/link";
import { Balancer } from "react-wrap-balancer";

export default function Hero() {
  return (
    <div className="flex min-h-fit  flex-col items-center justify-center py-20 md:py-36">
      <h1 className="text-center text-4xl font-bold text-gray-900">
        <Balancer>
          <span className="text-primary">Automatize</span> seus processos empresariais com
          inteligência artificial na <LogoText />
        </Balancer>
      </h1>
      <h2 className="mt-5 text-center text-2xl font-medium text-gray-600">
        <Balancer>
          Transforme sua empresa com automações inteligentes que conectam WhatsApp,
          Telegram, CRMs, Google Drive e muito mais - tudo integrado e funcionando 24/7.
        </Balancer>
      </h2>
      <Link href="#contato">
        <Button className="mt-8" variant="default">
          Automatize sua empresa agora
        </Button>
      </Link>
    </div>
  );
}
