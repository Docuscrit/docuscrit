import { ArrowRight, Check } from "lucide-react";
import { VisualIcon } from "../components/brand/VisualElements";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { securityTopics, trustPrinciples } from "../content/trust";
import { useRevealAnimations } from "../hooks/useRevealAnimations";
import { createResourceMailto } from "../utils/contact";

export function SecurityPage() {
  useRevealAnimations();

  return (
    <>
      <Section className="subpage-hero security-page-hero">
        <Container size="wide">
          <div className="subpage-hero__grid">
            <div className="subpage-hero__copy" data-reveal="fade-up">
              <p className="eyebrow">Security and governance</p>
              <h1>Review the controls and decision boundaries behind the workflow.</h1>
              <p>
                DocuScrit is designed to make compliance work easier to organize, review, and hand off. Security and
                implementation details should be evaluated against your organization’s requirements before deployment.
              </p>
              <div className="subpage-hero__actions">
                <Button href={createResourceMailto("Security and governance evaluation overview")}>
                  Request security overview
                  <ArrowRight size={18} aria-hidden="true" />
                </Button>
                <Button href="/demo" variant="secondary">
                  Discuss your requirements
                  <ArrowRight size={18} aria-hidden="true" />
                </Button>
              </div>
            </div>
            <Card className="security-hero-card" data-reveal="from-right">
              <VisualIcon name="shieldReview" size={44} />
              <h2>Built for an informed evaluation.</h2>
              <ul>
                <li><Check size={17} />Review document-handling requirements</li>
                <li><Check size={17} />Define roles and workflow responsibility</li>
                <li><Check size={17} />Confirm retention and export needs</li>
                <li><Check size={17} />Preserve legal and human decision boundaries</li>
              </ul>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="security-principles-section">
        <Container size="wide">
          <div className="section-heading section-heading--center" data-reveal="fade-up">
            <p className="eyebrow">Operational trust</p>
            <h2>Clarity should extend beyond the interface.</h2>
            <p>Teams should be able to understand status, supporting records, responsibility, and the limits of automation.</p>
          </div>
          <div className="security-principles-grid">
            {trustPrinciples.map((principle) => (
              <Card className="security-principle-card" key={principle.title} data-reveal="fade-up">
                <VisualIcon name={principle.icon} size={27} />
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="security-topics-section">
        <Container size="wide">
          <div className="section-heading" data-reveal="fade-up">
            <p className="eyebrow eyebrow--teal">Evaluation topics</p>
            <h2>Bring the right questions into your security and governance review.</h2>
            <p>
              The exact implementation should be reviewed with DocuScrit against your hosting, access, retention, legal,
              procurement, and operational requirements.
            </p>
          </div>
          <div className="security-topics-grid">
            {securityTopics.map((topic, index) => (
              <div className="security-topic" key={topic.title} data-reveal="fade-up">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="security-disclosure" data-reveal="fade-up">
            This page describes evaluation areas and product-design principles. It is not a certification statement or a
            substitute for your organization’s security, privacy, insurance, compliance, or legal review.
          </p>
        </Container>
      </Section>

      <Section className="guide-request-section">
        <Container size="narrow">
          <Card className="guide-request-card" data-reveal="fade-up">
            <p className="eyebrow">Start a focused review</p>
            <h2>Share the controls and documentation your organization needs to evaluate.</h2>
            <p>DocuScrit can use those requirements to structure a more relevant product and security discussion.</p>
            <Button href="/demo">
              Request an evaluation call
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </Card>
        </Container>
      </Section>
    </>
  );
}
