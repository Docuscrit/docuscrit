import { productSolutions } from "./products";

export type ResourcePreview = "overview" | "workflow" | "faq" | "playbook";

export type ResourceCard = {
  title: string;
  copy: string;
  cta: string;
  href: string;
  preview: ResourcePreview;
};

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export const escalationSteps = [
  {
    step: "01",
    title: "Assemble the history",
    copy: "Bring violation records, notices, governing documents, evidence, and cost information into one structured workspace.",
  },
  {
    step: "02",
    title: "Prepare the claim packet",
    copy: "DocuScrit organizes the supporting record and highlights missing context before the packet moves forward.",
  },
  {
    step: "03",
    title: "Review before escalation",
    copy: "A compliance review checks documentation readiness before the packet is handed to legal counsel or a court workflow.",
  },
] as const;

export const escalationPillars = [
  {
    title: "Connected history",
    copy: "Records stay together",
    detail: "Violation history, notices, rule references, evidence, and estimated costs remain connected to the same packet.",
  },
  {
    title: "Compliance checkpoint",
    copy: "Reviewed before escalation",
    detail: "The workflow separates draft materials from compliance-reviewed packets before a legal handoff occurs.",
  },
  {
    title: "Clear legal handoff",
    copy: "Counsel gets organized context",
    detail: "Legal teams receive a cleaner, structured packet while retaining their independent judgment and legal analysis.",
  },
] as const;

export const resourceCards: ResourceCard[] = [
  {
    title: "Vendor COI automation overview",
    copy: "See how vendor records, certificate uploads, expirations, reminders, and risk flags can work in one workflow.",
    cta: "Open overview",
    href: "/resources#vendor-coi-overview",
    preview: "overview",
  },
  {
    title: "Claim packet workflow guide",
    copy: "Walk through the path from violation history to a compliance-reviewed packet before legal escalation.",
    cta: "Open guide",
    href: "/resources#claim-packet-workflow",
    preview: "workflow",
  },
  {
    title: "Compliance risk reporting guide",
    copy: "Learn how board-ready reporting can surface document, policy, notice, and workflow gaps for review.",
    cta: "Open guide",
    href: "/resources#risk-reporting-guide",
    preview: "faq",
  },
  {
    title: "Security and governance overview",
    copy: "Review the security, access, auditability, data-lifecycle, and decision-boundary topics to discuss during evaluation.",
    cta: "Open security overview",
    href: "/security",
    preview: "playbook",
  },
] as const;

export const footerColumns: FooterColumn[] = [
  {
    title: "Platform",
    links: [
      { label: "Platform overview", href: "/#platform" },
      ...productSolutions.map((product) => ({ label: product.name, href: product.path })),
    ],
  },
  {
    title: "For teams",
    links: [
      { label: "Community managers", href: "/#teams" },
      { label: "HOA boards", href: "/#teams" },
      { label: "Compliance teams", href: "/#teams" },
      { label: "Vendor coordinators", href: "/#teams" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Resource center", href: "/resources" },
      { label: "Security and governance", href: "/security" },
      { label: "Claim packet guide", href: "/resources#claim-packet-workflow" },
      { label: "Risk reporting guide", href: "/resources#risk-reporting-guide" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "information@docuscrit.com", href: "mailto:information@docuscrit.com" },
      { label: "(832) 239-9924", href: "tel:+18322399924" },
      { label: "Request a demo", href: "/demo" },
    ],
  },
];

export const footerLegal: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export const finalCtaBenefits = [
  "Automate vendor COI follow-up",
  "Prepare clearer claim packets",
  "Give boards better risk visibility",
] as const;
