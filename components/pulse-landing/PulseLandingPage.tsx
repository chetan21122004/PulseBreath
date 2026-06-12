import { Header } from "./Header";
import { Hero } from "./Hero";
import { Doctor } from "./Doctor";
import { Stats } from "./Stats";
import { Journey } from "./Journey";
import { Conditions } from "./Conditions";
import { ServicesOverview } from "./ServicesOverview";
import { Testimonials } from "./Testimonials";
import { TeleRehab } from "./TeleRehab";
import { RehabExpertise } from "./RehabExpertise";
import { FAQ } from "./FAQ";
import { CTASection } from "./CTASection";
import { Footer } from "./Footer";
import { WhatsAppFab } from "./WhatsAppFab";

export function PulseLandingPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Header />
      <main className="max-md:snap-none snap-y snap-proximity scroll-pt-[var(--header-height)]">
        <Hero />
        <Stats />
        <Conditions />
        <ServicesOverview />
        <TeleRehab />
        <RehabExpertise />
        <Doctor />
        <Journey />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
