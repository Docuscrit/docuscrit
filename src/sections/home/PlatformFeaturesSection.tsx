import { Check } from "lucide-react";
import { FeaturePreview } from "../../components/home/FeaturePreview";
import { VisualIcon } from "../../components/brand/VisualElements";
import { Card } from "../../components/ui/Card";
import { Container } from "../../components/ui/Container";
import { Section } from "../../components/ui/Section";
import { productSolutions } from "../../content/products";

export function PlatformFeaturesSection() {
  return (
    <Section className="platform-section" id="platform">
      <Container size="wide">
        <div className="section-heading section-heading--center" data-reveal="fade-up">
          <p className="eyebrow">The DocuScrit platform</p>
          <h2>One platform. Three connected compliance workflows.</h2>
          <p>
            Start with the workflow your team needs today, then keep vendor records, escalation materials, and compliance
            visibility connected as your operations grow.
          </p>
        </div>

        <div className="feature-grid feature-grid--solutions">
          {productSolutions.map((product) => (
            <Card key={product.id} className="feature-card feature-card--solution" data-reveal="fade-up">
              <div className="feature-card__icon">
                <VisualIcon name={product.icon} size={28} />
              </div>
              <div className="feature-card__copy">
                <span className="solution-card__eyebrow">{product.eyebrow}</span>
                <h3>{product.name}</h3>
                <p>{product.summary}</p>
                <ul>
                  {product.bullets.slice(0, 3).map((bullet) => (
                    <li key={bullet}>
                      <Check size={15} aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="feature-card__preview">
                <FeaturePreview type={product.preview} />
              </div>
              <a className="solution-card__link" href={`/#${product.id}`}>
                Explore {product.shortName}
              </a>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
