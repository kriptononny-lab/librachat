import { Header }               from "@/components/layout/header";
import { Footer }               from "@/components/layout/footer";
import { HeroSection }          from "@/components/sections/hero-section";
import { FacetsSection }        from "@/components/sections/facets-section";
import { StepsSection }         from "@/components/sections/steps-section";
import { SocialProofSection }   from "@/components/sections/social-proof-section";
import { PricingPreviewSection } from "@/components/sections/pricing-preview-section";
import { FaqSection }           from "@/components/sections/faq-section";
import { CtaSection }           from "@/components/sections/cta-section";

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col" style={{ overflowX: "hidden" }}>
      <Header />
      <main className="flex-1" style={{ paddingTop: "68px" }}>
        <HeroSection />
        <FacetsSection />
        <StepsSection />
        <SocialProofSection />
        <PricingPreviewSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
