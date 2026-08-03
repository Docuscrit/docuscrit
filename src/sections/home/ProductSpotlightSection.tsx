import { ProductPanel } from "../../components/home/ProductPanel";
import { Card } from "../../components/ui/Card";
import { Container } from "../../components/ui/Container";
import { Section } from "../../components/ui/Section";
import { productSolutions } from "../../content/products";

export function ProductSpotlightSection() {
  return (
    <Section className="product-section">
      <Container size="wide">
        <div className="section-heading section-heading--center" data-reveal="fade-up">
          <p className="eyebrow">Explore the platform</p>
          <h2>Choose the workflow your team needs now.</h2>
          <p>
            Each solution addresses a distinct compliance challenge while keeping records, status, and operational context
            within the DocuScrit platform.
          </p>
        </div>

        <div className="product-stack">
          {productSolutions.map((product, index) => (
            <Card
              className={index % 2 === 1 ? "product-card product-card--alt" : "product-card"}
              data-reveal="fade-up"
              id={product.id}
              key={product.id}
            >
              <ProductPanel product={product} index={index} />
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
