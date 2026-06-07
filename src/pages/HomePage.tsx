import { useRevealAnimations } from "../hooks/useRevealAnimations";
import {
  FinalCtaSection,
  HeroSection,
  HumanReviewSection,
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
      <HumanReviewSection />
      <ProofSection />
      <ResourcesSection />
      <FinalCtaSection />
    </>
  );
}
