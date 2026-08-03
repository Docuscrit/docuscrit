import { Card } from "../../components/ui/Card";
import { Container } from "../../components/ui/Container";
import { Section } from "../../components/ui/Section";
import { VisualIcon } from "../../components/brand/VisualElements";
import { proofPoints } from "../../content/home";

export function ProofSection() {
  return (
    <Section className="proof-section" id="governance">
      <Container size="wide">
        <div className="section-heading section-heading--center" data-reveal="fade-up">
          <p className="eyebrow">Operational trust and governance</p>
          <h2>Clear records, clear status, and clear decision boundaries.</h2>
          <p>
            DocuScrit is designed to make compliance work easier to review without taking judgment away from managers,
            boards, compliance teams, or legal counsel.
          </p>
        </div>

        <div className="proof-grid">
          <Card className="testimonial-card proof-narrative" data-reveal="from-left">
            <VisualIcon name="reviewComplete" size={30} />
            <h3>One platform for a more defensible operational record.</h3>
            <p>
              Vendor certificates, renewal follow-up, compliance gaps, violation history, claim packet materials, and review
              status can stay connected instead of being scattered across inboxes and spreadsheets.
            </p>
            <ul className="proof-narrative__list">
              <li>Draft, pending, reviewed, and completed statuses remain distinct.</li>
              <li>Supporting records stay attached to the workflow they inform.</li>
              <li>Boards and managers keep control of final operational decisions.</li>
            </ul>
          </Card>

          <div className="stat-grid">
            {proofPoints.map((point, index) => (
              <Card key={point.title} className="stat-card proof-point-card" data-reveal="fade-up">
                <VisualIcon
                  name={index === 0 ? "fasterResolution" : index === 1 ? "mapping" : index === 2 ? "financialRisk" : "shieldReview"}
                  size={24}
                />
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
