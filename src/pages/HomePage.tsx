import { useRevealAnimations } from "../hooks/useRevealAnimations";
import {
  FinalCtaSection,
  HeroSection,
  LegalEscalationSection,
  PlatformFeaturesSection,
  ProductSpotlightSection,
  ProofSection,
  ResourcesSection,
} from "../sections/home";

export function HomePage() {
  useRevealAnimations();

  return (
    <>
      <HeroSection />
      <PlatformFeaturesSection />
      <ProductSpotlightSection />
      <LegalEscalationSection />
      <ProofSection />
      <ResourcesSection />
      <FinalCtaSection />
    </>
  );
}
