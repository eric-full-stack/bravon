import { Separator } from "@/components/ui/separator";
import { lpConfig } from "@/config/site";

export default function PrivacyPolicy() {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-16">
            <h1 className="mb-8 text-4xl font-bold text-gray-900">
                Política de Privacidade
            </h1>

            <div className="space-y-8 text-gray-700">
                <section>
                    <p className="mb-4 text-sm text-gray-500">
                        Última atualização: {new Date().toLocaleDateString('pt-BR')}
                    </p>
                    <p className="mb-6">
                        A Bravon (&ldquo;nós&rdquo;, &ldquo;nosso&rdquo; ou &ldquo;empresa&rdquo;) está comprometida em proteger
                        sua privacidade. Esta Política de Privacidade explica como coletamos,
                        usamos, divulgamos e protegemos suas informações quando você utiliza
                        nosso site e serviços de automação empresarial.
                    </p>
                </section>

                <Separator />

                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                        1. Informações que Coletamos
                    </h2>

                    <h3 className="mb-3 text-xl font-medium text-gray-800">
                        1.1 Informações de Contato
                    </h3>
                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li>Nome completo e informações de contato</li>
                        <li>Endereço de e-mail e número de telefone</li>
                        <li>Informações da empresa (nome, CNPJ, endereço)</li>
                        <li>Cargo e área de atuação</li>
                    </ul>

                    <h3 className="mb-3 text-xl font-medium text-gray-800">
                        1.2 Informações de Navegação
                    </h3>
                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li>Endereço IP e informações do dispositivo</li>
                        <li>Páginas visitadas e tempo de permanência</li>
                        <li>Origem do tráfego (como chegou ao nosso site)</li>
                        <li>Cookies e tecnologias similares</li>
                    </ul>

                    <h3 className="mb-3 text-xl font-medium text-gray-800">
                        1.3 Informações Comerciais
                    </h3>
                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li>Necessidades e desafios empresariais relatados</li>
                        <li>Interesse em serviços específicos</li>
                        <li>Histórico de comunicações conosco</li>
                        <li>Informações de propostas e contratos</li>
                    </ul>
                </section>

                <Separator />

                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                        2. Como Usamos suas Informações
                    </h2>

                    <h3 className="mb-3 text-xl font-medium text-gray-800">
                        2.1 Finalidades Comerciais
                    </h3>
                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li>
                            <strong>Atendimento Comercial:</strong> Responder suas consultas e
                            fornecer informações sobre nossos serviços
                        </li>
                        <li>
                            <strong>Propostas Personalizadas:</strong> Desenvolver soluções
                            customizadas para suas necessidades específicas
                        </li>
                        <li>
                            <strong>Relacionamento:</strong> Manter comunicação sobre projetos,
                            atualizações e novos serviços
                        </li>
                        <li>
                            <strong>Suporte:</strong> Fornecer suporte técnico e comercial
                            durante e após a implementação
                        </li>
                    </ul>

                    <h3 className="mb-3 text-xl font-medium text-gray-800">
                        2.2 Outras Finalidades
                    </h3>
                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li>Melhorar nosso site e experiência do usuário</li>
                        <li>Analisar tendências e comportamentos de navegação</li>
                        <li>Cumprir obrigações legais e regulamentares</li>
                        <li>Proteger nossos direitos e propriedade</li>
                    </ul>
                </section>

                <Separator />

                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                        3. Compartilhamento de Informações
                    </h2>

                    <div className="mb-4 rounded-lg bg-red-50 p-4">
                        <p className="font-medium text-red-900 mb-2">
                            Compromisso de Não Compartilhamento:
                        </p>
                        <p className="text-red-800">
                            NÃO vendemos, alugamos ou compartilhamos suas informações pessoais
                            com terceiros para fins comerciais ou de marketing.
                        </p>
                    </div>

                    <p className="mb-4">Compartilhamos informações apenas nas seguintes situações:</p>
                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li>Com seu consentimento explícito</li>
                        <li>Para cumprir obrigações legais ou ordens judiciais</li>
                        <li>Com provedores de serviços que nos auxiliam (sob acordos de confidencialidade)</li>
                        <li>Para proteger nossos direitos, propriedade ou segurança</li>
                    </ul>
                </section>

                <Separator />

                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                        4. Segurança dos Dados
                    </h2>

                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li>Criptografia SSL/TLS para todas as comunicações</li>
                        <li>Armazenamento seguro em servidores protegidos</li>
                        <li>Acesso limitado apenas à equipe autorizada</li>
                        <li>Backups regulares e redundância de dados</li>
                        <li>Monitoramento contínuo de segurança</li>
                        <li>Treinamento regular da equipe em proteção de dados</li>
                    </ul>
                </section>

                <Separator />

                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                        5. Seus Direitos (LGPD)
                    </h2>

                    <p className="mb-4">Conforme a Lei Geral de Proteção de Dados, você tem os seguintes direitos:</p>
                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li>
                            <strong>Acesso:</strong> Solicitar uma cópia de todos os dados que temos sobre você
                        </li>
                        <li>
                            <strong>Retificação:</strong> Corrigir dados incorretos ou incompletos
                        </li>
                        <li>
                            <strong>Exclusão:</strong> Solicitar a remoção de seus dados pessoais
                        </li>
                        <li>
                            <strong>Portabilidade:</strong> Receber seus dados em formato estruturado
                        </li>
                        <li>
                            <strong>Oposição:</strong> Opor-se ao processamento de seus dados
                        </li>
                        <li>
                            <strong>Revogação:</strong> Retirar consentimento a qualquer momento
                        </li>
                    </ul>
                </section>

                <Separator />

                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                        6. Cookies e Tecnologias Similares
                    </h2>

                    <p className="mb-4">Utilizamos cookies para:</p>
                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li>
                            <strong>Dados do Google Calendar:</strong> Mantemos apenas enquanto
                            necessário para fornecer os serviços contratados
                        </li>
                        <li>
                            <strong>Dados de conta:</strong> Retemos por até 5 anos após o
                            encerramento da conta para fins legais
                        </li>
                        <li>
                            <strong>Logs de automação:</strong> Mantemos por 2 anos para
                            auditoria e melhoria dos serviços
                        </li>
                        <li>
                            <strong>Dados financeiros:</strong> Retemos conforme exigido pela
                            legislação fiscal brasileira
                        </li>
                    </ul>
                </section>

                <Separator />

                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                        7. Conformidade com o Google
                    </h2>

                    <p className="mb-4">
                        Esta aplicação está em conformidade com as políticas do Google para
                        aplicações que acessam dados do usuário:
                    </p>
                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li>Seguimos as diretrizes de segurança do Google Cloud Platform</li>
                        <li>Implementamos OAuth 2.0 para autenticação segura</li>
                        <li>Solicitamos apenas os escopos mínimos necessários</li>
                        <li>Fornecemos transparência total sobre o uso dos dados</li>
                        <li>Permitimos revogação fácil de permissões</li>
                    </ul>
                </section>

                <Separator />

                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                        8. Contato
                    </h2>

                    <p className="mb-4">
                        Para exercer seus direitos ou esclarecer dúvidas sobre esta política:
                    </p>

                    <div className="rounded-lg bg-gray-50 p-4">
                        <p><strong>Bravon - Automação Empresarial</strong></p>
                        <p>CNPJ: {lpConfig.cnpj}</p>
                        <p>E-mail: {lpConfig.email}</p>
                        <p>Telefone: +55 {lpConfig.celphone}</p>
                        <p>Endereço: {lpConfig.address}</p>
                    </div>
                </section>

                <Separator />

                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                        9. Alterações nesta Política
                    </h2>

                    <p className="mb-4">
                        Podemos atualizar esta Política de Privacidade periodicamente.
                        Notificaremos sobre mudanças significativas através do e-mail
                        cadastrado ou aviso em nosso site. O uso continuado dos serviços
                        após as alterações constitui aceitação da nova política.
                    </p>
                </section>
            </div>
        </div>
    );
} 