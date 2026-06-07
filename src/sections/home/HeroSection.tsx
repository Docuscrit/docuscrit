import { ArrowRight } from "lucide-react";
import { DashboardPreview } from "../../components/home/DashboardPreview";
import { VisualIcon } from "../../components/brand/VisualElements";
import { Button } from "../../components/ui/Button";
import { Container } from "../../components/ui/Container";
import { Section } from "../../components/ui/Section";

export function HeroSection() {
  return (
    <Section className="home-hero" id="about">
      <Container size="wide">
        <div className="home-hero__grid">
          <div className="home-hero__copy">
            <a className="site-logo site-logo--hero" href="/#about" aria-label="DocuScrit home">
              <span className="site-logo__wordmark">DocuScrit</span>
            </a>
            <h1 data-reveal="headline">
              <span className="home-hero__headline-line">Find violations.</span>
              <span className="home-hero__headline-line">Measure risk.</span>
              <span className="home-hero__headline-line home-hero__headline-line--accent">Take action faster.</span>
            </h1>
            <p className="home-hero__lead" data-reveal="fade-up">
              DocuScrit helps HOAs and management companies find compliance gaps, estimate exposure, and prepare
              reviewed action packages so you can protect your community with confidence.
            </p>
            <div className="home-hero__actions" data-reveal="fade-up">
              <Button href="/demo">
                Request Demo
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
              <div className="home-hero__promise">
                <VisualIcon name="shieldReview" size={18} />
                <span>Homeowner-facing packages are reviewed by a DocuScrit Compliance Officer.</span>
              </div>
            </div>

            <p className="home-hero__trustline" data-reveal="fade">
              Built for HOA management teams that need transparency, documentation, and stronger compliance workflows.
            </p>
          </div>

          <div className="home-hero__visual">
            <DashboardPreview />
          </div>
        </div>
      </Container>
    </Section>
  );
}
