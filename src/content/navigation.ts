import { productSolutions } from "./products";

export const primaryNavigation = [
  { label: "Platform", href: "/#platform" },
  { label: "Resources", href: "/resources" },
  { label: "Security", href: "/security" },
] as const;

export const productNavigation = productSolutions.map((product) => ({
  label: product.navigationLabel,
  name: product.name,
  description: product.summary,
  href: product.path,
  icon: product.icon,
}));

export const navigation = [
  primaryNavigation[0],
  ...productSolutions.map((product) => ({ label: product.navigationLabel, href: product.path })),
  ...primaryNavigation.slice(1),
];
