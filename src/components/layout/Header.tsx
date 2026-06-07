import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { navigation } from "../../content/navigation";
import { normalizeSitePath } from "../../content/site";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

function getHrefPath(href: string) {
  return href.startsWith("/") ? href.split("#")[0] || "/" : href;
}

function isNavigationItemActive(href: string, activePath: string) {
  if (activePath === "/") {
    return href === "/#about";
  }

  return normalizeSitePath(getHrefPath(href)) === activePath;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const activePath = normalizeSitePath(window.location.pathname);

  useEffect(() => {
    if (!open) {
      return;
    }

    const firstFocusable = panelRef.current?.querySelector<HTMLElement>('a[href], button:not([disabled])');
    firstFocusable?.focus();
  }, [open]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!open) {
        return;
      }

      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    document.body.classList.toggle("has-open-menu", open);

    return () => document.body.classList.remove("has-open-menu");
  }, [open]);

  return (
    <header className="site-header">
      <Container className="site-header__inner" size="wide">
        <a className="site-logo" href="/#about" aria-label="DocuScrit home">
          <span className="site-logo__wordmark">DocuScrit</span>
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          {navigation.map((item) => {
            const isActive = isNavigationItemActive(item.href, activePath);

            return (
              <a key={item.href} className="site-nav__link" href={item.href} aria-current={isActive ? "page" : undefined}>
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="site-header__actions">
          <Button href="/demo" className="site-header__demo">
            Request Demo
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
          <button
            ref={toggleRef}
            className="site-menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </Container>

      <div
        ref={panelRef}
        className={open ? "site-menu-panel site-menu-panel--open" : "site-menu-panel"}
        id="mobile-nav"
        aria-hidden={!open}
      >
        <Container className="site-menu-panel__inner" size="wide">
          <div className="site-menu-panel__links">
            {navigation.map((item) => {
              const isActive = isNavigationItemActive(item.href, activePath);

              return (
                <a
                  key={item.href}
                  className="site-menu-panel__link"
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
          <Button href="/demo" className="site-menu-panel__cta" onClick={() => setOpen(false)}>
            Request Demo
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
        </Container>
      </div>
    </header>
  );
}
