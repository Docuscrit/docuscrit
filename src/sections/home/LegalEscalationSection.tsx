import { Card } from "../../components/ui/Card";
import { Container } from "../../components/ui/Container";
import { Section } from "../../components/ui/Section";
import {
  HumanReviewedSignal,
  OfficerReviewedSignal,
  ReadyForReviewSignal,
  VisualIcon,
} from "../../components/brand/VisualElements";
import { escalationPillars, escalationSteps } from "../../content/home";

export function LegalEscalationSection() {
  return (
    <Section className="review-section legal-escalation-section" id="legal-review">
      <Container size="wide">
        <div className="section-heading section-heading--center section-heading--light" data-reveal="fade-up">
          <p className="eyebrow eyebrow--teal">Legal escalation workflow</p>
          <h2>Reviewed before legal escalation.</h2>
          <p>
            DocuScrit organizes violation history and supporting records into a structured claim packet, with a compliance
            review checkpoint before legal counsel or court escalation.
          </p>
        </div>

        <div className="review-trust-signals" data-reveal="fade-up">
          <ReadyForReviewSignal className="trust-signal--dark" />
          <OfficerReviewedSignal className="trust-signal--dark" />
          <HumanReviewedSignal className="trust-signal--dark" />
        </div>

        <div className="review-steps">
          {escalationSteps.map((step, index) => (
            <Card key={step.step} className="review-step" data-reveal="fade-up">
              <div className="review-step__badge">{step.step}</div>
              <div className="review-step__icon">
                <VisualIcon name={index === 0 ? "mapping" : index === 1 ? "ecivil" : "shieldReview"} size={24} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </Card>
          ))}
        </div>

        <div className="review-pillars">
          {escalationPillars.map((pillar) => (
            <div key={pillar.title} className="review-pillar" data-reveal="fade-up">
              <strong>{pillar.title}</strong>
              <span>{pillar.copy}</span>
              <p>{pillar.detail}</p>
            </div>
          ))}
        </div>

        <p className="review-disclaimer" data-reveal="fade">
          DocuScrit supports documentation and compliance review. It does not provide legal advice, determine legal outcomes,
          or replace the independent judgment of your organization or legal counsel.
        </p>
      </Container>
    </Section>
  );
}
