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
    id: "scanner-overview",
    eyebrow: "Scanner overview",
    title: "Compliance Gap Scanner overview",
    summary:
      "A product explainer for teams that want to understand how recent records are scanned, grouped, and prepared for review.",
    audience: "Best for HOA managers evaluating how to find possible violations and documentation gaps before they become larger issues.",
    includes: [
      "Record intake checklist",
      "Review-status workflow",
      "Issue severity and exposure review examples",
      "Export and handoff points for internal review",
    ],
    outcomes: [
      "Understand what records to upload",
      "See how possible issues are categorized",
      "Review what information stays attached to each finding",
    ],
    requestLabel: "Request scanner overview",
  },
  {
    id: "ecivil-guide",
    eyebrow: "Workflow guide",
    title: "E-Civil Case Builder guide",
    summary:
      "A walkthrough of how violation history, homeowner details, rule references, estimated costs, and review status come together in a draft package.",
    audience: "Best for teams that prepare demand-package materials and want a clearer handoff from discovery to officer review.",
    includes: [
      "Case intake fields",
      "Repeat-violation organization",
      "Rule-reference package structure",
      "Review-ready status handoff",
    ],
    outcomes: [
      "Clarify what is draft versus reviewed",
      "Reduce repeated manual package assembly",
      "Keep evidence and estimated costs connected",
    ],
    requestLabel: "Request workflow guide",
  },
  {
    id: "human-review-faq",
    eyebrow: "Review FAQ",
    title: "Human review FAQ",
    summary:
      "Answers to common questions about what a DocuScrit Compliance Officer reviews before homeowner-facing materials move forward.",
    audience: "Best for boards, managers, and operations leaders who want to understand the human checkpoint built into DocuScrit.",
    includes: [
      "What officer review checks",
      "What stays with the HOA team for final decisioning",
      "How review-ready and reviewed statuses differ",
      "How context and documentation gaps are handled",
    ],
    outcomes: [
      "Explain the review checkpoint internally",
      "Set expectations with boards and operations teams",
      "Understand where human judgment enters the workflow",
    ],
    requestLabel: "Request review FAQ",
  },
  {
    id: "violation-playbook",
    eyebrow: "Operational playbook",
    title: "HOA Violation Playbook",
    summary:
      "A practical guide for identifying, documenting, prioritizing, and resolving common HOA compliance issues with cleaner records.",
    audience: "Best for teams standardizing violation handling across multiple communities or portfolios.",
    includes: [
      "Violation identification checklist",
      "Documentation and photo-record guidance",
      "Prioritization framework",
      "Resolution and status-tracking workflow",
    ],
    outcomes: [
      "Create a more consistent compliance process",
      "Improve record quality before review",
      "Move from discovery to next steps with less back-and-forth",
    ],
    requestLabel: "Request playbook",
  },
];
