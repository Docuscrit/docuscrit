import { ArrowRight, Check } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { ProductPreview } from "../products/ProductPreview";
import type { ProductSolution } from "../../content/products";

type ProductPanelProps = {
  product: ProductSolution;
  index: number;
};

export function ProductPanel({ product, index }: ProductPanelProps) {
  return (
    <div className="product-panel">
      <div className="product-panel__copy">
        <Badge tone="cream">{String(index + 1).padStart(2, "0")}</Badge>
        <span className="product-panel__eyebrow">{product.eyebrow}</span>
        <h3>{product.name}</h3>
        <p>{product.summary}</p>
        <ul>
          {product.bullets.map((bullet) => (
            <li key={bullet}>
              <Check size={15} aria-hidden="true" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <p className="product-panel__outcome">{product.outcome}</p>
        <div className="product-panel__actions">
          <Button href={product.path} variant="secondary">
            Explore {product.shortName}
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
          <a className="product-panel__text-link" href={`/demo?product=${product.id}#demo-form`}>
            Request demo
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="product-panel__visual">
        <ProductPreview type={product.preview} />
      </div>
    </div>
  );
}
