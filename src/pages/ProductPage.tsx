import { ArrowRight, Check } from "lucide-react";
import { ProductCapabilities } from "../components/products/ProductCapabilities";
import { ProductHero } from "../components/products/ProductHero";
import { ProductWorkflow } from "../components/products/ProductWorkflow";
import { VisualIcon } from "../components/brand/VisualElements";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import type { ProductSolution } from "../content/products";
import { productById } from "../content/products";
import { resourceById } from "../content/resources";
import { useRevealAnimations } from "../hooks/useRevealAnimations";

export function ProductPage({ product }: { product: ProductSolution }) {
  useRevealAnimations();
  const relatedResources = product.relatedResourceIds.map((id) => resourceById[id]).filter(Boolean);

  return (
    <>
      <ProductHero product={product} />

      <Section className="product-problem-section">
        <Container size="wide">
          <div className="product-problem-grid">
            <div className="product-problem-copy" data-reveal="from-left">
              <p className="eyebrow">Why this workflow matters</p>
              <h2>Turn scattered compliance work into a visible process.</h2>
              <p>{product.problemStatement}</p>
              <p className="product-problem-copy__outcome">{product.outcome}</p>
            </div>
            <div className="product-audience-list" data-reveal="from-right">
              {product.audiences.map((audience) => (
                <Card className="product-audience-card" key={audience.role}>
                  <strong>{audience.role}</strong>
                  <p>{audience.need}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <ProductCapabilities product={product} />
      <ProductWorkflow product={product} />

      <Section className="product-outcomes-section">
        <Container size="wide">
          <div className="product-outcomes-grid">
            <div className="product-outcomes-copy" data-reveal="fade-up">
              <p className="eyebrow eyebrow--teal">Operational outcomes</p>
              <h2>More clarity without removing human judgment.</h2>
              <p>
                DocuScrit helps your team organize, monitor, and prepare the work. People still make the final operational,
                board, insurance, compliance, and legal decisions.
              </p>
            </div>
            <div className="product-benefit-list">
              {product.benefits.map((benefit) => (
                <div key={benefit} className="product-benefit-item" data-reveal="fade-up">
                  <Check size={18} aria-hidden="true" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="product-trust-note" data-reveal="fade-up">
            <VisualIcon name="shieldReview" size={28} />
            <div>
              <strong>Decision boundary</strong>
              <p>{product.trustNote}</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="product-related-section">
        <Container size="wide">
          <div className="section-heading" data-reveal="fade-up">
            <p className="eyebrow">Related resources</p>
            <h2>Prepare your team for a focused evaluation.</h2>
            <p>Use these guides to map the workflow, questions, and responsibilities that matter to your organization.</p>
          </div>
          <div className="product-related-grid">
            {relatedResources.map((resource) => (
              <Card className="product-related-card" key={resource.id} data-reveal="fade-up">
                <span>{resource.format}</span>
                <h3>{resource.title}</h3>
                <p>{resource.summary}</p>
                <a href={`/resources#${resource.id}`}>
                  View resource
                  <ArrowRight size={17} aria-hidden="true" />
                </a>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="product-page-cta">
        <Container size="narrow">
          <Card className="product-page-cta__card" data-reveal="fade-up">
            <p className="eyebrow">See {product.shortName} in context</p>
            <h2>Review the workflow with your real operational priorities in mind.</h2>
            <p>Choose a tailored walkthrough of this solution or see how it connects with the complete DocuScrit platform.</p>
            <div>
              <Button href={`/demo?product=${product.id}#demo-form`}>
                Request a tailored demo
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
              <Button href="/#platform" variant="secondary">
                Explore the platform
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}

export function VendorCoiPage() {
  return <ProductPage product={productById["vendor-coi"]} />;
}

export function LegalEscalationPage() {
  return <ProductPage product={productById["legal-escalation"]} />;
}

export function RiskVisibilityPage() {
  return <ProductPage product={productById["risk-visibility"]} />;
}
