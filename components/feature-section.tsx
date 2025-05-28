import {
  Bot,
  MessageSquare,
  Workflow,
  Zap,
  Brain,
  Globe,
} from "lucide-react";
import { Balancer } from "react-wrap-balancer";
import { Button } from "./ui/button";
import Link from "next/link";

const features = [
  {
    name: "Automação de WhatsApp e Telegram",
    description:
      "Crie chatbots inteligentes e automações completas para WhatsApp e Telegram. Responda clientes automaticamente, envie campanhas personalizadas e integre com seus sistemas internos.",
    icon: <MessageSquare />,
  },
  {
    name: "Agentes de IA Personalizados",
    description:
      "Desenvolva agentes de inteligência artificial customizados para sua empresa. Desde atendimento ao cliente até análise de dados, nossos agentes trabalham 24/7 para otimizar seus processos.",
    icon: <Brain />,
  },
  {
    name: "Integração com CRMs e ERPs",
    description:
      "Conecte automaticamente seus sistemas de gestão. Sincronize dados entre CRMs, ERPs, planilhas e outras plataformas, eliminando trabalho manual e reduzindo erros.",
    icon: <Workflow />,
  },
  {
    name: "Automação Google Workspace",
    description:
      "Automatize processos no Google Drive, Sheets, Gmail e Calendar. Organize documentos automaticamente, gere relatórios dinâmicos e sincronize informações em tempo real.",
    icon: <Globe />,
  },
  {
    name: "Processos Internos Inteligentes",
    description:
      "Transforme processos manuais em fluxos automatizados. Desde aprovações até geração de documentos, nossa IA cuida de tudo enquanto você foca no que realmente importa.",
    icon: <Zap />,
  },
  {
    name: "Monitoramento e Relatórios",
    description:
      "Acompanhe o desempenho de todas as automações em tempo real. Receba relatórios detalhados sobre eficiência, economia de tempo e ROI das implementações.",
    icon: <Bot />,
  },
];

export default function FeatureSection() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900" id="sobre">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Revolucione sua empresa com automação inteligente
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Com a Bravon, você tem acesso a soluções de automação empresarial
            de última geração. Conectamos sistemas, automatizamos processos e
            implementamos inteligência artificial para transformar completamente
            a eficiência da sua empresa.
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
          <Link href="#contato">
            <Button className="mt-8 text-lg" variant="default">
              Comece sua transformação digital
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
