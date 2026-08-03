import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { footerColumns, footerLegal } from "../../content/home";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "../../utils/contact";
import { Container } from "../ui/Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Container size="wide">
        <div className="site-footer__panel">
          <div className="site-footer__top">
            <div className="site-footer__brand">
              <a
                className="site-logo site-logo--footer"
                href="/#about"
                aria-label="DocuScrit home"
                data-analytics-event="navigation_click"
                data-analytics-label="Logo"
                data-analytics-location="footer"
              >
                <span className="site-logo__wordmark">DocuScrit</span>
              </a>
              <p className="site-footer__tagline">Compliance workflows you can see and manage.</p>
              <p>
                DocuScrit helps HOA and property-management teams automate vendor COI tracking, prepare reviewed claim packets,
                and give boards clearer compliance risk visibility.
              </p>
              <div className="site-footer__contact">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  data-analytics-event="email_fallback_click"
                  data-analytics-label="Contact email"
                  data-analytics-location="footer"
                >
                  <Mail size={16} aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
                <a
                  href={`tel:${CONTACT_PHONE_TEL}`}
                  data-analytics-event="navigation_click"
                  data-analytics-label="Contact phone"
                  data-analytics-location="footer"
                >
                  <Phone size={16} aria-hidden="true" />
                  {CONTACT_PHONE_DISPLAY}
                </a>
                <a
                  href="/demo"
                  data-analytics-event="product_cta_click"
                  data-analytics-label="Request a demo"
                  data-analytics-location="footer"
                >
                  Request a demo
                </a>
              </div>
            </div>

            <div className="site-footer__columns">
              {footerColumns.map((column) => (
                <div key={column.title} className="site-footer__column">
                  <h2>{column.title}</h2>
                  <ul>
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          data-analytics-event="navigation_click"
                          data-analytics-label={link.label}
                          data-analytics-location="footer"
                        >
                          {link.label}
                          {link.href.startsWith("mailto:") || link.href.startsWith("tel:") ? null : (
                            <ArrowUpRight size={14} aria-hidden="true" />
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="site-footer__meta">
            <p>© <span suppressHydrationWarning>{currentYear}</span> DocuScrit. All rights reserved.</p>
            {footerLegal.length > 0 ? (
              <div className="site-footer__legal">
                {footerLegal.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    data-analytics-event="navigation_click"
                    data-analytics-label={link.label}
                    data-analytics-location="footer-legal"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </footer>
  );
}
