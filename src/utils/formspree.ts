import { CONTACT_EMAIL } from "./contact";

const FALLBACK_FORM_ENDPOINT = "";

export const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || FALLBACK_FORM_ENDPOINT;

export type DemoFormPayload = {
  name: string;
  email: string;
  organization: string;
  role: string;
  communities: string;
  message: string;
  interests: string[];
  gotcha?: string;
};

export async function submitDemoRequest(payload: DemoFormPayload) {
  if (!FORMSPREE_ENDPOINT) {
    throw new Error("The demo form endpoint is not configured.");
  }

  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _subject: "New DocuScrit demo request",
      _replyto: payload.email,
      _gotcha: payload.gotcha ?? "",
      name: payload.name.trim(),
      email: payload.email.trim(),
      organization: payload.organization.trim(),
      role: payload.role.trim(),
      communities: payload.communities,
      interests: payload.interests.join(", "),
      message: payload.message.trim(),
      destination: CONTACT_EMAIL,
      source: "DocuScrit website demo form",
    }),
  });

  if (response.ok) {
    return;
  }

  let errorMessage = "The form could not be submitted right now.";

  try {
    const data = (await response.json()) as { errors?: Array<{ message?: string }>; error?: string };
    errorMessage = data.errors?.[0]?.message || data.error || errorMessage;
  } catch {
    // Keep the generic message when Formspree returns a non-JSON error response.
  }

  throw new Error(errorMessage);
}

