import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { FacetsSection } from "@/components/sections/facets-section";
import { StepsSection } from "@/components/sections/steps-section";
import { SocialProofSection } from "@/components/sections/social-proof-section";
import { PricingPreviewSection } from "@/components/sections/pricing-preview-section";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import {
  fetchStrapiTestimonials,
  fetchStrapiFaqs,
  fetchStrapiPlans,
  fetchStrapiSiteTexts,
} from "@/lib/strapi";

export default async function HomePage() {
  const [testimonials, faqs, plans, texts] = await Promise.all([
    fetchStrapiTestimonials(),
    fetchStrapiFaqs("home"),
    fetchStrapiPlans(),
    fetchStrapiSiteTexts("home"),
  ]);

  return (
    <div className="flex min-h-dvh flex-col" style={{ overflowX: "hidden" }}>
      <Header />
      <main className="flex-1" style={{ paddingTop: "68px" }}>
        <HeroSection texts={texts} />
        <FacetsSection texts={texts} />
        <StepsSection texts={texts} />
        <SocialProofSection testimonials={testimonials} texts={texts} />
        <PricingPreviewSection plans={plans} />
        <FaqSection faqs={faqs} texts={texts} />
        <CtaSection texts={texts} />
      </main>
      <Footer />
    </div>
  );
}
