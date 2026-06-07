import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "../ui/Button";
import { createDemoMailto } from "../../utils/contact";
import { submitDemoRequest } from "../../utils/formspree";
import { cx } from "../../utils/classNames";

const interestOptions = [
  "Compliance Gap Scanner",
  "E-Civil Case Builder",
  "Human review workflow",
  "Resource library",
] as const;

type DemoRequestFormValues = {
  name: string;
  email: string;
  organization: string;
  role: string;
  communities: string;
  message: string;
  interests: string[];
  gotcha: string;
};

const initialValues: DemoRequestFormValues = {
  name: "",
  email: "",
  organization: "",
  role: "",
  communities: "",
  message: "",
  interests: ["Compliance Gap Scanner", "E-Civil Case Builder"],
  gotcha: "",
};

type DemoRequestFormProps = {
  className?: string;
  tone?: "light" | "dark";
  compact?: boolean;
};

type SubmitState = "idle" | "sending" | "success" | "error";

export function DemoRequestForm({ className, tone = "light", compact = false }: DemoRequestFormProps) {
  const [values, setValues] = useState<DemoRequestFormValues>(initialValues);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [status, setStatus] = useState("");

  const mailto = useMemo(() => createDemoMailto(values), [values]);
  const isSending = submitState === "sending";

  function updateValue(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.currentTarget;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function updateInterest(event: ChangeEvent<HTMLInputElement>) {
    const { checked, value } = event.currentTarget;

    setValues((current) => ({
      ...current,
      interests: checked
        ? [...current.interests, value]
        : current.interests.filter((interest) => interest !== value),
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (values.gotcha) {
      setSubmitState("success");
      setStatus("Thanks. Your request has been received.");
      return;
    }

    setSubmitState("sending");
    setStatus("Sending your request...");

    try {
      await submitDemoRequest(values);
      setSubmitState("success");
      setStatus("Thanks. Your demo request has been sent to DocuScrit.");
      setValues(initialValues);
    } catch (error) {
      setSubmitState("error");
      setStatus(
        error instanceof Error
          ? `${error.message} You can still email the request manually.`
          : "The form could not be submitted right now. You can still email the request manually.",
      );
    }
  }

  return (
    <form
      className={cx("demo-form", `demo-form--${tone}`, compact && "demo-form--compact", className)}
      onSubmit={handleSubmit}
      noValidate={false}
    >
      <div className="demo-form__header">
        <span className="demo-form__eyebrow">Request a walkthrough</span>
        <h2>{compact ? "Book a DocuScrit demo" : "Tell us what you want to review."}</h2>
        <p>
          Share a few details and the DocuScrit team will follow up at the email address you provide.
        </p>
      </div>

      <label className="demo-form__trap" aria-hidden="true">
        <span>Leave this field blank</span>
        <input
          name="gotcha"
          value={values.gotcha}
          onChange={updateValue}
          tabIndex={-1}
          autoComplete="off"
        />
      </label>

      <div className="demo-form__grid">
        <label>
          <span>Name</span>
          <input name="name" value={values.name} onChange={updateValue} autoComplete="name" required disabled={isSending} />
        </label>
        <label>
          <span>Work email</span>
          <input name="email" type="email" value={values.email} onChange={updateValue} autoComplete="email" required disabled={isSending} />
        </label>
        <label>
          <span>Organization</span>
          <input name="organization" value={values.organization} onChange={updateValue} autoComplete="organization" required disabled={isSending} />
        </label>
        <label>
          <span>Role</span>
          <input name="role" value={values.role} onChange={updateValue} autoComplete="organization-title" disabled={isSending} />
        </label>
        <label>
          <span>Communities / HOAs managed</span>
          <select name="communities" value={values.communities} onChange={updateValue} disabled={isSending}>
            <option value="">Select range</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-150">51-150</option>
            <option value="151+">151+</option>
          </select>
        </label>
      </div>

      <fieldset className="demo-form__interests" disabled={isSending}>
        <legend>Areas of interest</legend>
        <div>
          {interestOptions.map((interest) => (
            <label key={interest}>
              <input
                type="checkbox"
                value={interest}
                checked={values.interests.includes(interest)}
                onChange={updateInterest}
              />
              <span>{interest}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="demo-form__message">
        <span>What should the demo focus on?</span>
        <textarea
          name="message"
          value={values.message}
          onChange={updateValue}
          rows={compact ? 4 : 5}
          placeholder="Tell us what you want to review first, such as records, demand-package drafts, or repeat violations."
          disabled={isSending}
        />
      </label>

      <div className="demo-form__actions">
        <Button type="submit" disabled={isSending}>
          {isSending ? "Sending request..." : "Send demo request"}
          <ArrowRight size={18} aria-hidden="true" />
        </Button>
        <a href={mailto} className="demo-form__fallback">
          <Mail size={16} aria-hidden="true" />
          Email instead
        </a>
      </div>
      <p className={cx("demo-form__status", submitState !== "idle" && `demo-form__status--${submitState}`)} aria-live="polite">
        {status}
      </p>
    </form>
  );
}
