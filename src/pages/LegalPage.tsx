import { ArrowRight } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from "../utils/contact";

type LegalPageKind = "privacy" | "terms";

type LegalSection = {
  title: string;
  copy: string[];
};

const legalContent: Record<LegalPageKind, { title: string; eyebrow: string; intro: string; sections: LegalSection[] }> = {
  privacy: {
    eyebrow: "Privacy Policy",
    title: "DocuScrit Privacy Policy",
    intro:
      "This policy explains the types of information DocuScrit may collect through this website and demo request flow, and how that information may be used.",
    sections: [
      {
        title: "Information we collect",
        copy: [
          "When you request a demo or contact DocuScrit, we may collect your name, work email, organization, role, number of communities or HOAs managed, and any message you choose to provide.",
          "The website may also collect basic technical information such as browser type, device information, referring pages, and general usage data through standard hosting, analytics, form-processing, or security tools.",
        ],
      },
      {
        title: "How we use information",
        copy: [
          "DocuScrit uses submitted information to respond to inquiries, prepare relevant product walkthroughs, share requested resources, and improve the website experience.",
          "We may use aggregated or de-identified information to understand product interest and improve messaging, onboarding, and support workflows.",
        ],
      },
      {
        title: "Sharing and service providers",
        copy: [
          "DocuScrit does not sell personal information. We may share information with service providers that support website hosting, Formspree form processing, email delivery, scheduling, analytics, or customer communications.",
          "We may also disclose information when required to comply with applicable law, protect rights and safety, or respond to valid legal requests.",
        ],
      },
      {
        title: "Your choices",
        copy: [
          "You can contact DocuScrit to request access, correction, or deletion of information you submitted through the website, subject to applicable requirements and operational needs.",
          "You can also choose not to submit optional information in the demo request form and instead contact the team directly by email.",
        ],
      },
      {
        title: "Contact",
        copy: [`Questions about this policy can be sent to ${CONTACT_EMAIL} or ${CONTACT_PHONE_DISPLAY}.`],
      },
    ],
  },
  terms: {
    eyebrow: "Terms of Service",
    title: "DocuScrit Website Terms",
    intro:
      "These terms govern access to and use of the DocuScrit marketing website, resource pages, and demo request flow.",
    sections: [
      {
        title: "Website use",
        copy: [
          "You may use this website to learn about DocuScrit, request resources, and contact the team for a product walkthrough.",
          "You agree not to misuse the website, interfere with its operation, attempt unauthorized access, or use the website for unlawful purposes.",
        ],
      },
      {
        title: "Product information",
        copy: [
          "Website content is provided for general informational purposes and may change as the product, services, or workflows evolve.",
          "Screens, examples, metrics, workflows, and resources may be illustrative unless expressly stated otherwise.",
        ],
      },
      {
        title: "No legal advice",
        copy: [
          "DocuScrit materials and website content are not legal advice. HOA teams should rely on qualified counsel or appropriate professionals for legal decisions and jurisdiction-specific requirements.",
          "References to rules, statutes, documents, costs, or demand-package workflows are intended to support organization and review, not to guarantee a legal outcome.",
        ],
      },
      {
        title: "Intellectual property",
        copy: [
          "The website design, brand assets, copy, graphics, and product concepts are owned by DocuScrit or its licensors and may not be copied or reused without permission.",
        ],
      },
      {
        title: "Contact",
        copy: [`Questions about these terms can be sent to ${CONTACT_EMAIL} or ${CONTACT_PHONE_DISPLAY}.`],
      },
    ],
  },
};

export function LegalPage({ kind }: { kind: LegalPageKind }) {
  const page = legalContent[kind];

  return (
    <>
      <Section className="subpage-hero legal-page-hero">
        <Container size="narrow">
          <div className="subpage-hero__copy subpage-hero__copy--center">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p>{page.intro}</p>
            <div className="legal-page__meta">Last updated: June 7, 2026</div>
          </div>
        </Container>
      </Section>

      <Section className="legal-page-section">
        <Container size="narrow">
          <Card className="legal-page-card">
            {page.sections.map((section) => (
              <section key={section.title} className="legal-copy-block">
                <h2>{section.title}</h2>
                {section.copy.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
            <div className="legal-page-card__actions">
              <Button href={`mailto:${CONTACT_EMAIL}`}>
                Contact DocuScrit
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
              <Button href="/" variant="secondary">
                Back to home
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
