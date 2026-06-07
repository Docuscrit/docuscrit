import type { SVGProps } from "react";
import { cx } from "../../utils/classNames";

export type VisualIconName =
  | "scanner"
  | "ecivil"
  | "financialRisk"
  | "mapping"
  | "humanReview"
  | "fasterResolution"
  | "upload"
  | "reviewComplete"
  | "shieldReview";

type VisualIconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: VisualIconName;
  size?: number;
};

export function VisualIcon({ name, size = 28, className, ...props }: VisualIconProps) {
  return (
    <svg
      className={cx("visual-icon", `visual-icon--${name}`, className)}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {name === "scanner" && <ScannerIcon />}
      {name === "ecivil" && <ECivilIcon />}
      {name === "financialRisk" && <FinancialRiskIcon />}
      {name === "mapping" && <MappingIcon />}
      {name === "humanReview" && <HumanReviewIcon />}
      {name === "fasterResolution" && <FasterResolutionIcon />}
      {name === "upload" && <UploadIcon />}
      {name === "reviewComplete" && <ReviewCompleteIcon />}
      {name === "shieldReview" && <ShieldReviewIcon />}
    </svg>
  );
}

function ScannerIcon() {
  return (
    <>
      <path className="visual-icon__line" d="M18 10h19l9 9v20" />
      <path className="visual-icon__line" d="M37 10v10h10" />
      <path className="visual-icon__line" d="M18 10v44h20" />
      <path className="visual-icon__line" d="M25 25h10" />
      <path className="visual-icon__line" d="M25 34h7" />
      <path className="visual-icon__accent" d="M24 43h1M31 43h1M24 50h1M31 50h1" />
      <circle className="visual-icon__line" cx="44" cy="43" r="9" />
      <path className="visual-icon__accent" d="m40.5 43 2.5 2.5 5-5" />
      <path className="visual-icon__line" d="m50.5 49.5 5.5 5.5" />
    </>
  );
}

function ECivilIcon() {
  return (
    <>
      <path className="visual-icon__line" d="M32 10v38" />
      <path className="visual-icon__line" d="M17 17h30" />
      <path className="visual-icon__accent" d="M32 17 18 26M32 17l14 9" />
      <path className="visual-icon__line" d="M14 26h8l5 13a11 11 0 0 1-18 0l5-13Z" />
      <path className="visual-icon__line" d="M42 26h8l5 13a11 11 0 0 1-18 0l5-13Z" />
      <path className="visual-icon__accent" d="M22 54h20" />
    </>
  );
}

function FinancialRiskIcon() {
  return (
    <>
      <path className="visual-icon__line" d="M11 48h42" />
      <path className="visual-icon__fill" d="M17 35h8v13h-8zM29 27h8v21h-8zM41 19h8v29h-8z" />
      <path className="visual-icon__line" d="m11 32 12-10 10 6 18-18" />
      <path className="visual-icon__line" d="M45 10h6v6" />
      <circle className="visual-icon__soft-fill" cx="48" cy="46" r="10" />
      <path className="visual-icon__accent" d="M48 39v14M44 43c0-2 2-3 4-3s4 1 4 3-2 3-4 3-4 1-4 3 2 3 4 3 4-1 4-3" />
    </>
  );
}

function MappingIcon() {
  return (
    <>
      <path className="visual-icon__line" d="M11 13h15c5 0 7 3 7 7v34c0-4-3-6-7-6H11V13Z" />
      <path className="visual-icon__line" d="M53 13H38c-5 0-7 3-7 7v34c0-4 3-6 7-6h15V13Z" />
      <path className="visual-icon__accent" d="M40 20h7M40 28h7M18 22h6M18 31h8" />
      <path className="visual-icon__fill" d="M41 40v14l4-3 4 3V40" />
    </>
  );
}

function HumanReviewIcon() {
  return (
    <>
      <circle className="visual-icon__line" cx="25" cy="22" r="8" />
      <path className="visual-icon__line" d="M11 50c2-10 9-15 18-15 4 0 8 1 11 3" />
      <path className="visual-icon__soft-fill" d="M43 32 55 36v8c0 8-5 12-12 15-7-3-12-7-12-15v-8l12-4Z" />
      <path className="visual-icon__line" d="M43 32 55 36v8c0 8-5 12-12 15-7-3-12-7-12-15v-8l12-4Z" />
      <path className="visual-icon__accent" d="m38.5 45 3.4 3.4 7-8" />
    </>
  );
}

function FasterResolutionIcon() {
  return (
    <>
      <path className="visual-icon__accent" d="M8 24h14M8 32h10M8 40h14" />
      <path className="visual-icon__line" d="M47 17a20 20 0 1 1-15-5" />
      <path className="visual-icon__line" d="M47 17h-10M47 17V7" />
      <path className="visual-icon__accent" d="M34 24v11l8 5" />
    </>
  );
}

