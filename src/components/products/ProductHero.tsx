import { ArrowRight, Check } from "lucide-react";
import type { ProductSolution } from "../../content/products";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Section } from "../ui/Section";
import { ProductPreview } from "./ProductPreview";

export function ProductHero({ product }: { product: ProductSolution }) {
  return (
    <Section className={`product-page-hero product-page-hero--${product.id}`}>
      <Container size="wide">
        <div className="product-page-hero__grid">
          <div className="product-page-hero__copy" data-reveal="fade-up">
            <p className="eyebrow">{product.eyebrow}</p>
            <h1>{product.heroTitle}</h1>
            <p className="product-page-hero__lead">{product.summary}</p>
            <ul className="product-page-hero__bullets">
              {product.bullets.slice(0, 3).map((bullet) => (
                <li key={bullet}>
                  <Check size={16} aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="product-page-hero__actions">
              <Button
                href={`/demo?product=${product.id}#demo-form`}
                data-analytics-event="product_cta_click"
                data-analytics-label="Request a tailored demo"
                data-analytics-location="product-hero"
                data-analytics-product={product.id}
              >
                Request a tailored demo
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
              <Button
                href="#workflow"
                variant="secondary"
                data-analytics-event="product_cta_click"
                data-analytics-label="See how it works"
                data-analytics-location="product-hero"
                data-analytics-product={product.id}
              >
                See how it works
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </div>
          </div>
          <div className="product-page-hero__visual" data-reveal="from-right">
            <ProductPreview type={product.preview} variant="hero" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
