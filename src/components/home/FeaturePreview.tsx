import { Badge } from "../ui/Badge";
import { ComplianceScoreWidget, RiskMeterWidget } from "../brand/VisualElements";
import type { ProductPreview } from "../../content/products";

export function FeaturePreview({ type }: { type: ProductPreview }) {
  if (type === "vendorCoi") {
    return (
      <div className="mini-panel mini-panel--vendor" aria-hidden="true">
        <div className="mini-panel__head">
          <span>Vendor COI Status</span>
          <Badge tone="teal">91% current</Badge>
        </div>
        <div className="mini-mapping-list">
          {[
            ["Current", "128 vendors"],
            ["Expiring soon", "14 vendors"],
            ["Missing coverage", "5 vendors"],
          ].map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <span className="mini-panel__note">Renewal reminders active</span>
      </div>
    );
  }

  if (type === "legalEscalation") {
    return (
      <div className="mini-panel mini-panel--package" aria-hidden="true">
        <div className="mini-panel__head">
          <span>Claim Packet</span>
          <Badge tone="blue">Compliance review</Badge>
        </div>
        <div className="mini-package-card">
          <strong>Violation history</strong>
          <span>Attached</span>
          <strong>Notices and evidence</strong>
          <span>Organized</span>
          <strong>Escalation status</strong>
          <span>Pending review</span>
        </div>
      </div>
    );
  }

  return (
    <div className="feature-preview-stack" aria-hidden="true">
      <RiskMeterWidget className="brand-widget--compact" />
      <ComplianceScoreWidget className="brand-widget--compact feature-preview-stack__secondary" />
    </div>
  );
}
