import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { ArrowRight, Mail } from "lucide-react";
import { productSolutions } from "../../content/products";
import { getAttributionData, trackEvent } from "../../utils/analytics";
import { cx } from "../../utils/classNames";
import { createDemoMailto } from "../../utils/contact";
import { submitDemoRequest } from "../../utils/formspree";
import { Button } from "../ui/Button";

const interestOptions = [
  ...productSolutions.map((product) => product.demoLabel),
  "Complete DocuScrit platform",
];

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

type ErrorField = "name" | "email" | "organization" | "interests";
type FormErrors = Partial<Record<ErrorField, string>>;

const fieldIds: Record<ErrorField, string> = {
  name: "demo-name",
  email: "demo-email",
  organization: "demo-organization",
  interests: "demo-interests",
};

function createInitialValues(): DemoRequestFormValues {
  return {
    name: "",
    email: "",
    organization: "",
    role: "",
    communities: "",
    message: "",
    interests: [],
    gotcha: "",
  };
}

function validate(values: DemoRequestFormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Enter your work email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid work email address.";
  }

  if (!values.organization.trim()) {
    errors.organization = "Enter your organization.";
  }

  if (values.interests.length === 0) {
    errors.interests = "Choose at least one workflow interest.";
  }

  return errors;
}

type DemoRequestFormProps = {
  className?: string;
  tone?: "light" | "dark";
  compact?: boolean;
};

type SubmitState = "idle" | "sending" | "success" | "error";

