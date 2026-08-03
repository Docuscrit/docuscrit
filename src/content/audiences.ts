import type { VisualIconName } from "../components/brand/VisualElements";
import type { ProductId } from "./products";

export type AudienceRole = {
  id: string;
  name: string;
  summary: string;
  outcome: string;
  icon: VisualIconName;
  productIds: ProductId[];
};

export const audienceRoles: AudienceRole[] = [
  {
    id: "community-managers",
    name: "Community association managers",
    summary: "Keep vendor renewals, compliance follow-up, and escalation records moving without rebuilding the same context.",
    outcome: "Spend less time chasing documents and more time resolving the work that needs judgment.",
    icon: "fasterResolution",
    productIds: ["vendor-coi", "legal-escalation", "risk-visibility"],
  },
  {
    id: "hoa-boards",
    name: "HOA boards",
    summary: "See concise, board-ready context on compliance risks, open workflows, and matters approaching escalation.",
    outcome: "Make better-informed decisions without working through every operational detail.",
    icon: "financialRisk",
    productIds: ["risk-visibility", "legal-escalation"],
  },
  {
    id: "compliance-operations",
    name: "Compliance and operations teams",
    summary: "Create repeatable workflows with clear owners, status, supporting records, and review checkpoints.",
    outcome: "Improve consistency while preserving human review and organizational control.",
    icon: "shieldReview",
    productIds: ["legal-escalation", "risk-visibility", "vendor-coi"],
  },
  {
    id: "vendor-coordinators",
    name: "Vendor coordinators",
    summary: "Centralize vendor records, collect COIs, monitor expirations, and escalate unresolved insurance gaps.",
    outcome: "Replace spreadsheet follow-up with a visible renewal workflow.",
    icon: "upload",
    productIds: ["vendor-coi", "risk-visibility"],
  },
];
