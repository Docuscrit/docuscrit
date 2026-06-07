import { ArrowRight } from "lucide-react";
import { ResourcePreview } from "../../components/home/ResourcePreview";
import { resourceIconMap } from "../../components/home/homeIconMaps";
import { VisualIcon } from "../../components/brand/VisualElements";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Container } from "../../components/ui/Container";
import { Section } from "../../components/ui/Section";
import { resourceCards } from "../../content/home";

export function ResourcesSection() {
  return (
    <Section className="resources-section" id="resources">
      <Container size="wide">
        <div className="section-heading section-heading--center section-heading--light" data-reveal="fade-up">
          <p className="eyebrow eyebrow--teal">Resources</p>
          <h2>Explore DocuScrit resources</h2>
          <p>Browse practical guides and workflow explainers, then request the ones most relevant to your team.</p>
        </div>

        <div className="resource-grid">
          {resourceCards.map((card) => (
            <Card key={card.title} className="resource-card" data-reveal="fade-up">
              <div className="resource-card__icon">
                <VisualIcon name={resourceIconMap[card.preview]} size={24} />
              </div>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
              <ResourcePreview preview={card.preview} />
              <a href={card.href} className="resource-card__cta">
                {card.cta}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </Card>
          ))}
        </div>

        <div className="resources-section__cta">
          <Button href="/resources" variant="secondary">
            View resource center
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </Section>
  );
}
