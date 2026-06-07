import { VisualIcon } from "../brand/VisualElements";
import { featureIconMap } from "./homeIconMaps";

export function FeatureIcon({ title, size = 26 }: { title: string; size?: number }) {
  return <VisualIcon name={featureIconMap[title] ?? "scanner"} size={size} />;
}
