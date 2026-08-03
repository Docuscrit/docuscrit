import { productSolutions } from "./products";

export const navigation = [
  { label: "Platform", href: "/#platform" },
  ...productSolutions.map((product) => ({
    label: product.navigationLabel,
    href: `/#${product.id}`,
  })),
  { label: "Resources", href: "/resources" },
];
