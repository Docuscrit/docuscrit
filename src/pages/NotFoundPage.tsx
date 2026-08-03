import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";

export function NotFoundPage() {
  return (
    <Section className="not-found-page">
      <Container size="narrow">
        <Card className="not-found-card">
          <p className="eyebrow">404 · Page not found</p>
          <h1>That page is not part of the DocuScrit platform site.</h1>
          <p>Return to the platform overview or review the three DocuScrit solutions.</p>
          <div className="not-found-card__actions">
            <Button href="/">
              <ArrowLeft size={18} aria-hidden="true" />
              Return home
            </Button>
            <Button href="/#platform" variant="secondary">
              Explore solutions
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
