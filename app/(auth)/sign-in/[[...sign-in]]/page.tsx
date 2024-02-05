import { Metadata } from "next";
import Link from "next/link";

import { SignIn, auth } from "@clerk/nextjs";
import Logo from "@/components/logo";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Bravon: Login",
  description:
    "Bravon: Gerenciamento de alunos e aulas para professores de esportes.",
};

export default function AuthenticationPage() {
  const user = auth();
  if (user.sessionId) {
    redirect("/admin/dashboard");
  }
  return (
    <>
      <div className="container relative grid min-h-screen flex-col items-center justify-center px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-sign-in bg-cover bg-no-repeat" />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <Logo showSymbol={false} />
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Este sistema me ajudou muito a gerenciar meus alunos e
                otimizar meu tempo.&rdquo;
              </p>
              <footer className="text-sm">Prof. Marcelo</footer>
            </blockquote>
          </div>
        </div>
        <div className="p-2 lg:p-8">
          <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[450px]">
            <div className="">
              <Logo />
            </div>
            <SignIn />
            <p className="px-8 text-center text-sm text-muted-foreground sm:px-12">
              Clicando em continue, você concorda com nossos{" "}
              <Link
                href="/termos-de-uso"
                className="underline underline-offset-4 hover:text-primary"
              >
                Termos de Serviço
              </Link>{" "}
              and{" "}
              <Link
                href="/politica-de-privacidade"
                className="underline underline-offset-4 hover:text-primary"
              >
                Política de Privacidade
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
