import type { ProductSolution } from "../../content/products";
import { VisualIcon } from "../brand/VisualElements";
import { Card } from "../ui/Card";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

export function ProductCapabilities({ product }: { product: ProductSolution }) {
  return (
    <Section className="product-capabilities-section">
      <Container size="wide">
        <div className="section-heading" data-reveal="fade-up">
          <p className="eyebrow">Core capabilities</p>
          <h2>Designed around the work your team already needs to manage.</h2>
          <p>{product.outcome}</p>
        </div>
        <div className="product-capability-grid">
          {product.capabilities.map((capability) => (
            <Card className="product-capability-card" key={capability.title} data-reveal="fade-up">
              <span className="product-capability-card__icon">
                <VisualIcon name={capability.icon} size={25} />
              </span>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
