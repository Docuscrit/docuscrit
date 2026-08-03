import type { ReactNode } from "react";
import { BellRing, CalendarClock, CheckCircle2, FileCheck2, Link2, ShieldAlert } from "lucide-react";
import { Badge } from "../ui/Badge";
import { ComplianceRecordSeal, RiskMeterWidget } from "../brand/VisualElements";
import type { ProductPreview as ProductPreviewType } from "../../content/products";
import { cx } from "../../utils/classNames";

type ProductPreviewProps = {
  type: ProductPreviewType;
  variant?: "workbench" | "hero";
  className?: string;
};

export function ProductPreview({ type, variant = "workbench", className }: ProductPreviewProps) {
  return (
    <div className={cx("product-preview", `product-preview--${variant}`, className)} aria-hidden="true">
      {type === "vendorCoi" ? <VendorCoiPreview /> : null}
      {type === "legalEscalation" ? <LegalEscalationPreview /> : null}
      {type === "riskVisibility" ? <RiskVisibilityPreview /> : null}
    </div>
  );
}

function PreviewFrame({ title, badge, children }: { title: string; badge: string; children: ReactNode }) {
  return (
    <div className="product-workbench">
      <div className="product-workbench__top">
        <div>
          <span>{title}</span>
          <small>DocuScrit workspace</small>
        </div>
        <Badge tone="teal">{badge}</Badge>
      </div>
      {children}
    </div>
  );
}

function VendorCoiPreview() {
  return (
    <PreviewFrame title="Vendor COI Automation" badge="Monitoring active">
      <div className="preview-summary-row">
        <div><strong>147</strong><span>Vendors tracked</span></div>
        <div><strong>14</strong><span>Expiring soon</span></div>
        <div><strong>5</strong><span>Risk flags</span></div>
      </div>
      <div className="product-workbench__grid product-workbench__grid--vendor">
        <div className="mini-panel mini-panel--mapping">
          <div className="mini-panel__head">
            <span>Certificate status</span>
            <Badge tone="cream">91% current</Badge>
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
            <span>Vendor upload link</span>
            <Badge tone="blue">Ready</Badge>
          </div>
          <div className="vendor-upload-link">
            <Link2 size={20} aria-hidden="true" />
            <strong>Direct certificate intake</strong>
            <span>Keep uploads attached to the correct vendor record.</span>
          </div>
        </div>
        <div className="mini-panel mini-panel--risk">
          <div className="mini-panel__head">
            <span>Renewal follow-up</span>
            <strong>14 active</strong>
          </div>
          <ul className="mini-list mini-list--stacked">
            <li><BellRing size={14} /><span>First reminder</span><strong>8</strong></li>
            <li><CalendarClock size={14} /><span>Second reminder</span><strong>4</strong></li>
            <li><ShieldAlert size={14} /><span>Manager review</span><strong>2</strong></li>
          </ul>
        </div>
        <div className="mini-panel mini-panel--review">
          <div className="mini-panel__head">
            <span>Vendor risk flags</span>
            <Badge tone="cream">5 open</Badge>
          </div>
          <div className="mini-mapping-list mini-mapping-list--alerts">
            <div><span>Expired general liability</span><strong>High</strong></div>
            <div><span>Missing endorsement</span><strong>Review</strong></div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function LegalEscalationPreview() {
  return (
    <PreviewFrame title="Legal Escalation & Claim Packet" badge="Review checkpoint">
      <div className="preview-progress" aria-hidden="true">
        {[
          ["History", "complete"],
          ["Packet", "complete"],
          ["Compliance review", "active"],
          ["Legal handoff", "pending"],
        ].map(([label, state]) => (
          <div className={`preview-progress__step preview-progress__step--${state}`} key={label}>
            <i />
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="product-workbench__grid product-workbench__grid--ecivil">
        <div className="mini-panel mini-panel--package">
          <div className="mini-panel__head">
            <span>Property record</span>
            <Badge tone="blue">Connected</Badge>
          </div>
          <div className="mini-package-card">
            <strong>Violation history</strong>
            <span>7 entries</span>
            <strong>Notices</strong>
            <span>3 attached</span>
            <strong>Evidence</strong>
            <span>12 files</span>
          </div>
        </div>
        <div className="mini-panel mini-panel--mapping">
          <div className="mini-panel__head">
            <span>Readiness checks</span>
            <Badge tone="cream">1 item open</Badge>
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
            <span>Potential exposure</span>
            <strong>$2,450.00</strong>
          </div>
          <ul className="mini-list mini-list--stacked">
            <li><FileCheck2 size={14} /><span>Administrative costs</span><strong>$1,650</strong></li>
            <li><FileCheck2 size={14} /><span>Filing and service</span><strong>$450</strong></li>
            <li><FileCheck2 size={14} /><span>Other estimated costs</span><strong>$350</strong></li>
          </ul>
        </div>
        <div className="mini-panel mini-panel--review mini-panel--signature">
          <div className="mini-panel__head">
            <span>Packet status</span>
            <Badge tone="teal">Compliance review</Badge>
          </div>
          <ComplianceRecordSeal className="compliance-record-seal--compact" />
        </div>
      </div>
    </PreviewFrame>
  );
}

function RiskVisibilityPreview() {
  return (
    <PreviewFrame title="Compliance Risk Visibility" badge="Board report ready">
      <div className="preview-summary-row preview-summary-row--risk">
        <div><strong>12</strong><span>Communities</span></div>
        <div><strong>23</strong><span>Attention items</span></div>
        <div><strong>8</strong><span>Document gaps</span></div>
      </div>
      <div className="product-workbench__grid product-workbench__grid--risk-visibility">
        <RiskMeterWidget className="brand-widget--workbench" />
        <div className="mini-panel mini-panel--mapping">
          <div className="mini-panel__head">
            <span>Attention areas</span>
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
            <span>Portfolio summary</span>
            <strong>12 communities</strong>
          </div>
          <ul className="mini-list mini-list--stacked">
            <li><ShieldAlert size={14} /><span>Needs immediate review</span><strong>3</strong></li>
            <li><CalendarClock size={14} /><span>Follow-up scheduled</span><strong>4</strong></li>
            <li><CheckCircle2 size={14} /><span>On track</span><strong>5</strong></li>
          </ul>
        </div>
        <div className="mini-panel mini-panel--package">
          <div className="mini-panel__head">
            <span>Board report</span>
            <Badge tone="blue">Ready</Badge>
          </div>
          <div className="mini-package-card">
            <strong>Reporting period</strong>
            <span>Current quarter</span>
            <strong>Prioritized actions</strong>
            <span>Included</span>
            <strong>Supporting detail</strong>
            <span>Linked</span>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
