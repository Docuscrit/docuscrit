export type ResourceDetail = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  audience: string;
  includes: string[];
  outcomes: string[];
  requestLabel: string;
};

export const resourceDetails: ResourceDetail[] = [
  {
    id: "vendor-coi-overview",
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
  },
  {
    id: "claim-packet-workflow",
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
  },
  {
    id: "risk-reporting-guide",
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
  },
  {
    id: "platform-overview",
    eyebrow: "DocuScrit platform",
    title: "DocuScrit platform overview",
    summary:
      "An overview of how Vendor COI Automation, Legal Escalation and Claim Packets, and Compliance Risk Visibility fit under one DocuScrit platform.",
    audience: "Best for organizations evaluating multiple compliance workflows or planning a phased platform rollout.",
    includes: [
      "Three-solution platform map",
      "Shared record and status concepts",
      "Role-based workflow examples",
      "Demo and rollout discussion prompts",
    ],
    outcomes: [
      "Understand where each solution fits",
      "Identify the best starting workflow",
      "Plan how workflows can connect over time",
    ],
    requestLabel: "Request platform overview",
  },
];
