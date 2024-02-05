import { lpConfig } from "@/config/site";
import Logo from "./logo";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="min-h-72 flex flex-col justify-around bg-white pb-12 sm:flex-row sm:pb-24">
      <div className="flex flex-col gap-4 px-6 py-3">
        <div>
          <Logo />
        </div>
        <div className="flex flex-col text-sm text-gray-400">
          <p>Telefone: {lpConfig.celphone}</p>
          <p>E-mail: {lpConfig.email}</p>

          <p className="mt-12 flex flex-row items-center gap-2">
            {lpConfig.createdBy} <Heart size={14} />
          </p>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-4 px-6 py-3 text-sm text-gray-400 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <p className="font-bold">Sobre</p>
            <p>Quem somos</p>
            <p>Termos de uso</p>
            <p>Política de privacidade</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Contato</p>
            <p>Telefone: {lpConfig.celphone}</p>
            <p>E-mail: {lpConfig.email}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Redes sociais</p>
            <p>Instagram</p>
            <p>Facebook</p>
            <p>Twitter</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Suporte</p>
            <p>FAQ</p>
            <p>Contato</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
