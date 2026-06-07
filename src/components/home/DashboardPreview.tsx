import {
  BadgeCheck,
  Bell,
  ChevronRight,
  FileCheck2,
  FileStack,
  ScanSearch,
  Settings,
} from "lucide-react";
import { Badge } from "../ui/Badge";

export function DashboardPreview() {
  return (
    <div className="dashboard-shell" data-reveal="from-right" aria-hidden="true">
      <div className="dashboard-shell__rail">
        <div className="dashboard-brandmark" />
        <div className="dashboard-nav is-active">
          <ScanSearch size={16} />
          <span>Dashboard</span>
        </div>
        <div className="dashboard-nav">
          <FileStack size={16} />
          <span>Scans</span>
        </div>
        <div className="dashboard-nav">
          <BadgeCheck size={16} />
          <span>Case Builder</span>
        </div>
        <div className="dashboard-nav">
          <FileCheck2 size={16} />
          <span>Documents</span>
        </div>
        <div className="dashboard-nav">
          <Bell size={16} />
          <span>Reports</span>
        </div>
        <div className="dashboard-nav">
          <Settings size={16} />
          <span>Settings</span>
        </div>
      </div>

      <div className="dashboard-shell__content">
        <div className="dashboard-shell__top">
          <div>
            <p className="dashboard-eyebrow">Example workspace</p>
            <p className="dashboard-subtitle">Demo Community Portfolio</p>
          </div>
          <div className="dashboard-avatar-row">
            <span className="dashboard-alert"><Bell size={15} /></span>
            <span className="dashboard-avatar">SC</span>
            <ChevronRight className="dashboard-avatar-chevron" size={14} />
          </div>
        </div>

        <div className="dashboard-overview">
          <div className="dashboard-overview__header">
            <h3>Compliance Overview</h3>
            <Badge tone="cream">Last 90 days</Badge>
          </div>
          <div className="dashboard-kpis">
            <div className="dashboard-kpi">
              <span>Potential Violations</span>
              <strong>23</strong>
              <small>+8 vs previous 90 days</small>
            </div>
            <div className="dashboard-kpi dashboard-kpi--accent">
              <span>Estimated Financial Risk</span>
              <strong>$18,450</strong>
              <small>+$6,250 vs previous 90 days</small>
            </div>
            <div className="dashboard-kpi">
              <span>Open Cases</span>
              <strong>7</strong>
              <small>3 in review</small>
            </div>
          </div>
        </div>

        <div className="dashboard-scan-list">
          <div className="dashboard-overview__header">
            <h3>Recent Scans</h3>
          </div>
          <div className="dashboard-scan-list__rows">
            {[
              ["Current 90-day review", "Complete", "23 issues found"],
              ["Prior review cycle", "Complete", "12 issues found"],
              ["Earlier review cycle", "Complete", "8 issues found"],
            ].map(([range, status, result]) => (
              <div key={range} className="dashboard-scan-row">
                <span>{range}</span>
                <Badge tone="teal">{status}</Badge>
                <span>{result}</span>
                <ChevronRight size={16} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
