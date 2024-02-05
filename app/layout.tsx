import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import { GlobalProviders, PostHogPageview } from "@/config/providers";
import { lpConfig } from "@/config/site";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: lpConfig.title,
  description: lpConfig.description,
  keywords: lpConfig.keywords,
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider
      localization={ptBR}
      appearance={{
        variables: {
          colorPrimary: "#18181b",
        },
      }}
    >
      <PostHogPageview />

      <GlobalProviders>
        <html lang="pt-br">
          <body className={inter.className}>{children}</body>
          {modal}
        </html>
      </GlobalProviders>
    </ClerkProvider>
  );
}
