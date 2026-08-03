import { ArrowRight, Check, Link2 } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { ComplianceRecordSeal, RiskMeterWidget } from "../brand/VisualElements";
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
        <Button href="/demo#demo-form" variant="secondary">
          Request a workflow demo
          <ArrowRight size={18} aria-hidden="true" />
        </Button>
      </div>
      <div className="product-panel__visual" aria-hidden="true">
        {product.preview === "vendorCoi" ? <VendorCoiWorkbench /> : null}
        {product.preview === "legalEscalation" ? <LegalEscalationWorkbench /> : null}
        {product.preview === "riskVisibility" ? <RiskVisibilityWorkbench /> : null}
      </div>
    </div>
  );
}

function VendorCoiWorkbench() {
  return (
    <div className="product-workbench">
      <div className="product-workbench__top">
        <span>Vendor COI Automation</span>
        <Badge tone="teal">Monitoring active</Badge>
      </div>
      <div className="product-workbench__grid product-workbench__grid--vendor">
        <div className="mini-panel mini-panel--mapping">
          <div className="mini-panel__head">
            <span>Vendor Portfolio</span>
            <Badge tone="cream">147 vendors</Badge>
          </div>
          <div className="mini-mapping-list">
            {[
              ["COI current", "128"],
              ["Expiring in 30 days", "14"],
              ["Coverage gap", "5"],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="mini-panel mini-panel--package">
          <div className="mini-panel__head">
            <span>Vendor Upload Link</span>
            <Badge tone="blue">Ready</Badge>
          </div>
          <div className="vendor-upload-link">
            <Link2 size={20} aria-hidden="true" />
            <strong>Secure vendor link</strong>
            <span>Collect certificates without email attachments.</span>
          </div>
        </div>
        <div className="mini-panel mini-panel--risk">
          <div className="mini-panel__head">
            <span>Renewal Follow-up</span>
            <strong>14 active</strong>
          </div>
          <ul className="mini-list mini-list--stacked">
            <li><span>First reminder</span><strong>8</strong></li>
            <li><span>Second reminder</span><strong>4</strong></li>
            <li><span>Manager review</span><strong>2</strong></li>
          </ul>
        </div>
        <div className="mini-panel mini-panel--review">
          <div className="mini-panel__head">
            <span>Vendor Risk Flags</span>
            <Badge tone="cream">5 open</Badge>
          </div>
          <div className="mini-mapping-list mini-mapping-list--alerts">
            <div><span>Expired general liability</span><strong>High</strong></div>
            <div><span>Missing endorsement</span><strong>Review</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LegalEscalationWorkbench() {
  return (
    <div className="product-workbench">
      <div className="product-workbench__top">
        <span>Legal Escalation &amp; Claim Packet</span>
        <Badge tone="teal">Review checkpoint</Badge>
      </div>
      <div className="product-workbench__grid product-workbench__grid--ecivil">
        <div className="mini-panel mini-panel--package">
          <div className="mini-panel__head">
            <span>Property Record</span>
            <Badge tone="blue">Connected</Badge>
          </div>
          <div className="mini-package-card">
            <strong>Violation history</strong>
            <span>7 entries</span>
            <strong>Notices</strong>
            <span>3 attached</span>
          </div>
        </div>
        <div className="mini-panel mini-panel--mapping">
          <div className="mini-panel__head">
            <span>Supporting Context</span>
            <Badge tone="cream">Organized</Badge>
          </div>
          <div className="mini-mapping-list mini-mapping-list--alerts">
            {[
              ["Governing documents", "Referenced"],
              ["Photo evidence", "Attached"],
              ["Notice timeline", "Complete"],
            ].map(([label, code]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{code}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="mini-panel mini-panel--risk">
          <div className="mini-panel__head">
            <span>Potential Exposure</span>
            <strong>$2,450.00</strong>
          </div>
          <ul className="mini-list mini-list--stacked">
            <li><span>Administrative costs</span><strong>$1,650.00</strong></li>
            <li><span>Filing and service</span><strong>$450.00</strong></li>
            <li><span>Other estimated costs</span><strong>$350.00</strong></li>
          </ul>
        </div>
        <div className="mini-panel mini-panel--review mini-panel--signature">
          <div className="mini-panel__head">
            <span>Packet Status</span>
            <Badge tone="teal">Compliance review</Badge>
          </div>
          <ComplianceRecordSeal className="compliance-record-seal--compact" />
        </div>
      </div>
    </div>
  );
}

function RiskVisibilityWorkbench() {
  return (
    <div className="product-workbench">
      <div className="product-workbench__top">
        <span>Compliance Risk Visibility</span>
        <Badge tone="teal">Board report ready</Badge>
      </div>
      <div className="product-workbench__grid product-workbench__grid--risk-visibility">
        <RiskMeterWidget className="brand-widget--workbench" />
        <div className="mini-panel mini-panel--mapping">
          <div className="mini-panel__head">
            <span>Attention Areas</span>
            <Badge tone="cream">23 items</Badge>
          </div>
          <div className="mini-mapping-list">
            {[
              ["Required documents", "8 gaps"],
              ["Policy review", "5 items"],
              ["Notice workflow", "10 items"],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="mini-panel mini-panel--risk">
          <div className="mini-panel__head">
            <span>Portfolio Summary</span>
            <strong>12 communities</strong>
          </div>
          <ul className="mini-list mini-list--stacked">
            <li><span>Needs immediate review</span><strong>3</strong></li>
            <li><span>Follow-up scheduled</span><strong>4</strong></li>
            <li><span>On track</span><strong>5</strong></li>
          </ul>
        </div>
        <div className="mini-panel mini-panel--package">
          <div className="mini-panel__head">
            <span>Board Report</span>
            <Badge tone="blue">Ready</Badge>
          </div>
          <div className="mini-package-card">
            <strong>Reporting period</strong>
            <span>Current quarter</span>
            <strong>Prioritized actions</strong>
            <span>Included</span>
          </div>
        </div>
      </div>
    </div>
  );
}
