import { ProductPanel } from "../../components/home/ProductPanel";
import { Card } from "../../components/ui/Card";
import { Container } from "../../components/ui/Container";
import { Section } from "../../components/ui/Section";

export function ProductSpotlightSection() {
  return (
    <Section className="product-section">
      <Container size="wide">
        <div className="section-heading section-heading--center" data-reveal="fade-up">
          <p className="eyebrow">Product spotlight</p>
          <h2>Two powerful products. One complete solution.</h2>
          <p>
            DocuScrit&apos;s integrated platform helps HOA managers find compliance gaps, estimate exposure, and move from
            discovery to reviewed next steps with confidence.
          </p>
        </div>

        <div className="product-stack">
          <Card className="product-card" data-reveal="fade-up">
            <ProductPanel
              title="Compliance Gap Scanner"
              copy="Upload recent records. We scan for possible violations, flag issues by severity, and estimate potential exposure so you know where to review first."
              bullets={[
                "Upload in minutes",
                "Catch issues early",
                "Quantify financial exposure",
                "Export audit-ready report",
              ]}
              preview="scanner"
            />
          </Card>

          <Card className="product-card product-card--alt" data-reveal="fade-up">
            <ProductPanel
              title="E-Civil Case Builder"
              copy="Create draft demand-package materials with homeowner details, violation history, rule references, and cost estimates for human review."
              bullets={[
                "Compile draft package materials",
                "Organize rule references",
                "Estimate costs and exposure",
                "Route for compliance-officer review",
              ]}
              preview="ecivil"
            />
          </Card>
        </div>
      </Container>
    </Section>
  );
}
