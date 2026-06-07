import { Check } from "lucide-react";
import { FeatureIcon } from "../../components/home/FeatureIcon";
import { FeaturePreview } from "../../components/home/FeaturePreview";
import { Card } from "../../components/ui/Card";
import { Container } from "../../components/ui/Container";
import { Section } from "../../components/ui/Section";
import { platformFeatures } from "../../content/home";

export function PlatformFeaturesSection() {
  return (
    <Section className="platform-section" id="products">
      <Container size="wide">
        <div className="section-heading section-heading--center" data-reveal="fade-up">
          <p className="eyebrow">Our platform</p>
          <h2>Everything you need to protect your community</h2>
          <p>Purpose-built tools to find gaps, reduce manual prep, and move reviewed work forward.</p>
        </div>

        <div className="feature-grid">
          {platformFeatures.map((feature) => (
            <Card key={feature.title} className="feature-card" data-reveal="fade-up">
              <div className="feature-card__icon">
                <FeatureIcon title={feature.title} size={28} />
              </div>
              <div className="feature-card__copy">
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
                <ul>
                  {feature.bullets.map((bullet) => (
                    <li key={bullet}>
                      <Check size={15} aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="feature-card__preview">
                <FeaturePreview type={feature.preview} />
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
