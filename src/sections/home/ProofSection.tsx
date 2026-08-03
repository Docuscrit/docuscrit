import { ArrowRight } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Container } from "../../components/ui/Container";
import { Section } from "../../components/ui/Section";
import { VisualIcon } from "../../components/brand/VisualElements";
import { trustPrinciples } from "../../content/trust";

export function ProofSection() {
  return (
    <Section className="proof-section" id="governance">
      <Container size="wide">
        <div className="section-heading section-heading--center" data-reveal="fade-up">
          <p className="eyebrow">Operational trust and governance</p>
          <h2>Clear records, clear status, and clear decision boundaries.</h2>
          <p>
            DocuScrit is designed to make compliance work easier to review without taking judgment away from managers,
            boards, compliance teams, insurers, or legal counsel.
          </p>
        </div>

        <div className="trust-principles-grid">
          {trustPrinciples.map((principle) => (
            <Card className="trust-principle-card" key={principle.title} data-reveal="fade-up">
              <VisualIcon name={principle.icon} size={27} />
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </Card>
          ))}
        </div>

        <Card className="trust-evaluation-card" data-reveal="fade-up">
          <div>
            <p className="eyebrow">Security evaluation</p>
            <h3>Review document handling, access, auditability, retention, and legal boundaries with your stakeholders.</h3>
          </div>
          <Button href="/security" variant="secondary">
            Explore security and governance
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
        </Card>
      </Container>
    </Section>
  );
}
