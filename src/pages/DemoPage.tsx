import { ArrowRight, Mail } from "lucide-react";
import { DemoRequestForm } from "../components/forms/DemoRequestForm";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { CONTACT_EMAIL } from "../utils/contact";

const demoHighlights = [
  "Automate vendor COI collection, expiration monitoring, and renewal reminders",
  "Review the path from violation history to a compliance-reviewed claim packet",
  "See board-ready visibility into document, policy, notice, and workflow gaps",
  "Discuss one workflow or the complete DocuScrit platform",
] as const;

export function DemoPage() {
  return (
    <>
      <Section className="subpage-hero demo-page-hero">
        <Container size="wide">
          <div className="subpage-hero__grid">
            <div className="subpage-hero__copy">
              <p className="eyebrow">Request demo</p>
              <h1>See how the DocuScrit platform fits your compliance operation.</h1>
              <p>
                Choose the workflow you want to explore and the DocuScrit team will tailor the walkthrough to your HOA or
                property-management operation.
              </p>
              <div className="subpage-hero__actions">
                <Button href="#demo-form">
                  Start request
                  <ArrowRight size={18} aria-hidden="true" />
                </Button>
                <Button href={`mailto:${CONTACT_EMAIL}`} variant="secondary">
                  Email DocuScrit
                  <Mail size={18} aria-hidden="true" />
                </Button>
              </div>
            </div>
            <Card className="demo-expectations-card">
              <h2>What the walkthrough can cover</h2>
              <ul>
                {demoHighlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="demo-request-section" id="demo-form">
        <Container size="narrow">
          <DemoRequestForm />
        </Container>
      </Section>
    </>
  );
}
