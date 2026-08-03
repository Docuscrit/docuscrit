import {
  BadgeCheck,
  Bell,
  FileStack,
  ChevronRight,
  FileCheck2,
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
          <span>Overview</span>
        </div>
        <div className="dashboard-nav">
          <FileStack size={16} />
          <span>Vendors &amp; COIs</span>
        </div>
        <div className="dashboard-nav">
          <BadgeCheck size={16} />
          <span>Claim Packets</span>
        </div>
        <div className="dashboard-nav">
          <Bell size={16} />
          <span>Risk Reports</span>
        </div>
        <div className="dashboard-nav">
          <FileCheck2 size={16} />
          <span>Documents</span>
        </div>
        <div className="dashboard-nav">
          <Settings size={16} />
          <span>Settings</span>
        </div>
      </div>

      <div className="dashboard-shell__content">
        <div className="dashboard-shell__top">
          <div>
            <p className="dashboard-eyebrow">DocuScrit platform</p>
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
            <Badge tone="cream">Current portfolio</Badge>
          </div>
          <div className="dashboard-kpis">
            <div className="dashboard-kpi">
              <span>Vendor COIs Current</span>
              <strong>91%</strong>
              <small>14 renewals due soon</small>
            </div>
            <div className="dashboard-kpi dashboard-kpi--accent">
              <span>Items Needing Attention</span>
              <strong>23</strong>
              <small>Across documents and workflows</small>
            </div>
            <div className="dashboard-kpi">
              <span>Claim Packets</span>
              <strong>7</strong>
              <small>3 awaiting compliance review</small>
            </div>
          </div>
        </div>

        <div className="dashboard-scan-list">
          <div className="dashboard-overview__header">
            <h3>Recent Workflow Activity</h3>
          </div>
          <div className="dashboard-scan-list__rows">
            {[
              ["Vendor renewal reminders", "In progress", "14 vendors"],
              ["Claim packet review queue", "Review", "3 packets"],
              ["Board compliance report", "Ready", "23 items"],
            ].map(([activity, status, result]) => (
              <div key={activity} className="dashboard-scan-row">
                <span>{activity}</span>
                <Badge tone={status === "Review" ? "blue" : "teal"}>{status}</Badge>
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
