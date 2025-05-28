"use client";
import { Balancer } from "react-wrap-balancer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const feedbacks = [
  {
    name: "Carlos Mendes - CEO TechSolutions",
    description:
      "A Bravon revolucionou nossa operação! Automatizaram todo nosso atendimento via WhatsApp e integraram com nosso CRM. Agora respondemos clientes 24/7 e nossa conversão aumentou 300%. O ROI foi incrível!",
  },
  {
    name: "Marina Silva - Diretora Comercial",
    description:
      "Implementaram agentes de IA que analisam nossos leads automaticamente e distribuem para a equipe certa. Eliminamos 80% do trabalho manual e aumentamos nossa eficiência de vendas drasticamente.",
  },
  {
    name: "Roberto Santos - Gerente de Operações",
    description:
      "A automação dos processos internos foi um divisor de águas. Documentos são gerados automaticamente, aprovações fluem sem intervenção manual e tudo se integra perfeitamente com nosso Google Workspace.",
  },
  {
    name: "Ana Paula - Fundadora StartupX",
    description:
      "Como startup, precisávamos de eficiência máxima. A Bravon criou automações que nos fazem parecer uma empresa 10x maior. Nosso Telegram bot gerencia toda comunicação interna e externa perfeitamente.",
  },
  {
    name: "João Oliveira - Diretor de TI",
    description:
      "A integração entre todos nossos sistemas era um pesadelo. Agora tudo funciona em harmonia - CRM, ERP, planilhas, tudo sincronizado em tempo real. A visibilidade que ganhamos é impressionante.",
  },
];

export default function FeedbackSection() {
  return (
    <div className="" id="feedback">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Empresas que já transformaram seus processos com IA
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Descubra como empresas de diversos segmentos estão revolucionando
            suas operações com nossas soluções de automação inteligente.
            De startups a grandes corporações, todos estão colhendo os benefícios
            da transformação digital com a Bravon.
          </p>
        </div>
        <div className="mt-20">
          <Swiper
            spaceBetween={20}
            slidesPerView={3.5}
            breakpoints={{
              320: {
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3.5,
                spaceBetween: 50,
              },
            }}
          >
            {feedbacks.map((feedback) => (
              <SwiperSlide key={feedback.name}>
                <Card className="relative ">
                  <CardHeader>
                    <CardTitle className="text-md">{feedback.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-700">
                    <Balancer>&quot;{feedback.description}&quot;</Balancer>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="mt-20 flex items-center justify-center">
          <Link href="#contato">
            <Button className="mt-8 text-lg" variant="default">
              Transforme sua empresa hoje
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
