import type { VisualIconName } from "../components/brand/VisualElements";

export type ProductPreview = "vendorCoi" | "legalEscalation" | "riskVisibility";
export type ProductId = "vendor-coi" | "legal-escalation" | "risk-visibility";
export type ProductPath = "/vendor-coi" | "/legal-escalation" | "/compliance-risk-visibility";

export type ProductCapability = {
  title: string;
  description: string;
  icon: VisualIconName;
};

export type ProductWorkflowStep = {
  step: string;
  title: string;
  description: string;
  status: string;
};

export type ProductAudience = {
  role: string;
  need: string;
};

export type ProductSolution = {
  id: ProductId;
  path: ProductPath;
  name: string;
  shortName: string;
  navigationLabel: string;
  demoLabel: string;
  eyebrow: string;
  heroTitle: string;
  summary: string;
  problemStatement: string;
  bullets: string[];
  outcome: string;
  icon: VisualIconName;
  preview: ProductPreview;
  capabilities: ProductCapability[];
  workflow: ProductWorkflowStep[];
  audiences: ProductAudience[];
  benefits: string[];
  trustNote: string;
  relatedResourceIds: string[];
};

export const productSolutions: ProductSolution[] = [
  {
    id: "vendor-coi",
    path: "/vendor-coi",
    name: "Vendor COI Automation",
    shortName: "Vendor COI",
    navigationLabel: "Vendor COI",
    demoLabel: "Vendor COI Automation",
    eyebrow: "Vendor compliance",
    heroTitle: "Keep vendor insurance records current without chasing every renewal.",
    summary:
      "Centralize vendors, collect certificates of insurance, monitor expirations, and automate renewal follow-up before coverage gaps become operational risk.",
    problemStatement:
      "COI tracking often lives across inboxes, spreadsheets, and shared drives. That makes it difficult to see which vendors are current, which certificates are expiring, and where follow-up is stalled.",
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
    capabilities: [
      {
        title: "Central vendor records",
        description: "Keep vendor contacts, certificate status, policy dates, and follow-up history together.",
        icon: "mapping",
      },
      {
        title: "Vendor upload links",
        description: "Give vendors a direct path to submit updated certificates without long email chains.",
        icon: "upload",
      },
      {
        title: "Expiration monitoring",
        description: "See upcoming expirations and overdue renewals before they disappear into a spreadsheet.",
        icon: "fasterResolution",
      },
      {
        title: "Renewal reminders",
        description: "Automate staged follow-up while keeping managers aware of unresolved requests.",
        icon: "reviewComplete",
      },
      {
        title: "Vendor risk flags",
        description: "Surface missing, expired, or incomplete insurance records for operational review.",
        icon: "financialRisk",
      },
      {
        title: "Portfolio visibility",
        description: "Review certificate status across communities, vendors, and management portfolios.",
        icon: "scanner",
      },
    ],
    workflow: [
      {
        step: "01",
        title: "Add or import vendors",
        description: "Create a centralized vendor record with the insurance information your team needs to monitor.",
        status: "Vendor record created",
      },
      {
        step: "02",
        title: "Collect the COI",
        description: "Send a vendor upload link and keep the submitted certificate attached to the correct vendor record.",
        status: "Certificate requested",
      },
      {
        step: "03",
        title: "Monitor and follow up",
        description: "Track expirations, run renewal reminders, and route unresolved risk flags to a manager.",
        status: "Renewal monitored",
      },
    ],
    audiences: [
      { role: "Vendor coordinators", need: "A single view of every vendor, certificate, expiration, and follow-up status." },
      { role: "Community managers", need: "Less manual chasing and clearer visibility into vendors that need attention." },
      { role: "Operations leaders", need: "Portfolio-level reporting on certificate currency and unresolved vendor risk." },
    ],
    benefits: [
      "Reduce repetitive renewal follow-up",
      "Replace scattered certificate tracking",
      "Spot coverage gaps earlier",
      "Keep managers informed without extra reporting work",
    ],
    trustNote:
      "DocuScrit organizes certificate records and flags items for review. Your organization remains responsible for coverage requirements, vendor approval, and risk decisions.",
    relatedResourceIds: ["vendor-coi-overview", "vendor-renewal-checklist", "security-governance-overview"],
  },
  {
    id: "legal-escalation",
    path: "/legal-escalation",
    name: "Legal Escalation & Claim Packet Workflow",
    shortName: "Legal Escalation",
    navigationLabel: "Legal Escalation",
    demoLabel: "Legal Escalation & Claim Packets",
    eyebrow: "Escalation readiness",
    heroTitle: "Move from violation history to a reviewed claim packet with less manual assembly.",
    summary:
      "Move from violation history to a structured, compliance-reviewed claim packet before legal counsel or court escalation.",
    problemStatement:
      "When escalation becomes necessary, teams often rebuild the history from email, notices, photos, governing documents, and cost records. Missing context slows review and makes the legal handoff harder than it should be.",
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
    capabilities: [
      {
        title: "Connected case history",
        description: "Keep violations, notices, evidence, governing documents, and costs connected to one record.",
        icon: "mapping",
      },
      {
        title: "Packet readiness checks",
        description: "See where supporting context may be missing before a packet enters the review queue.",
        icon: "scanner",
      },
      {
        title: "Exposure context",
        description: "Organize estimated costs and operational exposure alongside the supporting record.",
        icon: "financialRisk",
      },
      {
        title: "Compliance review checkpoint",
        description: "Separate draft materials from packets that have completed a compliance-readiness review.",
        icon: "shieldReview",
      },
      {
        title: "Clear status controls",
        description: "Track draft, missing information, review, and legal-handoff states without ambiguity.",
        icon: "reviewComplete",
      },
      {
        title: "Counsel-ready handoff",
        description: "Give legal counsel a structured packet while preserving independent legal analysis and judgment.",
        icon: "ecivil",
      },
    ],
    workflow: [
      {
        step: "01",
        title: "Assemble the record",
        description: "Connect violation history, notices, photos, governing documents, and estimated costs.",
        status: "History assembled",
      },
      {
        step: "02",
        title: "Prepare the packet",
        description: "Organize the materials into a structured claim packet and identify missing context.",
        status: "Packet prepared",
      },
      {
        step: "03",
        title: "Review before escalation",
        description: "Complete a compliance-readiness review before the packet is handed to counsel or a court workflow.",
        status: "Ready for legal handoff",
      },
    ],
    audiences: [
      { role: "Compliance teams", need: "A repeatable path from documented history to a review-ready claim packet." },
      { role: "Community managers", need: "Less time rebuilding records when a matter needs escalation." },
      { role: "Boards and counsel", need: "A clearer supporting record and visible review status before legal decisions." },
    ],
    benefits: [
      "Reduce repeated packet assembly",
      "Clarify what is missing, draft, or reviewed",
      "Create a cleaner handoff to counsel",
      "Preserve human and legal decision-making",
    ],
    trustNote:
      "Compliance review is a documentation-readiness checkpoint. DocuScrit does not provide legal advice, determine legal outcomes, or replace the independent judgment of legal counsel, managers, or boards.",
    relatedResourceIds: ["claim-packet-workflow", "escalation-readiness-checklist", "security-governance-overview"],
  },
  {
    id: "risk-visibility",
    path: "/compliance-risk-visibility",
    name: "Compliance Risk Visibility",
    shortName: "Risk Visibility",
    navigationLabel: "Risk Visibility",
    demoLabel: "Compliance Risk Visibility",
    eyebrow: "Board-ready oversight",
    heroTitle: "Show boards and managers where compliance documents and workflows may need attention.",
    summary:
      "Give managers and boards a clearer view of documents, policies, notices, and workflows that may need attention.",
    problemStatement:
      "Compliance risk is difficult to manage when required documents, policy reviews, notice workflows, and follow-up tasks are tracked in different places. Leaders need a clearer view of what may need attention and why.",
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
    capabilities: [
      {
        title: "Document gap visibility",
        description: "Surface records and required documents that may be missing, outdated, or awaiting review.",
        icon: "scanner",
      },
      {
        title: "Policy review tracking",
        description: "Track which policies may need review, confirmation, or follow-up by the responsible team.",
        icon: "mapping",
      },
      {
        title: "Notice workflow checks",
        description: "See where notice steps or supporting records may be incomplete within an operational workflow.",
        icon: "reviewComplete",
      },
      {
        title: "Priority and status",
        description: "Group items by urgency, owner, and workflow state so teams can focus their review time.",
        icon: "financialRisk",
      },
      {
        title: "Board-ready summaries",
        description: "Present concise operational context without overwhelming boards with the full working record.",
        icon: "fasterResolution",
      },
      {
        title: "Portfolio reporting",
        description: "Compare attention areas across communities while keeping the supporting detail available.",
        icon: "shieldReview",
      },
    ],
    workflow: [
      {
        step: "01",
        title: "Connect the records",
        description: "Bring required documents, policy records, notices, and workflow status into one view.",
        status: "Records connected",
      },
      {
        step: "02",
        title: "Prioritize attention areas",
        description: "Group possible gaps by urgency, responsible role, and the next review action.",
        status: "Items prioritized",
      },
      {
        step: "03",
        title: "Report and follow through",
        description: "Create board-ready summaries while preserving the detailed evidence trail for management follow-up.",
        status: "Report ready",
      },
    ],
    audiences: [
      { role: "HOA boards", need: "Concise reporting on the documents and workflows that may need attention." },
      { role: "Community managers", need: "A prioritized list of follow-up work instead of another unstructured report." },
      { role: "Compliance leaders", need: "Portfolio visibility with enough detail to support operational review." },
    ],
    benefits: [
      "Focus attention on higher-priority gaps",
      "Give boards clearer operational context",
      "Track ownership and follow-up status",
      "Keep summary reporting connected to the supporting record",
    ],
    trustNote:
      "Risk indicators are operational decision support. They do not determine legal compliance or replace board, management, insurance, or legal review.",
    relatedResourceIds: ["risk-reporting-guide", "board-reporting-workbook", "security-governance-overview"],
  },
];

export const productById = Object.fromEntries(productSolutions.map((product) => [product.id, product])) as Record<
  ProductId,
  ProductSolution
>;

export const productByPath = Object.fromEntries(productSolutions.map((product) => [product.path, product])) as Record<
  ProductPath,
  ProductSolution
>;