function UploadIcon() {
  return (
    <>
      <path className="visual-icon__line" d="M22 44H16a10 10 0 0 1-1-20 15 15 0 0 1 29-4 12 12 0 0 1 4 23h-6" />
      <path className="visual-icon__accent" d="M32 48V28m0 0-8 8m8-8 8 8" />
    </>
  );
}

function ReviewCompleteIcon() {
  return (
    <>
      <path className="visual-icon__line" d="M32 8 50 16v13c0 14-8 22-18 27-10-5-18-13-18-27V16l18-8Z" />
      <path className="visual-icon__accent" d="m23 32 6 6 13-14" />
      <path className="visual-icon__soft-fill" d="M32 8 50 16v13c0 14-8 22-18 27-10-5-18-13-18-27V16l18-8Z" />
    </>
  );
}

function ShieldReviewIcon() {
  return (
    <>
      <path className="visual-icon__line" d="M23 11 42 18v13c0 12-7 20-19 25C11 51 4 43 4 31V18l19-7Z" />
      <circle className="visual-icon__line" cx="23" cy="27" r="6" />
      <path className="visual-icon__line" d="M12 45c2-7 6-10 11-10s9 3 11 10" />
      <circle className="visual-icon__soft-fill" cx="47" cy="45" r="11" />
      <circle className="visual-icon__line" cx="47" cy="45" r="11" />
      <path className="visual-icon__accent" d="m42.5 45 3.2 3.2 6-7" />
    </>
  );
}

export function OfficerReviewedSignal({ className }: { className?: string }) {
  return (
    <div className={cx("trust-signal trust-signal--officer", className)}>
      <div className="trust-signal__mark">
        <VisualIcon name="shieldReview" size={34} />
      </div>
      <div>
        <strong>Compliance Officer Reviewed</strong>
        <span>Case package reviewed by a DocuScrit Compliance Officer.</span>
      </div>
    </div>
  );
}

export function ReadyForReviewSignal({ className }: { className?: string }) {
  return (
    <div className={cx("trust-signal trust-signal--ready", className)}>
      <div className="trust-signal__mark">
        <VisualIcon name="reviewComplete" size={32} />
      </div>
      <div>
        <strong>Ready for Review</strong>
        <span>Prepared and queued for human review.</span>
      </div>
    </div>
  );
}

export function HumanReviewedSignal({ className }: { className?: string }) {
  return (
    <div className={cx("trust-signal trust-signal--human", className)}>
      <div className="trust-signal__mark">
        <VisualIcon name="humanReview" size={32} />
      </div>
      <div>
        <strong>Human Reviewed</strong>
        <span>Reviewed for documentation, context, and readiness.</span>
      </div>
    </div>
  );
}

export function RiskMeterWidget({ className }: { className?: string }) {
  return (
    <div className={cx("brand-widget risk-meter", className)}>
      <div className="brand-widget__head">
        <strong>Risk Meter</strong>
        <span>High risk</span>
      </div>
      <div className="risk-meter__gauge" aria-hidden="true">
        <div className="risk-meter__needle" />
        <div className="risk-meter__value">
          <strong>72</strong>
          <span>High Risk</span>
        </div>
      </div>
      <div className="risk-meter__legend">
        <span><i />Low</span>
        <span><i />Medium</span>
        <span><i />High</span>
        <span><i />Critical</span>
      </div>
    </div>
  );
}

export function ComplianceScoreWidget({ className }: { className?: string }) {
  return (
    <div className={cx("brand-widget compliance-score", className)}>
      <div className="brand-widget__head">
        <strong>Review Readiness</strong>
        <span>Ready</span>
      </div>
      <div className="compliance-score__ring" aria-hidden="true">
        <div>
          <strong>OK</strong>
          <span>Ready</span>
        </div>
      </div>
      <div className="compliance-score__stats">
        <span><strong>Docs</strong>Attached</span>
        <span><strong>Rules</strong>Referenced</span>
        <span><strong>Review</strong>Queued</span>
      </div>
    </div>
  );
}

export function DocumentUploadWidget({ className }: { className?: string }) {
  return (
    <div className={cx("brand-widget doc-upload-widget", className)}>
      <div className="brand-widget__head">
        <strong>Document Upload</strong>
        <span>Secure</span>
      </div>
      <div className="doc-upload-widget__zone">
        <VisualIcon name="upload" size={42} />
        <strong>Drag and drop files here</strong>
        <span>or browse to upload</span>
      </div>
      <p>PDF, DOCX, XLSX, CSV, ZIP up to 100MB</p>
      <small>Documents are encrypted and stored securely.</small>
    </div>
  );
}

export function ComplianceRecordSeal({ className }: { className?: string }) {
  return (
    <div className={cx("compliance-record-seal", className)}>
      <div className="compliance-record-seal__ring" aria-hidden="true">
        <VisualIcon name="reviewComplete" size={34} />
      </div>
      <div>
        <span>Human review</span>
        <strong>Officer Reviewed</strong>
        <small>Queued for reviewed next steps</small>
      </div>
    </div>
  );
}
