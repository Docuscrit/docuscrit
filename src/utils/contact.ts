export const CONTACT_EMAIL = "information@docuscrit.com";
export const CONTACT_PHONE_DISPLAY = "(833) 362-6382";
export const CONTACT_PHONE_TEL = "+18333626382";

export function createMailto(subject: string, body: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function createDemoMailto(details?: {
  name?: string;
  email?: string;
  organization?: string;
  role?: string;
  communities?: string;
  interests?: string[];
  message?: string;
}) {
  const body = details
    ? [
        "Hi DocuScrit team,",
        "",
        "I'd like to request a DocuScrit demo.",
        "",
        `Name: ${details.name ?? ""}`,
        `Email: ${details.email ?? ""}`,
        `Organization: ${details.organization ?? ""}`,
        `Role: ${details.role ?? ""}`,
        `Number of communities or HOAs: ${details.communities ?? ""}`,
        `Areas of interest: ${(details.interests ?? []).join(", ")}`,
        "",
        "What I'd like to review:",
        details.message ?? "",
      ].join("\n")
    : [
        "Hi DocuScrit team,",
        "",
        "I'd like to request a demo.",
        "",
        "Organization:",
        "Role:",
        "Number of communities or HOAs:",
        "What I'd like to review:",
      ].join("\n");

  return createMailto("Request a DocuScrit demo", body);
}

export function createResourceMailto(title: string) {
  return createMailto(
    `Request DocuScrit resource: ${title}`,
    [
      "Hi DocuScrit team,",
      "",
      `I would like to request this resource: ${title}.`,
      "",
      "Name:",
      "Organization:",
      "Role:",
    ].join("\n"),
  );
}
