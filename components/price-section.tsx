import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

const plans = [
  {
    name: "Automação Empresarial Completa",
    description: "Transforme sua empresa com inteligência artificial",
    price: "Sob consulta",
    features: [
      "Automação personalizada de WhatsApp e Telegram",
      "Agentes de IA customizados para seu negócio",
      "Integração completa com CRMs e ERPs",
      "Automação Google Workspace (Drive, Sheets, Gmail)",
      "Processos internos 100% automatizados",
      "Monitoramento e relatórios em tempo real",
      "Suporte técnico especializado 24/7",
      "Implementação e treinamento inclusos",
    ],
  },
];

export default function PriceSection() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900" id="precos">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Invista na transformação digital
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Cada empresa é única. Por isso, criamos soluções de automação
            personalizadas que se adaptam perfeitamente às suas necessidades específicas.
          </p>
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
          {plans.map((plan) => (
            <Card key={plan.name} className="max-w-md">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{plan.price}</div>
                <p className="text-xs text-gray-600">Projeto personalizado</p>
              </CardContent>
              <CardContent>
                <ul className="list-inside list-disc space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="text-gray-600">
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="#contato" className="w-full">
                  <Button className="w-full">Solicitar Orçamento</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            💡 Oferecemos consultoria gratuita para avaliar suas necessidades
            e apresentar a melhor solução de automação para sua empresa.
          </p>
        </div>
      </div>
    </div>
  );
}
