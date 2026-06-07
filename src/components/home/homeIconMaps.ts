import type { VisualIconName } from "../brand/VisualElements";

export const featureIconMap: Record<string, VisualIconName> = {
  "Compliance Gap Scanner": "scanner",
  "Financial Risk Estimate": "financialRisk",
  "E-Civil Case Builder": "ecivil",
  "Rule + Law Reference Mapping": "mapping",
  "Human Review": "humanReview",
  "Faster Resolution": "fasterResolution",
};

export const resourceIconMap: Record<string, VisualIconName> = {
  overview: "scanner",
  workflow: "ecivil",
  faq: "humanReview",
  playbook: "mapping",
};
