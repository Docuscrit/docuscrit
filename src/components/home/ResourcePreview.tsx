import { VisualIcon, type VisualIconName } from "../brand/VisualElements";
import type { ResourcePreview as ResourcePreviewType } from "../../content/home";

const previewContent: Record<ResourcePreviewType, { label: string; icon: VisualIconName; lines: string[] }> = {
  overview: { label: "Scanner overview", icon: "scanner", lines: ["Scan records", "Flag issues", "Prioritize risk"] },
  workflow: { label: "Workflow guide", icon: "ecivil", lines: ["Intake", "Draft", "Review"] },
  faq: { label: "Review FAQ", icon: "humanReview", lines: ["Checks", "Oversight", "Timing"] },
  playbook: { label: "Violation playbook", icon: "mapping", lines: ["Identify", "Document", "Resolve"] },
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
