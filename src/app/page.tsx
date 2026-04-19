import type { Metadata } from "next";
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
  fetchHomePage,
} from "@/lib/strapi";

export default async function HomePage() {
  const [testimonials, faqs, plans, page] = await Promise.all([
    fetchStrapiTestimonials(),
    fetchStrapiFaqs("home"),
    fetchStrapiPlans(),
    fetchHomePage(),
  ]);

  // Конвертируем Single Type в формат texts для компонентов
  const texts: Record<string, string> = {};
  if (page) {
    const map: Record<string, string | null> = {
      "hero.badge": page.heroBadge,
      "hero.title": page.heroTitle,
      "hero.subtitle": page.heroSubtitle,
      "hero.stat1.value": page.heroStat1Value,
      "hero.stat1.label": page.heroStat1Label,
      "hero.stat2.value": page.heroStat2Value,
      "hero.stat2.label": page.heroStat2Label,
      "hero.stat3.value": page.heroStat3Value,
      "hero.stat3.label": page.heroStat3Label,
      "hero.phrase1": page.heroPhrase1,
      "hero.phrase2": page.heroPhrase2,
      "hero.phrase3": page.heroPhrase3,
      "hero.phrase4": page.heroPhrase4,
      "hero.phrase5": page.heroPhrase5,
      "hero.phrase6": page.heroPhrase6,
      "facets.badge": page.facetsBadge,
      "facets.title": page.facetsTitle,
      "facets.subtitle": page.facetsSubtitle,
      "steps.badge": page.stepsBadge,
      "steps.title": page.stepsTitle,
      "steps.subtitle": page.stepsSubtitle,
      "steps.1.title": page.step1Title,
      "steps.1.desc": page.step1Desc,
      "steps.2.title": page.step2Title,
      "steps.2.desc": page.step2Desc,
      "steps.3.title": page.step3Title,
      "steps.3.desc": page.step3Desc,
      "social.badge": page.socialBadge,
      "social.title": page.socialTitle,
      "faq.badge": page.faqBadge,
      "faq.title": page.faqTitle,
      "faq.subtitle": page.faqSubtitle,
      "cta.badge": page.ctaBadge,
      "cta.title": page.ctaTitle,
    };
    for (const [k, v] of Object.entries(map)) {
      if (v) texts[k] = v;
    }
  }

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
