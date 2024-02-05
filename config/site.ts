import { Metadata } from "next";

export type SiteConfig = typeof siteConfig;

export const lpConfig = {
  cnpj: "45.741.975/0001-09",
  createdBy: "Haemet Systems",
  address: "Rua Nilopolis - S/N, Universitário - Chapecó - SC - 89.812-060",
  email: "suporte@bravon.app",
  celphone: "49991065193",
  title: "Bravon: gestão de aulas esportivas particulares",
  keywords:
    "Plataforma de gestão esportiva, Ensinamento de esportes, Gerenciamento de aulas de esporte, Organização de alunos de esportes, Planos de treinamento personalizados, Agendamento de aulas de esporte, Comunicação eficiente com alunos",
  description:
    "Bravon: Sua plataforma definitiva para gestão de aulas esportivas. Cadastre alunos, crie e gerencie planos de treinamento, agende aulas e envie notificações via WhatsApp, tudo em um só lugar. Experimente agora!",
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
  description: "A plataforma que conecta professores de esportes com alunos.",
  mainNav: [
    {
      title: "Home",
      href: "/admin/dashboard",
    },
    {
      title: "Agenda",
      href: "/admin/bookings",
    },
    {
      title: "Alunos",
      description: "Gerencie seus alunos",
      href: "/admin/students",
    },
    {
      title: "Financeiro",
      href: "/admin/financial",
    },
    {
      title: "Planos",
      description: "Gerencie os planos de assinatura",
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
