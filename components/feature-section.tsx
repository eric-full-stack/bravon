import {
  BarChartHorizontal,
  Box,
  Calendar,
  MessageCircle,
  Send,
  User2,
} from "lucide-react";
import { Balancer } from "react-wrap-balancer";
import { Button } from "./ui/button";
import Link from "next/link";

const features = [
  {
    name: "Cadastro de Alunos",
    description:
      "Organize e gerencie seus alunos de maneira eficaz. Com a Bravon, o cadastro de alunos é simples e intuitivo, permitindo que você mantenha as informações de todos os seus alunos em um só lugar.",
    icon: <User2 />,
  },
  {
    name: "Gerenciamento de Planos de Treinamento",
    description:
      "Crie planos de treinamento personalizados para cada aluno. A nossa plataforma facilita o acompanhamento do progresso dos alunos e a adaptação dos planos conforme necessário.",
    icon: <Box />,
  },
  {
    name: "Agendamento de Aulas",
    description:
      "Agende aulas com seus alunos de maneira simples e rápida. A Bravon permite que você agende aulas com seus alunos e envie notificações para eles.",
    icon: <Calendar />,
  },
  {
    name: "Notificações via WhatsApp",
    description:
      "Envie notificações para seus alunos via WhatsApp. A Bravon permite que você envie notificações para seus alunos e que eles interejam com as notificações, tudo via WhatsApp, facilitando muito a comunicação.",
    icon: <Send />,
  },
  {
    name: "Feedbacks de Aulas",
    description:
      "Facilite a comunicação com seus alunos oferecendo feedbacks de maneira simples e rápida. A Bravon permite que você compartilhe observações e sugestões com seus alunos, e também que eles interajam com esses feedbacks, tudo através do WhatsApp.",
    icon: <MessageCircle />,
  },
  {
    name: "Relatórios Detalhados",
    description:
      "Acompanhe o desempenho do seu negócio e do seu aluno com relatórios detalhados. A Bravon oferece uma visão clara do progresso dos alunos e fornece insights sobre o rendimento do seu negócio, facilitando a tomada de decisões e planejamento futuro.",
    icon: <BarChartHorizontal />,
  },
];

export default function FeatureSection() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900" id="sobre">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Alavanque sua gestão de aulas e alunos com a Bravon
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Com a Bravon, você tem uma plataforma poderosa e fácil de usar que
            leva sua gestão de aulas e alunos a novos patamares. Organize seus
            alunos, crie planos de treinamento personalizados, agende aulas e se
            comunique de maneira eficiente com seus alunos, tudo em uma única
            solução integrada.
          </p>
        </div>
        <div className="mt-20">
          <dl className="space-y-10 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10 md:space-y-0">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-primary text-white">
                    {feature.icon}
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                    <Balancer>{feature.name}</Balancer>
                  </p>
                </dt>
                <dd className="ml-16 mt-2 text-base text-gray-500 dark:text-gray-400">
                  <Balancer>{feature.description}</Balancer>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-12 flex items-center justify-center">
          <Link href="/sign-up">
            <Button className="mt-8 text-lg" variant="default">
              Comece com a Bravon agora
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
