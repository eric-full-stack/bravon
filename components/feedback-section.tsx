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
    name: "Prof. Ana Maria",
    description:
      "Bravon transformou completamente a maneira como eu gerencio minhas aulas de padel. A funcionalidade de agendamento de aulas é incrivelmente útil e a capacidade de dar feedback diretamente aos meus alunos através do WhatsApp tem sido inestimável.",
  },
  {
    name: "Prof. Carlos Alberto",
    description:
      "Eu amo a simplicidade da Bravon. Tudo, desde o cadastro de alunos até o gerenciamento de planos de treinamento, é intuitivo e fácil de usar. Ainda por cima, o fato de poder acompanhar o desempenho do meu negócio com relatórios detalhados é fantástico.",
  },
  {
    name: "Prof. Beatriz Silva",
    description:
      "Os relatórios detalhados que a Bravon fornece sobre o progresso dos alunos são incríveis. Agora posso ver exatamente onde meus alunos estão melhorando e onde precisam de mais ajuda. Isso fez uma enorme diferença na qualidade do meu ensino.",
  },
  {
    name: "Prof. Lucas Santos",
    description:
      "Usar a Bravon para gerenciar meus alunos e minhas aulas de beach tênis tem sido uma experiência maravilhosa. A capacidade de interagir com os feedbacks dos alunos via WhatsApp tem sido um divisor de águas. Eu recomendo a Bravon para todos os professores de esportes.",
  },
  {
    name: "Prof. Sofia Oliveira",
    description:
      "A Bravon é a ferramenta que eu não sabia que precisava, mas agora não consigo viver sem. A plataforma facilitou o acompanhamento do progresso dos meus alunos, a organização das minhas aulas e a comunicação eficaz com os alunos. É realmente uma solução tudo-em-um.",
  },
];

export default function FeedbackSection() {
  return (
    <div className="" id="feedback">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Descubra como a Bravon está transformando a gestão esportiva
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Com a Bravon, professores de esportes estão elevando seu ensino a
            novos níveis. De organizar alunos e criar planos de treinamento
            personalizados, a agendar aulas e comunicar-se de forma eficaz com
            seus alunos - tudo é possível com nossa solução integrada. Veja o
            que nossos usuários têm a dizer sobre suas experiências com a
            Bravon.
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
          <Link href="/sign-up">
            <Button className="mt-8 text-lg" variant="default">
              Seja um cliente Bravon hoje
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
