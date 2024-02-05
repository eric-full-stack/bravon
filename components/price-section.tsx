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
    name: "Plano Premium Bravon",
    description: "A solução definitiva para o seu ensino esportivo",
    price: "Apenas R$ 197,90",
    features: [
      "Gerencie alunos sem limites",
      "Crie turmas sem restrições",
      "Desenvolva planos de treino ilimitados",
      "Envie quantas mensagens precisar",
      "Acesso a suporte prioritário e exclusivo",
    ],
  },
];

export default function PriceSection() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900" id="precos">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Invista em sua carreira
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Adote o Plano Premium Bravon e leve o seu ensino esportivo ao
            próximo nível
          </p>
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
          {plans.map((plan) => (
            <Card key={plan.name}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{plan.price}</div>
                <p className="text-xs text-gray-600">por mês</p>
              </CardContent>
              <CardContent>
                <ul className="list-inside list-disc">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="text-gray-600">
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link
                  href="https://buy.stripe.com/7sI16YcNo1Wu81i144"
                  target="_blank"
                >
                  <Button className="w-full">Começar</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
