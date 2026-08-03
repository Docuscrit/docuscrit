import type { ProductId } from "./products";

export type ResourceCategory = "platform" | ProductId | "security";

export type ResourceDetail = {
  id: string;
  category: ResourceCategory;
  title: string;
  eyebrow: string;
  summary: string;
  audience: string;
  includes: string[];
  outcomes: string[];
  requestLabel: string;
  format: string;
  readTime: string;
};

export const resourceCategoryLabels: Record<ResourceCategory, string> = {
  platform: "Platform overview",
  "vendor-coi": "Vendor COI Automation",
  "legal-escalation": "Legal Escalation",
  "risk-visibility": "Compliance Risk Visibility",
  security: "Trust and security",
};

export const resourceDetails: ResourceDetail[] = [
  {
    id: "platform-overview",
    category: "platform",
    eyebrow: "DocuScrit platform",
    title: "DocuScrit platform overview",
    summary:
      "See how Vendor COI Automation, Legal Escalation and Claim Packets, and Compliance Risk Visibility fit under one DocuScrit platform.",
    audience: "Best for organizations evaluating multiple compliance workflows or planning a phased rollout.",
    includes: [
      "Three-solution platform map",
      "Shared record and status concepts",
      "Role-based workflow examples",
      "Rollout discussion prompts",
    ],
    outcomes: [
      "Understand where each solution fits",
      "Identify the best starting workflow",
      "Plan how workflows can connect over time",
    ],
    requestLabel: "Request platform overview",
    format: "Platform guide",
    readTime: "8 minute overview",
  },
  {
    id: "vendor-coi-overview",
    category: "vendor-coi",
    eyebrow: "Vendor compliance",
    title: "Vendor COI automation overview",
    summary:
      "A product explainer for teams that want to centralize vendor records, collect certificates, monitor expirations, and automate renewal follow-up.",
    audience: "Best for property managers, vendor coordinators, and operations teams replacing spreadsheet-based COI tracking.",
    includes: [
      "Central vendor record structure",
      "Vendor upload-link workflow",
      "COI expiration and renewal monitoring",
      "Coverage and vendor risk flags",
    ],
    outcomes: [
      "Reduce manual certificate follow-up",
      "See which vendors need attention",
      "Keep renewal status visible across the portfolio",
    ],
    requestLabel: "Request COI overview",
    format: "Product overview",
    readTime: "6 minute overview",
  },
  {
    id: "vendor-renewal-checklist",
    category: "vendor-coi",
    eyebrow: "Workflow checklist",
    title: "Vendor renewal follow-up checklist",
    summary:
      "A practical checklist for structuring certificate requests, reminder stages, manager review, and unresolved vendor risk follow-up.",
    audience: "Best for teams standardizing how expiring and overdue certificates are handled.",
    includes: [
      "Initial request and upload-link steps",
      "Reminder timing discussion points",
      "Manager escalation criteria",
      "Vendor status and record checklist",
    ],
    outcomes: [
      "Create a repeatable renewal process",
      "Reduce inconsistent follow-up",
      "Keep unresolved items visible",
    ],
    requestLabel: "Request renewal checklist",
    format: "Checklist",
    readTime: "5 minute checklist",
  },
  {
    id: "claim-packet-workflow",
    category: "legal-escalation",
    eyebrow: "Legal escalation",
    title: "Claim packet workflow guide",
    summary:
      "A walkthrough of how violation history, notices, governing documents, evidence, estimated costs, and compliance review come together before escalation.",
    audience: "Best for teams that need a clearer handoff from internal compliance work to legal counsel or court processes.",
    includes: [
      "Violation and notice history structure",
      "Supporting evidence and rule references",
      "Potential exposure and cost context",
      "Compliance-review and legal-handoff statuses",
    ],
    outcomes: [
      "Reduce repeated manual packet assembly",
      "Clarify what is draft versus reviewed",
      "Give counsel a cleaner supporting record",
    ],
    requestLabel: "Request workflow guide",
    format: "Workflow guide",
    readTime: "8 minute guide",
  },
  {
    id: "escalation-readiness-checklist",
    category: "legal-escalation",
    eyebrow: "Readiness checklist",
    title: "Pre-escalation documentation checklist",
    summary:
      "A structured review list for confirming the history, notices, evidence, rule references, costs, and status needed before legal handoff.",
    audience: "Best for compliance teams and managers preparing a matter for internal or counsel review.",
    includes: [
      "History and notice checks",
      "Evidence and governing-document checks",
      "Cost and exposure context",
      "Review-status and handoff prompts",
    ],
    outcomes: [
      "Identify missing context earlier",
      "Create a cleaner review queue",
      "Reduce avoidable back-and-forth",
    ],
    requestLabel: "Request readiness checklist",
    format: "Checklist",
    readTime: "6 minute checklist",
  },
  {
    id: "risk-reporting-guide",
    category: "risk-visibility",
    eyebrow: "Board-ready oversight",
    title: "Compliance risk reporting guide",
    summary:
      "A guide to reporting documents, policies, notices, and workflows that may need management or board attention.",
    audience: "Best for managers, boards, and compliance leaders who need a clearer portfolio-level view of operational risk.",
    includes: [
      "Required-document gap reporting",
      "Policy and notice workflow review",
      "Issue prioritization and status tracking",
      "Board-ready summary structure",
    ],
    outcomes: [
      "Focus review time on higher-priority gaps",
      "Give boards clearer operational context",
      "Track follow-up without losing the evidence trail",
    ],
    requestLabel: "Request reporting guide",
    format: "Reporting guide",
    readTime: "7 minute guide",
  },
  {
    id: "board-reporting-workbook",
    category: "risk-visibility",
    eyebrow: "Board reporting",
    title: "Board-ready compliance reporting workbook",
    summary:
      "A planning workbook for deciding what belongs in a board summary, what stays in the working record, and how follow-up ownership is shown.",
    audience: "Best for management teams refining recurring board and portfolio reporting.",
    includes: [
      "Summary-versus-detail framework",
      "Priority and owner fields",
      "Status language examples",
      "Follow-up discussion prompts",
    ],
    outcomes: [
      "Make reports easier to scan",
      "Keep board context tied to action",
      "Avoid overloading summaries with working detail",
    ],
    requestLabel: "Request reporting workbook",
    format: "Workbook",
    readTime: "10 minute workbook",
  },
  {
    id: "security-governance-overview",
    category: "security",
    eyebrow: "Trust and governance",
    title: "Security and governance evaluation overview",
    summary:
      "A discussion guide for reviewing document handling, access, auditability, data lifecycle, and human decision boundaries during evaluation.",
    audience: "Best for operations, IT, compliance, legal, and procurement stakeholders evaluating DocuScrit.",
    includes: [
      "Security review topic list",
      "Access and responsibility prompts",
      "Data lifecycle discussion points",
      "Decision-boundary and legal-review questions",
    ],
    outcomes: [
      "Prepare a more focused security review",
      "Confirm implementation requirements",
      "Align operational and legal stakeholders",
    ],
    requestLabel: "Request evaluation overview",
    format: "Evaluation guide",
    readTime: "7 minute overview",
  },
];

export const resourceById = Object.fromEntries(resourceDetails.map((resource) => [resource.id, resource])) as Record<
  string,
  ResourceDetail
>;
