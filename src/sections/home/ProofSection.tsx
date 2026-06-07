import { Card } from "../../components/ui/Card";
import { Container } from "../../components/ui/Container";
import { Section } from "../../components/ui/Section";
import { VisualIcon } from "../../components/brand/VisualElements";
import { proofPoints } from "../../content/home";

export function ProofSection() {
  return (
    <Section className="proof-section">
      <Container size="wide">
        <div className="section-heading section-heading--center" data-reveal="fade-up">
          <p className="eyebrow">Built for HOA professionals. Designed for review.</p>
          <h2>Trust built into the workflow.</h2>
          <p>Instead of unsupported claims, DocuScrit emphasizes the review controls and documentation trail built into the workflow.</p>
        </div>

        <div className="proof-grid">
          <Card className="testimonial-card proof-narrative" data-reveal="from-left">
            <VisualIcon name="reviewComplete" size={30} />
            <h3>Defensible records start with a reviewed workflow.</h3>
            <p>
              DocuScrit is designed to help HOA teams prepare clearer packages by connecting records, possible violations,
              rule references, estimated exposure, and human review status in one place.
            </p>
            <ul className="proof-narrative__list">
              <li>Draft materials are separated from officer-reviewed packages.</li>
              <li>Supporting records stay attached to the case context.</li>
              <li>Teams can see what is ready for review before homeowner delivery.</li>
            </ul>
          </Card>

          <div className="stat-grid">
            {proofPoints.map((point) => (
              <Card key={point.title} className="stat-card proof-point-card" data-reveal="fade-up">
                <VisualIcon name="financialRisk" size={24} />
                <strong>{point.title}</strong>
                <p>{point.detail}</p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
