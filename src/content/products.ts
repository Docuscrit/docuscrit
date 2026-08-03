import type { VisualIconName } from "../components/brand/VisualElements";

export type ProductPreview = "vendorCoi" | "legalEscalation" | "riskVisibility";

export type ProductSolution = {
  id: "vendor-coi" | "legal-escalation" | "risk-visibility";
  name: string;
  shortName: string;
  navigationLabel: string;
  demoLabel: string;
  eyebrow: string;
  summary: string;
  bullets: string[];
  outcome: string;
  icon: VisualIconName;
  preview: ProductPreview;
};

export const productSolutions: ProductSolution[] = [
  {
    id: "vendor-coi",
    name: "Vendor COI Automation",
    shortName: "Vendor COI",
    navigationLabel: "Vendor COI",
    demoLabel: "Vendor COI Automation",
    eyebrow: "Vendor compliance",
    summary:
      "Centralize vendors, collect certificates of insurance, monitor expirations, and automate renewal follow-up before coverage gaps become operational risk.",
    bullets: [
      "Centralized vendor tracking",
      "COI expiration monitoring",
      "Vendor upload links",
      "Automated renewal reminders",
      "Vendor risk flags",
    ],
    outcome: "Keep vendor insurance records current without relying on spreadsheets and manual follow-up.",
    icon: "upload",
    preview: "vendorCoi",
  },
  {
    id: "legal-escalation",
    name: "Legal Escalation & Claim Packet Workflow",
    shortName: "Legal Escalation",
    navigationLabel: "Legal Escalation",
    demoLabel: "Legal Escalation & Claim Packets",
    eyebrow: "Escalation readiness",
    summary:
      "Move from violation history to a structured, compliance-reviewed claim packet before legal counsel or court escalation.",
    bullets: [
      "Organized violation and notice history",
      "Supporting records and rule references",
      "Potential exposure and cost context",
      "Compliance review before escalation",
      "Clear handoff to legal counsel",
    ],
    outcome: "Reduce manual packet assembly and create a clearer path to legal review when escalation is necessary.",
    icon: "ecivil",
    preview: "legalEscalation",
  },
  {
    id: "risk-visibility",
    name: "Compliance Risk Visibility",
    shortName: "Risk Visibility",
    navigationLabel: "Risk Visibility",
    demoLabel: "Compliance Risk Visibility",
    eyebrow: "Board-ready oversight",
    summary:
      "Give managers and boards a clearer view of documents, policies, notices, and workflows that may need attention.",
    bullets: [
      "Board-ready compliance reporting",
      "Required-document gap visibility",
      "Policy and notice workflow checks",
      "Issue prioritization and status tracking",
      "Portfolio-level risk summaries",
    ],
    outcome: "Help leadership focus review time on the areas with the clearest documentation or process gaps.",
    icon: "financialRisk",
    preview: "riskVisibility",
  },
];

export const productById = Object.fromEntries(productSolutions.map((product) => [product.id, product])) as Record<
  ProductSolution["id"],
  ProductSolution
>;
