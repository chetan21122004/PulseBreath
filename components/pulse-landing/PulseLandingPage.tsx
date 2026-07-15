import { Hero } from "./Hero";
import { Doctor } from "./Doctor";
import { Stats } from "./Stats";
import { Journey } from "./Journey";
import { Conditions } from "./Conditions";
import { ServicesOverview } from "./ServicesOverview";
import { Testimonials } from "./Testimonials";
import { NewBatchSection } from "./NewBatchSection";
import { TeleRehab } from "./TeleRehab";
import { RehabExpertise } from "./RehabExpertise";
import { BlogTeaser } from "./BlogTeaser";
import { FAQ } from "./FAQ";
import { CTASection } from "./CTASection";

export function PulseLandingPage() {
  return (
    <div>
      <Hero />
      <Stats />
      <Conditions />
      <ServicesOverview />
      <TeleRehab />
      <NewBatchSection />
      <RehabExpertise />
      <Doctor />
      <Journey />
      <Testimonials />
      <BlogTeaser />
      <FAQ />
      <CTASection />
    </div>
  );
}
