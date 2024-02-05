import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function ContactSection() {
  return (
    <div className="pb-16" id="contato">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Conecte-se à Bravon
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Pronto para levar seu ensino esportivo ao próximo nível? Vamos
            conversar! Estamos ansiosos para mostrar como a Bravon pode
            alavancar sua carreira de forma surpreendente. Entre em contato e dê
            o primeiro passo rumo ao sucesso!
          </p>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-center">
        <Link href="https://wa.me/5549991065193" target="_blank">
          <Button className="text-lg" variant="default">
            <MessageCircle />
            Fale com a Bravon
          </Button>
        </Link>
      </div>
    </div>
  );
}
