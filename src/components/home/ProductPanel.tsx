import { ArrowRight, Check } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import {
  ComplianceRecordSeal,
  DocumentUploadWidget,
} from "../brand/VisualElements";

type ProductPanelProps = {
  title: string;
  copy: string;
  bullets: string[];
  preview: "scanner" | "ecivil";
};

export function ProductPanel({ title, copy, bullets, preview }: ProductPanelProps) {
  return (
    <div className="product-panel">
      <div className="product-panel__copy">
        <Badge tone="cream">{preview === "scanner" ? "01" : "02"}</Badge>
        <h3>{title}</h3>
        <p>{copy}</p>
        <ul>
          {bullets.map((bullet) => (
            <li key={bullet}>
              <Check size={15} aria-hidden="true" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <Button href="/demo" variant="secondary">
          Request Demo
          <ArrowRight size={18} aria-hidden="true" />
        </Button>
      </div>
      <div className="product-panel__visual">
        {preview === "scanner" ? <ScannerWorkbench /> : <ECivilWorkbench />}
      </div>
    </div>
  );
}

function ScannerWorkbench() {
  return (
    <div className="product-workbench">
      <div className="product-workbench__top">
        <span>Compliance Gap Scanner</span>
        <Badge tone="teal">Scan complete</Badge>
      </div>
      <div className="product-workbench__grid">
        <DocumentUploadWidget className="brand-widget--workbench" />
        <div className="mini-panel mini-panel--scan">
          <div className="mini-panel__head">
            <span>Issue Severity</span>
            <Badge tone="teal">23</Badge>
          </div>
          <div className="donut-chart donut-chart--small">
            <div className="donut-chart__ring">
              <div className="donut-chart__center">
                <strong>23</strong>
                <span>Issues</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mini-panel mini-panel--risk">
          <div className="mini-panel__head">
            <span>Financial Exposure</span>
            <strong>$18,450</strong>
          </div>
          <ul className="mini-list mini-list--stacked">
            <li>
              <span>Fines & penalties</span>
              <strong>$11,250</strong>
            </li>
            <li>
              <span>Review costs</span>
              <strong>$5,300</strong>
            </li>
            <li>
              <span>Other costs</span>
              <strong>$1,900</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ECivilWorkbench() {
  return (
    <div className="product-workbench">
      <div className="product-workbench__top">
        <span>E-Civil Case Builder</span>
        <Badge tone="teal">Review-ready</Badge>
      </div>
      <div className="product-workbench__grid product-workbench__grid--ecivil">
        <div className="mini-panel mini-panel--package">
          <div className="mini-panel__head">
            <span>Homeowner</span>
            <Badge tone="blue">Homeowner record</Badge>
          </div>
          <div className="mini-package-card">
            <strong>Address</strong>
            <span>Property compliance record</span>
            <strong>Lot</strong>
            <span>15</span>
          </div>
        </div>
        <div className="mini-panel mini-panel--mapping">
          <div className="mini-panel__head">
            <span>Repeated Violations</span>
            <Badge tone="cream">3 in 12 months</Badge>
          </div>
          <div className="mini-mapping-list mini-mapping-list--alerts">
            {[
              ["Exterior Maintenance", "First notice"],
              ["Trash Storage", "Second notice"],
              ["Landscaping", "Current review"],
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
            <span>Estimated Costs</span>
            <strong>$2,450.00</strong>
          </div>
          <ul className="mini-list mini-list--stacked">
            <li>
              <span>Review costs</span>
              <strong>$1,650.00</strong>
            </li>
            <li>
              <span>Filing & service</span>
              <strong>$450.00</strong>
            </li>
            <li>
              <span>Other costs</span>
              <strong>$350.00</strong>
            </li>
          </ul>
        </div>
        <div className="mini-panel mini-panel--review mini-panel--signature">
          <div className="mini-panel__head">
            <span>Case Status</span>
            <Badge tone="teal">Ready for Review</Badge>
          </div>
          <ComplianceRecordSeal className="compliance-record-seal--compact" />
        </div>
      </div>
    </div>
  );
}
