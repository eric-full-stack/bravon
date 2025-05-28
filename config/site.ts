import { Metadata } from "next";

export type SiteConfig = typeof siteConfig;

export const lpConfig = {
  cnpj: "45.741.975/0001-09",
  createdBy: "Haemet Systems",
  address: "Rua Nilopolis - S/N, Universitário - Chapecó - SC - 89.812-060",
  email: "suporte@bravon.app",
  celphone: "49991065193",
  title: "Bravon: automação empresarial com inteligência artificial",
  keywords:
    "Automação empresarial, Inteligência artificial, Chatbot WhatsApp, Automação Telegram, Integração CRM, Automação processos, Agentes IA, Google Workspace automação, Automação N8N, Transformação digital",
  description:
    "Bravon: Revolucione sua empresa com automação inteligente. Criamos chatbots para WhatsApp e Telegram, agentes de IA personalizados e integramos todos seus sistemas. Transforme processos manuais em automações eficientes.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Sobre",
      href: "#sobre",
    },
    {
      title: "Preços",
      href: "#precos",
    },
    {
      title: "Contato",
      href: "#contato",
    },
  ],
  links: {
    "sign-in": "/sign-in",
    "sign-up": "/sign-up",
  },
};

export const siteConfig = {
  name: "Bravon",
  description:
    "Automação empresarial inteligente que conecta sistemas e otimiza processos.",
  mainNav: [
    {
      title: "Home",
      href: "/admin/dashboard",
    },
    {
      title: "Automações",
      href: "/admin/bookings",
    },
    {
      title: "Clientes",
      description: "Gerencie seus clientes",
      href: "/admin/students",
    },
    {
      title: "Financeiro",
      href: "/admin/financial",
    },
    {
      title: "Projetos",
      description: "Gerencie os projetos de automação",
      href: "/admin/plans",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
    config: "/admin/config/finance",
    notifications: "#",
  },
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};
