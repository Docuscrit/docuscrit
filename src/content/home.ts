export type FeaturePreview = "scan" | "risk" | "package" | "mapping" | "review" | "resolution";
export type ResourcePreview = "overview" | "workflow" | "faq" | "playbook";

export type PlatformFeature = {
  title: string;
  copy: string;
  bullets: string[];
  preview: FeaturePreview;
};

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

export const platformFeatures: PlatformFeature[] = [
  {
    title: "Compliance Gap Scanner",
    copy: "Upload recent records and uncover possible violations, missing documentation, and control gaps.",
    bullets: ["Scan bylaws, policies, and governing docs", "Identify issues before they escalate", "See estimated exposure with supporting context"],
    preview: "scan",
  },
  {
    title: "Financial Risk Estimate",
    copy: "Estimate potential exposure so your team can prioritize what needs review first.",
    bullets: ["Scenario-based exposure estimates", "Factor in fines, fees, and administrative costs", "Visualize total potential impact"],
    preview: "risk",
  },
  {
    title: "E-Civil Case Builder",
    copy: "Create draft demand-package materials with homeowner details, violation history, rule references, and cost estimates for review.",
    bullets: ["Auto-fill homeowner and violation details", "Compile rule references and cost estimates", "Route packages for compliance-officer review"],
    preview: "package",
  },
  {
    title: "Rule + Law Reference Mapping",
    copy: "Organize community rules alongside relevant statute and policy references for easier review.",
    bullets: ["Cross-reference governing documents", "Highlight alignment questions for review", "Keep package references organized"],
    preview: "mapping",
  },
  {
    title: "Human Review",
    copy: "A DocuScrit Compliance Officer reviews homeowner-facing case packages before delivery.",
    bullets: ["Real people. Real operational context.", "Case-by-case documentation review", "Reduce missing context and review gaps"],
    preview: "review",
  },
  {
    title: "Faster Resolution",
    copy: "Move from issue discovery to reviewed next steps with less manual coordination.",
    bullets: ["Guided workflows", "Centralized document management", "Track progress with clearer status"],
    preview: "resolution",
  },
] as const;

export const reviewSteps = [
  { step: "01", title: "Upload records", copy: "Upload documents in minutes. DocuScrit organizes records into a secure case workspace." },
  { step: "02", title: "AI scans and prepares", copy: "The system scans for possible violations, estimates exposure, and prepares draft package materials." },
  { step: "03", title: "Officer reviews", copy: "A DocuScrit Compliance Officer reviews documentation, context, and fairness before delivery." },
] as const;

export const reviewPillars = [
  { title: "Human review", copy: "Before homeowner delivery", detail: "Officer review helps catch context, fairness, and documentation gaps before a case moves forward." },
  { title: "HOA context", copy: "Not just software", detail: "The review workflow is built around HOA operations, records, and repeat-violation processes." },
  { title: "Review first", copy: "Details checked before action", detail: "Your team gets a cleaner package to review, document, and decide on with confidence." },
] as const;

export const proofPoints = [
  {
    title: "Human-reviewed package flow",
    detail: "Homeowner-facing materials route through a DocuScrit Compliance Officer before they are sent.",
  },
  {
    title: "Organized evidence trail",
    detail: "Violation history, records, rule references, and cost estimates stay connected in one package.",
  },
  {
    title: "Clear review status",
    detail: "Teams can distinguish drafts, review-ready cases, and officer-reviewed materials at a glance.",
  },
  {
    title: "Defensible documentation",
    detail: "The workflow is designed to help teams explain what was found, what was reviewed, and what comes next.",
  },
] as const;

export const resourceCards: ResourceCard[] = [
  {
    title: "Compliance Gap Scanner overview",
    copy: "Preview how scans help surface possible violations and documentation gaps.",
    cta: "Open overview",
    href: "/resources#scanner-overview",
    preview: "overview",
  },
  {
    title: "E-Civil Case Builder guide",
    copy: "Walk through draft package creation, estimates, case status, and review routing.",
    cta: "Open guide",
    href: "/resources#ecivil-guide",
    preview: "workflow",
  },
  {
    title: "Human review FAQ",
    copy: "Learn what officer review checks before homeowner-facing materials move forward.",
    cta: "Open FAQ",
    href: "/resources#human-review-faq",
    preview: "faq",
  },
  {
    title: "HOA Violation Playbook",
    copy: "A practical guide for identifying, documenting, and resolving violations.",
    cta: "Open playbook",
    href: "/resources#violation-playbook",
    preview: "playbook",
  },
] as const;

export const footerColumns: FooterColumn[] = [
  {
    title: "About",
    links: [
      { label: "Our mission", href: "/#about" },
      { label: "Why DocuScrit", href: "/#products" },
      { label: "Human review", href: "/#human-review" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Compliance Gap Scanner", href: "/#products" },
      { label: "E-Civil Case Builder", href: "/#products" },
      { label: "Request Demo", href: "/demo" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Resource center", href: "/resources" },
      { label: "Human review FAQ", href: "/resources#human-review-faq" },
      { label: "Guide requests", href: "/resources#guide-requests" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "information@docuscrit.com", href: "mailto:information@docuscrit.com" },
      { label: "(833) 362-6382", href: "tel:+18333626382" },
      { label: "Request a demo", href: "/demo" },
    ],
  },
];

export const footerLegal: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export const finalCtaBenefits = [
  "Reduce risk with clearer records",
  "Save time on manual preparation",
  "Protect your community with reviewed packages",
] as const;
