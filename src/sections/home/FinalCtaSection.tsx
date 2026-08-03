import { DemoRequestForm } from "../../components/forms/DemoRequestForm";
import { VisualIcon } from "../../components/brand/VisualElements";
import { Container } from "../../components/ui/Container";
import { Section } from "../../components/ui/Section";
import { finalCtaBenefits } from "../../content/home";

export function FinalCtaSection() {
  return (
    <Section className="final-cta final-cta--form" id="contact">
      <Container size="wide">
        <div className="final-cta__card" data-reveal="fade-up">
          <div className="final-cta__content">
            <p className="eyebrow">Start with the workflow that matters most.</p>
            <h2>See how the DocuScrit platform fits your compliance operation.</h2>
            <p>
              Request a walkthrough focused on vendor COI automation, legal escalation and claim packets, compliance risk
              visibility, or the complete platform.
            </p>
            <div className="final-cta__benefits">
              {finalCtaBenefits.map((benefit) => (
                <div key={benefit}>
                  <VisualIcon name="shieldReview" size={18} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <DemoRequestForm tone="dark" compact />
        </div>
      </Container>
    </Section>
  );
}
