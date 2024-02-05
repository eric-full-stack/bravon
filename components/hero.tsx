import { Button } from "@/components/ui/button";
import { LogoText } from "./logo";
import Link from "next/link";
import { Balancer } from "react-wrap-balancer";

export default function Hero() {
  return (
    <div className="flex min-h-fit  flex-col items-center justify-center py-20 md:py-36">
      <h1 className="text-center text-4xl font-bold text-gray-900">
        <Balancer>
          <span className="text-primary">Eleve</span> seu ensino de esportes ao
          próximo nível com a <LogoText />
        </Balancer>
      </h1>
      <h2 className="mt-5 text-center text-2xl font-medium text-gray-600">
        <Balancer>
          Gerencie aulas, acompanhe alunos e desenvolva planos de treinamento
          eficazes - tudo em um único lugar. Junte-se à revolução do
          gerenciamento esportivo agora!
        </Balancer>
      </h2>
      <Link href="/sign-up">
        <Button className="mt-8" variant="default">
          Comece sua jornada agora
        </Button>
      </Link>
    </div>
  );
}
