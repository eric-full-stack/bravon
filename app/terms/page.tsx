import { Separator } from "@/components/ui/separator";
import { lpConfig } from "@/config/site";

export default function TermsOfService() {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-16">
            <h1 className="mb-8 text-4xl font-bold text-gray-900">
                Termos de Uso
            </h1>

            <div className="space-y-8 text-gray-700">
                <section>
                    <p className="mb-4 text-sm text-gray-500">
                        Última atualização: {new Date().toLocaleDateString('pt-BR')}
                    </p>
                    <p className="mb-6">
                        Estes Termos de Uso ("Termos") regem o uso dos serviços de automação
                        empresarial fornecidos pela Bravon ("nós", "nosso" ou "empresa").
                        Ao usar nossos serviços, você concorda com estes termos.
                    </p>
                </section>

                <Separator />

                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                        1. Definições
                    </h2>

                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li>
                            <strong>"Serviços":</strong> Soluções de automação empresarial,
                            incluindo integração com Google Calendar, WhatsApp, Telegram,
                            CRMs e outros sistemas
                        </li>
                        <li>
                            <strong>"Usuário" ou "Cliente":</strong> Pessoa física ou jurídica
                            que contrata nossos serviços
                        </li>
                        <li>
                            <strong>"Dados do Cliente":</strong> Todas as informações fornecidas
                            ou geradas através do uso dos serviços
                        </li>
                        <li>
                            <strong>"Automações":</strong> Fluxos de trabalho automatizados
                            criados e configurados para o cliente
                        </li>
                    </ul>
                </section>

                <Separator />

                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                        2. Descrição dos Serviços
                    </h2>

                    <h3 className="mb-3 text-xl font-medium text-gray-800">
                        2.1 Serviços de Automação
                    </h3>
                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li>Desenvolvimento de automações personalizadas</li>
                        <li>Integração com sistemas de terceiros (CRMs, ERPs, Google Workspace)</li>
                        <li>Criação de chatbots para WhatsApp e Telegram</li>
                        <li>Automação de processos internos da empresa</li>
                        <li>Implementação de agentes de inteligência artificial</li>
                    </ul>

                    <h3 className="mb-3 text-xl font-medium text-gray-800">
                        2.2 Integração com Google Calendar
                    </h3>
                    <div className="mb-4 rounded-lg bg-blue-50 p-4">
                        <p className="font-medium text-blue-900 mb-2">
                            Funcionalidades Específicas do Google Calendar:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-blue-800">
                            <li>Sincronização automática de eventos com sistemas internos</li>
                            <li>Criação automática de compromissos baseada em regras de negócio</li>
                            <li>Envio de notificações inteligentes via WhatsApp/Telegram</li>
                            <li>Geração de relatórios de produtividade e uso do tempo</li>
                            <li>Integração com fluxos de aprovação e processos internos</li>
                        </ul>
                    </div>
                </section>

                <Separator />

                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                        3. Aceitação e Elegibilidade
                    </h2>

                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li>Você deve ter pelo menos 18 anos ou representar uma empresa legalmente constituída</li>
                        <li>Deve fornecer informações precisas e atualizadas durante o cadastro</li>
                        <li>É responsável por manter a confidencialidade de suas credenciais de acesso</li>
                        <li>Concorda em usar os serviços apenas para fins legais e comerciais legítimos</li>
                    </ul>
                </section>

                <Separator />

                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                        4. Autorização para Acesso ao Google Calendar
                    </h2>

                    <div className="mb-4 rounded-lg bg-yellow-50 p-4">
                        <p className="font-medium text-yellow-900 mb-2">
                            Consentimento Específico:
                        </p>
                        <p className="text-yellow-800 mb-3">
                            Ao autorizar o acesso ao seu Google Calendar, você expressamente consente que:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-yellow-800">
                            <li>Podemos ler, criar, modificar e excluir eventos em sua agenda</li>
                            <li>Utilizaremos esses dados exclusivamente para fornecer os serviços contratados</li>
                            <li>Implementaremos medidas de segurança adequadas para proteger seus dados</li>
                            <li>Você pode revogar essa autorização a qualquer momento</li>
                        </ul>
                    </div>

                    <h3 className="mb-3 text-xl font-medium text-gray-800">
                        4.1 Escopo de Acesso
                    </h3>
                    <p className="mb-4">
                        Solicitamos apenas os escopos mínimos necessários para fornecer nossos serviços:
                    </p>
                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li><code>https://www.googleapis.com/auth/calendar</code> - Acesso completo ao calendar</li>
                        <li><code>https://www.googleapis.com/auth/calendar.events</code> - Gerenciamento de eventos</li>
                    </ul>
                </section>

                <Separator />

                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                        5. Responsabilidades do Cliente
                    </h2>

                    <h3 className="mb-3 text-xl font-medium text-gray-800">
                        5.1 Uso Adequado
                    </h3>
                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li>Usar os serviços apenas para fins comerciais legítimos</li>
                        <li>Não tentar contornar medidas de segurança ou limitações técnicas</li>
                        <li>Manter atualizadas as informações de conta e contato</li>
                        <li>Cumprir todas as leis e regulamentações aplicáveis</li>
                    </ul>

                    <h3 className="mb-3 text-xl font-medium text-gray-800">
                        5.2 Dados e Conteúdo
                    </h3>
                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li>Garantir que possui direitos sobre todos os dados fornecidos</li>
                        <li>Não incluir conteúdo ilegal, ofensivo ou que viole direitos de terceiros</li>
                        <li>Manter backups independentes de dados críticos</li>
                        <li>Informar imediatamente sobre qualquer uso não autorizado da conta</li>
                    </ul>
                </section>

                <Separator />

                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                        6. Responsabilidades da Bravon
                    </h2>

                    <h3 className="mb-3 text-xl font-medium text-gray-800">
                        6.1 Prestação de Serviços
                    </h3>
                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li>Fornecer os serviços conforme especificado no contrato</li>
                        <li>Manter medidas de segurança adequadas para proteger os dados</li>
                        <li>Oferecer suporte técnico durante o horário comercial</li>
                        <li>Implementar as automações conforme acordado</li>
                    </ul>

                    <h3 className="mb-3 text-xl font-medium text-gray-800">
                        6.2 Limitações
                    </h3>
                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li>Não garantimos disponibilidade 100% dos serviços de terceiros (Google, WhatsApp, etc.)</li>
                        <li>Não somos responsáveis por falhas em sistemas externos</li>
                        <li>Manutenções programadas serão comunicadas com antecedência</li>
                        <li>Limitações técnicas podem afetar algumas funcionalidades</li>
                    </ul>
                </section>

                <Separator />

                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                        7. Pagamento e Faturamento
                    </h2>

                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li>Os preços são definidos conforme proposta comercial aceita</li>
                        <li>Pagamentos devem ser realizados conforme cronograma acordado</li>
                        <li>Atrasos no pagamento podem resultar em suspensão dos serviços</li>
                        <li>Reajustes de preços serão comunicados com 30 dias de antecedência</li>
                        <li>Não há reembolso para serviços já prestados</li>
                    </ul>
                </section>

                <Separator />

                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                        8. Propriedade Intelectual
                    </h2>

                    <h3 className="mb-3 text-xl font-medium text-gray-800">
                        8.1 Direitos da Bravon
                    </h3>
                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li>Mantemos todos os direitos sobre nossa tecnologia e metodologias</li>
                        <li>Códigos e automações desenvolvidas são de nossa propriedade</li>
                        <li>Cliente recebe licença de uso, não propriedade do software</li>
                    </ul>

                    <h3 className="mb-3 text-xl font-medium text-gray-800">
                        8.2 Direitos do Cliente
                    </h3>
                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li>Cliente mantém propriedade sobre seus dados e conteúdo</li>
                        <li>Configurações específicas do negócio permanecem confidenciais</li>
                        <li>Dados podem ser exportados ao final do contrato</li>
                    </ul>
                </section>

                <Separator />

                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                        9. Confidencialidade
                    </h2>

                    <div className="mb-4 rounded-lg bg-green-50 p-4">
                        <p className="font-medium text-green-900 mb-2">
                            Compromisso de Confidencialidade:
                        </p>
                        <p className="text-green-800">
                            Todas as informações do cliente, incluindo dados do Google Calendar,
                            configurações de negócio e processos internos, são tratadas como
                            estritamente confidenciais.
                        </p>
                    </div>

                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li>Não divulgamos informações do cliente para terceiros</li>
                        <li>Acesso interno limitado apenas à equipe necessária</li>
                        <li>Acordos de confidencialidade com todos os funcionários</li>
                        <li>Dados são utilizados apenas para prestação dos serviços</li>
                    </ul>
                </section>

                <Separator />

                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                        10. Limitação de Responsabilidade
                    </h2>

                    <div className="mb-4 rounded-lg bg-red-50 p-4">
                        <p className="font-medium text-red-900 mb-2">
                            Limitações Importantes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-red-800">
                            <li>Nossa responsabilidade é limitada ao valor pago pelos serviços</li>
                            <li>Não somos responsáveis por danos indiretos ou lucros cessantes</li>
                            <li>Falhas em serviços de terceiros (Google, WhatsApp) estão fora de nosso controle</li>
                            <li>Cliente deve manter backups independentes de dados críticos</li>
                        </ul>
                    </div>
                </section>

                <Separator />

                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                        11. Rescisão
                    </h2>

                    <h3 className="mb-3 text-xl font-medium text-gray-800">
                        11.1 Rescisão pelo Cliente
                    </h3>
                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li>Pode rescindir com 30 dias de antecedência por escrito</li>
                        <li>Deve quitar todas as pendências financeiras</li>
                        <li>Dados serão mantidos por 90 dias para eventual recuperação</li>
                    </ul>

                    <h3 className="mb-3 text-xl font-medium text-gray-800">
                        11.2 Rescisão pela Bravon
                    </h3>
                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li>Por inadimplência superior a 30 dias</li>
                        <li>Por violação dos termos de uso</li>
                        <li>Por uso inadequado ou ilegal dos serviços</li>
                        <li>Com 30 dias de antecedência em caso de descontinuidade</li>
                    </ul>
                </section>

                <Separator />

                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                        12. Conformidade Legal
                    </h2>

                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li>Cumprimos a Lei Geral de Proteção de Dados (LGPD)</li>
                        <li>Seguimos as diretrizes de segurança do Google Cloud Platform</li>
                        <li>Implementamos OAuth 2.0 conforme padrões do Google</li>
                        <li>Mantemos registros de auditoria conforme exigido</li>
                        <li>Cooperamos com autoridades quando legalmente obrigatório</li>
                    </ul>
                </section>

                <Separator />

                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                        13. Disposições Gerais
                    </h2>

                    <ul className="mb-4 list-disc pl-6 space-y-2">
                        <li>Estes termos são regidos pela legislação brasileira</li>
                        <li>Foro da comarca de Chapecó/SC para resolução de disputas</li>
                        <li>Alterações nos termos serão comunicadas com 30 dias de antecedência</li>
                        <li>Se alguma cláusula for inválida, as demais permanecem em vigor</li>
                        <li>Estes termos constituem o acordo completo entre as partes</li>
                    </ul>
                </section>

                <Separator />

                <section>
                    <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                        14. Contato
                    </h2>

                    <p className="mb-4">
                        Para dúvidas sobre estes termos ou questões contratuais:
                    </p>

                    <div className="rounded-lg bg-gray-50 p-4">
                        <p><strong>Bravon - Automação Empresarial</strong></p>
                        <p>CNPJ: {lpConfig.cnpj}</p>
                        <p>E-mail: {lpConfig.email}</p>
                        <p>Telefone: +55 {lpConfig.celphone}</p>
                        <p>Endereço: {lpConfig.address}</p>
                    </div>
                </section>
            </div>
        </div>
    );
} 