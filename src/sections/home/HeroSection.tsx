import { ArrowDown, ArrowRight } from "lucide-react";
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
            <p className="eyebrow home-hero__eyebrow" data-reveal="fade">
              The compliance workflow platform
            </p>
            <h1 data-reveal="headline">
              <span className="home-hero__headline-line">Manage vendor compliance.</span>
              <span className="home-hero__headline-line">See risk sooner.</span>
              <span className="home-hero__headline-line home-hero__headline-line--accent">Prepare for escalation.</span>
            </h1>
            <p className="home-hero__lead" data-reveal="fade-up">
              DocuScrit helps HOA and property-management teams automate vendor COI tracking, identify compliance workflow
              gaps, and prepare reviewed claim packets before legal or court escalation.
            </p>
            <div className="home-hero__actions" data-reveal="fade-up">
              <Button
                href="/demo"
                data-analytics-event="product_cta_click"
                data-analytics-label="Request Demo"
                data-analytics-location="home-hero"
              >
                Request Demo
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
              <Button
                href="/#platform"
                variant="secondary"
                data-analytics-event="product_cta_click"
                data-analytics-label="Explore the platform"
                data-analytics-location="home-hero"
              >
                Explore the platform
                <ArrowDown size={18} aria-hidden="true" />
              </Button>
            </div>

            <div className="home-hero__promise" data-reveal="fade-up">
              <VisualIcon name="shieldReview" size={18} />
              <span>
                Built to support managers, boards, compliance teams, and legal counsel—not replace their judgment.
              </span>
            </div>

            <p className="home-hero__trustline" data-reveal="fade">
              One DocuScrit platform. Three connected workflows for vendor compliance, escalation readiness, and board-level
              risk visibility.
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