export function DemoRequestForm({ className, tone = "light", compact = false }: DemoRequestFormProps) {
  const [values, setValues] = useState<DemoRequestFormValues>(createInitialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [status, setStatus] = useState("");
  const startedRef = useRef(false);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const shouldFocusErrorSummaryRef = useRef(false);

  const mailto = useMemo(() => createDemoMailto(values), [values]);
  const isSending = submitState === "sending";

  useEffect(() => {
    const productId = new URLSearchParams(window.location.search).get("product");
    const preselectedInterest = productSolutions.find((product) => product.id === productId)?.demoLabel;

    if (preselectedInterest) {
      setValues((current) =>
        current.interests.includes(preselectedInterest)
          ? current
          : { ...current, interests: [preselectedInterest, ...current.interests] },
      );
    }
  }, []);

  useEffect(() => {
    if (shouldFocusErrorSummaryRef.current && Object.keys(errors).length > 0) {
      errorSummaryRef.current?.focus();
      shouldFocusErrorSummaryRef.current = false;
    }
  }, [errors]);

  function markStarted() {
    if (startedRef.current) {
      return;
    }

    startedRef.current = true;
    trackEvent("demo_form_start", {
      form_location: compact ? "embedded" : "demo_page",
      preselected_interest: values.interests[0],
    });
  }

  function clearFieldError(field: ErrorField) {
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function updateValue(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.currentTarget;
    setValues((current) => ({ ...current, [name]: value }));

    if (name === "name" || name === "email" || name === "organization") {
      clearFieldError(name);
    }
  }

  function updateInterest(event: ChangeEvent<HTMLInputElement>) {
    const { checked, value } = event.currentTarget;

    setValues((current) => ({
      ...current,
      interests: checked
        ? [...current.interests, value]
        : current.interests.filter((interest) => interest !== value),
    }));
    clearFieldError("interests");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    markStarted();

    if (values.gotcha) {
      setSubmitState("success");
      setStatus("Thanks. Your request has been received.");
      return;
    }

    const validationErrors = validate(values);

    if (Object.keys(validationErrors).length > 0) {
      shouldFocusErrorSummaryRef.current = true;
      setErrors(validationErrors);
      setSubmitState("error");
      setStatus("Review the highlighted fields and try again.");
      trackEvent("demo_form_error", {
        error_type: "validation",
        error_count: Object.keys(validationErrors).length,
      });
      return;
    }

    setErrors({});
    setSubmitState("sending");
    setStatus("Sending your request...");

    try {
      await submitDemoRequest({
        ...values,
        attribution: getAttributionData(),
      });
      setSubmitState("success");
      setStatus("Thanks. Your demo request has been sent to DocuScrit.");
      trackEvent("demo_form_submit", {
        workflow_interest: values.interests.join(" | "),
        organization_size: values.communities || "not_provided",
        form_location: compact ? "embedded" : "demo_page",
      });
      setValues(createInitialValues());
      startedRef.current = false;
    } catch (error) {
      const message =
        error instanceof Error
          ? `${error.message} You can still email the request manually.`
          : "The form could not be submitted right now. You can still email the request manually.";
      setSubmitState("error");
      setStatus(message);
      trackEvent("demo_form_error", {
        error_type: "submission",
        error_message: error instanceof Error ? error.message : "unknown",
      });
    }
  }

  const errorEntries = Object.entries(errors) as Array<[ErrorField, string]>;

  return (
    <form
      className={cx("demo-form", `demo-form--${tone}`, compact && "demo-form--compact", className)}
      onSubmit={handleSubmit}
      onFocusCapture={markStarted}
      noValidate
    >
      <div className="demo-form__header">
        <span className="demo-form__eyebrow">Request a walkthrough</span>
        <h2>{compact ? "Book a DocuScrit demo" : "Choose the workflow you want to review."}</h2>
        <p>Share a few details and the DocuScrit team will tailor the walkthrough to your priorities.</p>
      </div>

      {errorEntries.length > 0 ? (
        <div className="demo-form__error-summary" role="alert" tabIndex={-1} ref={errorSummaryRef}>
          <strong>There are {errorEntries.length} items to review.</strong>
          <ul>
            {errorEntries.map(([field, message]) => (
              <li key={field}>
                <a href={`#${fieldIds[field]}`}>{message}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

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
        <label htmlFor="demo-name">
          <span>Name</span>
          <input
            id="demo-name"
            name="name"
            value={values.name}
            onChange={updateValue}
            autoComplete="name"
            required
            disabled={isSending}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "demo-name-error" : undefined}
          />
          {errors.name ? <small className="demo-form__field-error" id="demo-name-error">{errors.name}</small> : null}
        </label>
        <label htmlFor="demo-email">
          <span>Work email</span>
          <input
            id="demo-email"
            name="email"
            type="email"
            value={values.email}
            onChange={updateValue}
            autoComplete="email"
            inputMode="email"
            required
            disabled={isSending}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "demo-email-error" : undefined}
          />
          {errors.email ? <small className="demo-form__field-error" id="demo-email-error">{errors.email}</small> : null}
        </label>
        <label htmlFor="demo-organization">
          <span>Organization</span>
          <input
            id="demo-organization"
            name="organization"
            value={values.organization}
            onChange={updateValue}
            autoComplete="organization"
            required
            disabled={isSending}
            aria-invalid={Boolean(errors.organization)}
            aria-describedby={errors.organization ? "demo-organization-error" : undefined}
          />
          {errors.organization ? (
            <small className="demo-form__field-error" id="demo-organization-error">{errors.organization}</small>
          ) : null}
        </label>
        <label htmlFor="demo-role">
          <span>Role</span>
          <input
            id="demo-role"
            name="role"
            value={values.role}
            onChange={updateValue}
            autoComplete="organization-title"
            disabled={isSending}
          />
        </label>
        <label htmlFor="demo-communities">
          <span>Communities / HOAs managed</span>
          <select
            id="demo-communities"
            name="communities"
            value={values.communities}
            onChange={updateValue}
            disabled={isSending}
          >
            <option value="">Select range</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-150">51-150</option>
            <option value="151+">151+</option>
          </select>
        </label>
      </div>

      <fieldset
        className="demo-form__interests"
        id="demo-interests"
        disabled={isSending}
        aria-invalid={Boolean(errors.interests)}
        aria-describedby={errors.interests ? "demo-interests-error" : undefined}
        tabIndex={-1}
      >
        <legend>Primary workflow interest</legend>
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
        {errors.interests ? (
          <small className="demo-form__field-error" id="demo-interests-error">{errors.interests}</small>
        ) : null}
      </fieldset>

      <label className="demo-form__message" htmlFor="demo-message">
        <span>What should the demo focus on?</span>
        <textarea
          id="demo-message"
          name="message"
          value={values.message}
          onChange={updateValue}
          rows={compact ? 4 : 5}
          placeholder="For example: expiring vendor COIs, claim packet preparation, board reporting, or a complete platform walkthrough."
          disabled={isSending}
        />
      </label>

      <div className="demo-form__actions">
        <Button type="submit" disabled={isSending}>
          {isSending ? "Sending request..." : "Send demo request"}
          <ArrowRight size={18} aria-hidden="true" />
        </Button>
        <a
          href={mailto}
          className="demo-form__fallback"
          data-analytics-event="email_fallback_click"
          data-analytics-label="Email demo request instead"
          data-analytics-location={compact ? "embedded-demo-form" : "demo-page-form"}
        >
          <Mail size={16} aria-hidden="true" />
          Email instead
        </a>
      </div>
      <p
        className={cx("demo-form__status", submitState !== "idle" && `demo-form__status--${submitState}`)}
        aria-live="polite"
      >
        {status}
      </p>
    </form>
  );
}
