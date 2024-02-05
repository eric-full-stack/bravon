import ContactSection from "@/components/contact-section";
import FeatureSection from "@/components/feature-section";
import FeedbackSection from "@/components/feedback-section";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { MainNav } from "@/components/main-nav";
import { MobileMenu } from "@/components/mobile-menu";
import PriceSection from "@/components/price-section";
import { Separator } from "@/components/ui/separator";
import { lpConfig } from "@/config/site";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  return (
    <div className="container mt-5">
      <MainNav items={lpConfig.mainNav} />
      <Hero />
      <Separator className="my-6" />
      <FeatureSection />
      <Separator className="my-6" />
      <FeedbackSection />
      <Separator className="my-6" />
      <PriceSection />
      <Separator className="my-6" />
      <ContactSection />
      <Separator className="my-6" />
      <Footer />
    </div>
  );
}
