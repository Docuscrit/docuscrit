import type { VisualIconName } from "../components/brand/VisualElements";

export type TrustPrinciple = {
  title: string;
  description: string;
  icon: VisualIconName;
};

export const trustPrinciples: TrustPrinciple[] = [
  {
    title: "Visible workflow status",
    description: "Draft, requested, pending, reviewed, and completed states stay distinct so teams know what has—and has not—happened.",
    icon: "reviewComplete",
  },
  {
    title: "Connected supporting records",
    description: "Documents, notices, certificates, evidence, and follow-up history remain attached to the workflow they support.",
    icon: "mapping",
  },
  {
    title: "Human decision boundaries",
    description: "DocuScrit highlights and organizes information while final operational, board, insurance, and legal decisions remain with people.",
    icon: "shieldReview",
  },
  {
    title: "Evaluation-ready transparency",
    description: "Security, access, retention, and implementation details can be reviewed with your team during product evaluation.",
    icon: "scanner",
  },
];

export const securityTopics = [
  {
    title: "Document handling",
    description:
      "Review how documents enter the platform, where they are associated, and how workflow status is kept separate from the underlying source record.",
  },
  {
    title: "Access and responsibility",
    description:
      "Define which users can manage vendors, review risk items, prepare packets, and move work through review checkpoints.",
  },
  {
    title: "Auditability",
    description:
      "Preserve a clearer history of requests, uploads, status changes, reminders, review steps, and legal handoff preparation.",
  },
  {
    title: "Data lifecycle",
    description:
      "Discuss retention, deletion, export, and implementation requirements as part of your organization’s security review.",
  },
  {
    title: "Legal and compliance boundaries",
    description:
      "Keep operational support separate from legal advice, legal conclusions, insurance decisions, and final board or management judgment.",
  },
  {
    title: "Security review support",
    description:
      "Use the evaluation process to confirm the controls, hosting details, and documentation required by your organization.",
  },
] as const;
