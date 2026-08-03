import type { ProductSolution } from "../../content/products";
import { Card } from "../ui/Card";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";

export function ProductWorkflow({ product }: { product: ProductSolution }) {
  return (
    <Section className="product-workflow-section" id="workflow">
      <Container size="wide">
        <div className="section-heading section-heading--center" data-reveal="fade-up">
          <p className="eyebrow">Workflow</p>
          <h2>A clearer path from intake to action.</h2>
          <p>Each step keeps the supporting record, current status, and next responsibility visible.</p>
        </div>
        <div className="product-workflow-grid">
          {product.workflow.map((step) => (
            <Card className="product-workflow-card" key={step.step} data-reveal="fade-up">
              <span className="product-workflow-card__step">{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <span className="product-workflow-card__status">{step.status}</span>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
