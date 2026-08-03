import { useRevealAnimations } from "../hooks/useRevealAnimations";
import {
  AudienceSection,
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
      <AudienceSection />
      <LegalEscalationSection />
      <ProofSection />
      <ResourcesSection />
      <FinalCtaSection />
    </>
  );
}
