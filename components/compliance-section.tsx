import { Shield, Lock, CheckCircle, Award } from "lucide-react";
import { Balancer } from "react-wrap-balancer";
import Link from "next/link";

const complianceFeatures = [
    {
        name: "Conformidade LGPD",
        description:
            "Totalmente em conformidade com a Lei Geral de Proteção de Dados brasileira. Seus dados comerciais são tratados com máxima segurança e transparência.",
        icon: <Shield />,
    },
    {
        name: "Segurança Empresarial",
        description:
            "Seguimos rigorosamente os mais altos padrões de segurança da informação e implementamos as melhores práticas de proteção de dados corporativos.",
        icon: <Lock />,
    },
    {
        name: "Transparência Total",
        description:
            "Fornecemos total transparência sobre nossos processos, metodologias e como desenvolvemos as automações para sua empresa.",
        icon: <CheckCircle />,
    },
    {
        name: "Empresa Certificada",
        description:
            "Empresa legalmente constituída com CNPJ ativo, seguindo todas as regulamentações brasileiras para prestação de serviços de tecnologia.",
        icon: <Award />,
    },
];

export default function ComplianceSection() {
    return (
        <div className="bg-white" id="seguranca">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Confiança e Credibilidade em Primeiro Lugar
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                        Sua confiança é fundamental. Por isso, somos uma empresa séria,
                        legalmente constituída e comprometida com os mais altos padrões
                        de qualidade e segurança em nossos serviços.
                    </p>
                </div>

                <div className="mt-20">
                    <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
                        {complianceFeatures.map((feature) => (
                            <div key={feature.name} className="relative">
                                <dt>
                                    <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-green-600 text-white">
                                        {feature.icon}
                                    </div>
                                    <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                                        <Balancer>{feature.name}</Balancer>
                                    </p>
                                </dt>
                                <dd className="ml-16 mt-2 text-base text-gray-500">
                                    <Balancer>{feature.description}</Balancer>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <div className="mt-16 rounded-lg bg-gray-50 p-8">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            Compromisso com a Excelência
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Trabalhamos apenas com tecnologias confiáveis e seguimos todas as
                            melhores práticas do mercado. Nossos processos são transparentes
                            e você terá total visibilidade sobre o desenvolvimento das suas automações.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/privacy"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <Shield className="mr-2 h-4 w-4" />
                                Política de Privacidade
                            </Link>
                            <Link
                                href="/terms"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Termos de Serviço
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 