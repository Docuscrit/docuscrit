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
              <a className="site-logo site-logo--footer" href="/#about" aria-label="DocuScrit home">
                <span className="site-logo__wordmark">DocuScrit</span>
              </a>
              <p className="site-footer__tagline">Compliance records you can defend.</p>
              <p>
                DocuScrit helps HOA management teams find compliance gaps, estimate exposure, and prepare reviewed packages
                with human review built in.
              </p>
              <div className="site-footer__contact">
                <a href={`mailto:${CONTACT_EMAIL}`}>
                  <Mail size={16} aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
                <a href={`tel:${CONTACT_PHONE_TEL}`}>
                  <Phone size={16} aria-hidden="true" />
                  {CONTACT_PHONE_DISPLAY}
                </a>
                <a href="/demo">
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
                        <a href={link.href}>
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
            <p>© {currentYear} DocuScrit. All rights reserved.</p>
            {footerLegal.length > 0 ? (
              <div className="site-footer__legal">
                {footerLegal.map((link) => (
                  <a key={link.label} href={link.href}>
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
