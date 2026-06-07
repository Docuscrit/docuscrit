import { Badge } from "../ui/Badge";
import {
  ComplianceScoreWidget,
  ReadyForReviewSignal,
  RiskMeterWidget,
} from "../brand/VisualElements";
import type { FeaturePreview as FeaturePreviewType } from "../../content/home";

export function FeaturePreview({ type }: { type: FeaturePreviewType }) {
  if (type === "scan") {
    return (
      <div className="mini-panel mini-panel--scan">
        <div className="mini-panel__head">
          <span>Scan Results</span>
          <Badge tone="teal">23</Badge>
        </div>
        <div className="donut-chart">
          <div className="donut-chart__ring">
            <div className="donut-chart__center">
              <strong>23</strong>
              <span>Issues</span>
            </div>
          </div>
        </div>
        <div className="mini-score-list">
          <span><i className="dot dot--high" />High Risk 8</span>
          <span><i className="dot dot--medium" />Medium Risk 9</span>
          <span><i className="dot dot--low" />Low Risk 6</span>
        </div>
      </div>
    );
  }

  if (type === "risk") {
    return <RiskMeterWidget className="brand-widget--compact" />;
  }

  if (type === "package") {
    return (
      <div className="mini-panel mini-panel--package">
        <ReadyForReviewSignal className="trust-signal--compact" />
        <div className="mini-package-card">
          <strong>Prepared for</strong>
          <span>Property compliance record</span>
          <strong>Violations included</strong>
          <span>7</span>
          <strong>Estimated costs</strong>
          <span>$2,450.00</span>
        </div>
      </div>
    );
  }

  if (type === "mapping") {
    return (
      <div className="mini-panel mini-panel--mapping">
        <div className="mini-panel__head">
          <span>Rule Mapping</span>
          <Badge tone="blue">Current</Badge>
        </div>
        <div className="mini-mapping-list">
          {[
            ["Parking Policy", "Policy Ref. 4.7"],
            ["Rental Restrictions", "CC&Rs Sec. 5.2"],
            ["Architectural Guidelines", "Rule Ref. 7.1"],
          ].map(([label, code]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{code}</strong>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "review") {
    return <ComplianceScoreWidget className="brand-widget--compact" />;
  }

  return (
    <div className="mini-panel mini-panel--resolution">
      <div className="mini-panel__head">
        <span>Resolution Tracker</span>
        <Badge tone="teal">87% Resolved</Badge>
      </div>
      <div className="mini-sparkline" aria-hidden="true">
        <svg viewBox="0 0 120 60" role="presentation" focusable="false">
          <polyline points="0,50 15,46 30,40 45,42 60,32 75,28 90,20 105,16 120,6" />
        </svg>
      </div>
      <span className="mini-panel__note">22% vs last month</span>
    </div>
  );
}
