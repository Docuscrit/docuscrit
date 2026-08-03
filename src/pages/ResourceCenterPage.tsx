import { ArrowRight } from "lucide-react";
import { VisualIcon, type VisualIconName } from "../components/brand/VisualElements";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import {
  resourceCategoryLabels,
  resourceDetails,
  type ResourceCategory,
  type ResourceDetail,
} from "../content/resources";
import { createResourceMailto } from "../utils/contact";

const categoryOrder: ResourceCategory[] = ["platform", "vendor-coi", "legal-escalation", "risk-visibility", "security"];

const iconByCategory: Record<ResourceCategory, VisualIconName> = {
  platform: "mapping",
  "vendor-coi": "upload",
  "legal-escalation": "ecivil",
  "risk-visibility": "financialRisk",
  security: "shieldReview",
};

function ResourceCard({ resource }: { resource: ResourceDetail }) {
  return (
    <Card className="resource-library-card" id={resource.id} data-reveal="fade-up">
      <div className="resource-library-card__meta">
        <VisualIcon name={iconByCategory[resource.category]} size={26} />
        <span>{resource.format}</span>
        <span>{resource.readTime}</span>
      </div>
      <p className="eyebrow">{resource.eyebrow}</p>
      <h3>{resource.title}</h3>
      <p>{resource.summary}</p>
      <p className="resource-library-card__audience">{resource.audience}</p>
      <div className="resource-library-card__lists">
        <div>
          <strong>What it covers</strong>
          <ul>
            {resource.includes.slice(0, 3).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <strong>Useful outcomes</strong>
          <ul>
            {resource.outcomes.slice(0, 3).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="resource-library-card__actions">
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
  );
}

export function ResourceCenterPage() {
  return (
    <>
      <Section className="subpage-hero resource-page-hero">
        <Container size="wide">
          <div className="subpage-hero__copy subpage-hero__copy--center">
            <p className="eyebrow">Resource center</p>
            <h1>Practical guides organized around each DocuScrit workflow.</h1>
            <p>
              Browse platform, vendor compliance, legal escalation, risk reporting, and security evaluation resources.
            </p>
            <div className="subpage-hero__actions subpage-hero__actions--center">
              <Button href="#platform-resources">
                Browse by solution
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
          <nav className="resource-category-nav" aria-label="Resource categories">
            {categoryOrder.map((category) => {
              const firstResource = resourceDetails.find((resource) => resource.category === category);
              return (
                <a href={`#${category}-resources`} key={category}>
                  <VisualIcon name={iconByCategory[category]} size={22} />
                  <span>{resourceCategoryLabels[category]}</span>
                  <small>{resourceDetails.filter((resource) => resource.category === category).length} resources</small>
                  <ArrowRight size={16} aria-hidden="true" />
                  {firstResource ? <span className="sr-only">First resource: {firstResource.title}</span> : null}
                </a>
              );
            })}
          </nav>
        </Container>
      </Section>

      <Section className="resource-library-section">
        <Container size="wide">
          <div className="resource-category-list">
            {categoryOrder.map((category) => {
              const resources = resourceDetails.filter((resource) => resource.category === category);
              return (
                <section className="resource-category" id={`${category}-resources`} key={category}>
                  <div className="resource-category__heading" data-reveal="fade-up">
                    <span className="resource-category__icon">
                      <VisualIcon name={iconByCategory[category]} size={28} />
                    </span>
                    <div>
                      <p className="eyebrow">Resource collection</p>
                      <h2>{resourceCategoryLabels[category]}</h2>
                    </div>
                  </div>
                  <div className="resource-library-grid">
                    {resources.map((resource) => (
                      <ResourceCard resource={resource} key={resource.id} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="guide-request-section" id="guide-requests">
        <Container size="narrow">
          <Card className="guide-request-card">
            <p className="eyebrow">Need the right resource?</p>
            <h2>Ask for the guide that matches your workflow.</h2>
            <p>
              Tell DocuScrit what your team is trying to improve and the conversation can start with the most relevant guide
              or walkthrough.
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
