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
            <p className="eyebrow">Ready when your compliance team is.</p>
            <h2>Ready to simplify compliance and protect your community?</h2>
            <p>
              See how DocuScrit helps HOA teams find possible violations, estimate exposure, and prepare reviewed packages
              with human review built in.
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
