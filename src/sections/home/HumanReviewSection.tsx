import { Card } from "../../components/ui/Card";
import { Container } from "../../components/ui/Container";
import { Section } from "../../components/ui/Section";
import {
  HumanReviewedSignal,
  OfficerReviewedSignal,
  ReadyForReviewSignal,
  VisualIcon,
} from "../../components/brand/VisualElements";
import { reviewPillars, reviewSteps } from "../../content/home";

export function HumanReviewSection() {
  return (
    <Section className="review-section" id="human-review">
      <Container size="wide">
        <div className="section-heading section-heading--center section-heading--light" data-reveal="fade-up">
          <p className="eyebrow eyebrow--teal">Our process. Our promise.</p>
          <h2>Human review is our promise.</h2>
          <p>
            Homeowner-facing case packages are reviewed by an experienced DocuScrit Compliance Officer before delivery.
          </p>
        </div>

        <div className="review-trust-signals" data-reveal="fade-up">
          <OfficerReviewedSignal className="trust-signal--dark" />
          <ReadyForReviewSignal className="trust-signal--dark" />
          <HumanReviewedSignal className="trust-signal--dark" />
        </div>

        <div className="review-steps">
          {reviewSteps.map((step, index) => (
            <Card key={step.step} className="review-step" data-reveal="fade-up">
              <div className="review-step__badge">0{index + 1}</div>
              <div className="review-step__icon">
                <VisualIcon name={index === 0 ? "upload" : index === 1 ? "financialRisk" : "humanReview"} size={24} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </Card>
          ))}
        </div>

        <div className="review-pillars">
          {reviewPillars.map((pillar) => (
            <div key={pillar.title} className="review-pillar" data-reveal="fade-up">
              <strong>{pillar.title}</strong>
              <span>{pillar.copy}</span>
              <p>{pillar.detail}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
