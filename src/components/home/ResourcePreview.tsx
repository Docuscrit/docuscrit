import { VisualIcon, type VisualIconName } from "../brand/VisualElements";
import type { ResourcePreview as ResourcePreviewType } from "../../content/home";

const previewContent: Record<ResourcePreviewType, { label: string; icon: VisualIconName; lines: string[] }> = {
  overview: { label: "Vendor COI overview", icon: "upload", lines: ["Collect", "Monitor", "Renew"] },
  workflow: { label: "Claim packet guide", icon: "ecivil", lines: ["History", "Packet", "Review"] },
  faq: { label: "Risk reporting guide", icon: "financialRisk", lines: ["Documents", "Policies", "Actions"] },
  playbook: { label: "Platform overview", icon: "mapping", lines: ["Vendor", "Escalation", "Visibility"] },
};

export function ResourcePreview({ preview }: { preview: ResourcePreviewType }) {
  const content = previewContent[preview];

  return (
    <div className="resource-preview-simple" aria-hidden="true">
      <div className="resource-preview-simple__head">
        <VisualIcon name={content.icon} size={18} />
        <span>{content.label}</span>
      </div>
      <div className="resource-preview-simple__lines">
        {content.lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
    </div>
  );
}
