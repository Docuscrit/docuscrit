import { ArrowRight } from "lucide-react";
import { VisualIcon } from "../../components/brand/VisualElements";
import { Card } from "../../components/ui/Card";
import { Container } from "../../components/ui/Container";
import { Section } from "../../components/ui/Section";
import { audienceRoles } from "../../content/audiences";
import { productById } from "../../content/products";

export function AudienceSection() {
  return (
    <Section className="audience-section" id="teams">
      <Container size="wide">
        <div className="section-heading section-heading--center" data-reveal="fade-up">
          <p className="eyebrow">Built for the people doing the work</p>
          <h2>Relevant workflows for managers, boards, compliance teams, and vendor coordinators.</h2>
          <p>Each role sees the context it needs while the underlying records and workflow status stay connected.</p>
        </div>
        <div className="audience-grid">
          {audienceRoles.map((role) => (
            <Card className="audience-card" key={role.id} data-reveal="fade-up">
              <span className="audience-card__icon">
                <VisualIcon name={role.icon} size={26} />
              </span>
              <h3>{role.name}</h3>
              <p>{role.summary}</p>
              <strong>{role.outcome}</strong>
              <div className="audience-card__products">
                {role.productIds.slice(0, 2).map((productId) => {
                  const product = productById[productId];
                  return (
                    <a href={product.path} key={product.id}>
                      {product.shortName}
                      <ArrowRight size={14} aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
