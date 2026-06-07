import { ArrowRight } from "lucide-react";
import { VisualIcon, type VisualIconName } from "../components/brand/VisualElements";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { resourceDetails } from "../content/resources";
import { createResourceMailto } from "../utils/contact";

const iconByResourceId: Record<string, VisualIconName> = {
  "scanner-overview": "scanner",
  "ecivil-guide": "ecivil",
  "human-review-faq": "humanReview",
  "violation-playbook": "mapping",
};

export function ResourceCenterPage() {
  return (
    <>
      <Section className="subpage-hero resource-page-hero">
        <Container size="wide">
          <div className="subpage-hero__copy subpage-hero__copy--center">
            <p className="eyebrow">Resource center</p>
            <h1>Practical DocuScrit guides for HOA compliance teams.</h1>
            <p>
              Browse product explainers, workflow guides, and review-focused resources for HOA compliance teams.
            </p>
            <div className="subpage-hero__actions subpage-hero__actions--center">
              <Button href="#scanner-overview">
                Browse resources
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
              <Button href="/demo" variant="secondary">
                Request a demo
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="resource-hub-section">
        <Container size="wide">
          <div className="resource-hub-grid">
            {resourceDetails.map((resource) => (
              <a className="resource-hub-card" href={`#${resource.id}`} key={resource.id}>
                <VisualIcon name={iconByResourceId[resource.id]} size={26} />
                <span>{resource.eyebrow}</span>
                <strong>{resource.title}</strong>
                <p>{resource.summary}</p>
              </a>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="resource-detail-section">
        <Container size="wide">
          <div className="resource-detail-list">
            {resourceDetails.map((resource) => (
              <Card className="resource-detail-card" id={resource.id} key={resource.id}>
                <div className="resource-detail-card__intro">
                  <VisualIcon name={iconByResourceId[resource.id]} size={30} />
                  <p className="eyebrow">{resource.eyebrow}</p>
                  <h2>{resource.title}</h2>
                  <p>{resource.summary}</p>
                  <p className="resource-detail-card__audience">{resource.audience}</p>
                </div>
                <div className="resource-detail-card__columns">
                  <div>
                    <h3>What's inside</h3>
                    <ul>
                      {resource.includes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3>Useful outcomes</h3>
                    <ul>
                      {resource.outcomes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="resource-detail-card__actions">
                  <Button href={createResourceMailto(resource.title)}>
                    {resource.requestLabel}
                    <ArrowRight size={18} aria-hidden="true" />
                  </Button>
                  <Button href="/demo" variant="secondary">
                    Discuss in a demo
                    <ArrowRight size={18} aria-hidden="true" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="guide-request-section" id="guide-requests">
        <Container size="narrow">
          <Card className="guide-request-card">
            <p className="eyebrow">Need the right resource?</p>
            <h2>Ask for the guide that matches your workflow.</h2>
            <p>
              Tell DocuScrit what your team is trying to improve and they can point you toward the most relevant guide or walkthrough.
            </p>
            <Button href="/demo">
              Request guidance
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </Card>
        </Container>
      </Section>
    </>
  );
}
