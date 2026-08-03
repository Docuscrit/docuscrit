import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { primaryNavigation, productNavigation } from "../../content/navigation";
import { normalizePathname } from "../../content/site";
import { VisualIcon } from "../brand/VisualElements";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

function getHrefPath(href: string) {
  return href.startsWith("/") ? href.split("#")[0] || "/" : href;
}

function isNavigationItemActive(href: string, activePath: string, activeHash: string) {
  const hrefPath = getHrefPath(href);

  if (hrefPath === "/" && activePath === "/") {
    const hrefHash = href.includes("#") ? `#${href.split("#")[1]}` : "";
    const currentHash = activeHash && activeHash !== "#about" ? activeHash : "#platform";
    return hrefHash === currentHash;
  }

  return hrefPath === activePath;
}

type HeaderProps = {
  currentPath: string;
};

export function Header({ currentPath }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState(() => (typeof window === "undefined" ? "" : window.location.hash));
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const activePath = normalizePathname(currentPath);
  const productIsActive = productNavigation.some((item) => getHrefPath(item.href) === activePath);

  useEffect(() => {
    function handleHashChange() {
      setActiveHash(window.location.hash);
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setSolutionsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const firstFocusable = panelRef.current?.querySelector<HTMLElement>('a[href], button:not([disabled])');
    firstFocusable?.focus();
  }, [open]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && solutionsOpen) {
        setSolutionsOpen(false);
      }

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
  }, [open, solutionsOpen]);

  useEffect(() => {
    document.body.classList.toggle("has-open-menu", open);
    return () => document.body.classList.remove("has-open-menu");
  }, [open]);

  return (
    <header className="site-header">
      <Container className="site-header__inner" size="wide">
        <a
          className="site-logo"
          href="/#about"
          aria-label="DocuScrit home"
          data-analytics-event="navigation_click"
          data-analytics-label="Logo"
          data-analytics-location="header"
        >
          <span className="site-logo__wordmark">DocuScrit</span>
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          <a
            className="site-nav__link"
            href={primaryNavigation[0].href}
            aria-current={isNavigationItemActive(primaryNavigation[0].href, activePath, activeHash) ? "page" : undefined}
            data-analytics-event="navigation_click"
            data-analytics-label={primaryNavigation[0].label}
            data-analytics-location="header"
          >
            {primaryNavigation[0].label}
          </a>

          <div className="site-solutions-menu" ref={solutionsRef}>
            <button
              className="site-nav__link site-solutions-menu__toggle"
              type="button"
              aria-expanded={solutionsOpen}
              aria-controls="solutions-menu"
              data-active={productIsActive ? "true" : undefined}
              onClick={() => setSolutionsOpen((current) => !current)}
            >
              Solutions
              <ChevronDown size={15} aria-hidden="true" />
            </button>
            <div
              className={solutionsOpen ? "site-solutions-menu__panel site-solutions-menu__panel--open" : "site-solutions-menu__panel"}
              id="solutions-menu"
            >
              <span className="site-solutions-menu__eyebrow">DocuScrit solutions</span>
              {productNavigation.map((item) => (
                <a
                  className="site-solutions-menu__item"
                  href={item.href}
                  key={item.href}
                  aria-current={getHrefPath(item.href) === activePath ? "page" : undefined}
                  onClick={() => setSolutionsOpen(false)}
                  data-analytics-event="navigation_click"
                  data-analytics-label={item.name}
                  data-analytics-location="header-solutions"
                  data-analytics-product={item.href.slice(1)}
                >
                  <span className="site-solutions-menu__icon">
                    <VisualIcon name={item.icon} size={23} />
                  </span>
                  <span>
                    <strong>{item.name}</strong>
                    <small>{item.description}</small>
                  </span>
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {primaryNavigation.slice(1).map((item) => (
            <a
              key={item.href}
              className="site-nav__link"
              href={item.href}
              aria-current={isNavigationItemActive(item.href, activePath, activeHash) ? "page" : undefined}
              data-analytics-event="navigation_click"
              data-analytics-label={item.label}
              data-analytics-location="header"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <Button
            href="/demo"
            className="site-header__demo"
            data-analytics-event="product_cta_click"
            data-analytics-label="Request Demo"
            data-analytics-location="header"
          >
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
            <a
              className="site-menu-panel__link"
              href="/#platform"
              onClick={() => setOpen(false)}
              data-analytics-event="navigation_click"
              data-analytics-label="Platform overview"
              data-analytics-location="mobile-menu"
            >
              Platform overview
            </a>
            <span className="site-menu-panel__heading">Solutions</span>
            {productNavigation.map((item) => (
              <a
                key={item.href}
                className="site-menu-panel__product"
                href={item.href}
                aria-current={getHrefPath(item.href) === activePath ? "page" : undefined}
                onClick={() => setOpen(false)}
                data-analytics-event="navigation_click"
                data-analytics-label={item.name}
                data-analytics-location="mobile-menu"
                data-analytics-product={item.href.slice(1)}
              >
                <VisualIcon name={item.icon} size={22} />
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                </span>
              </a>
            ))}
            <a
              className="site-menu-panel__link"
              href="/resources"
              onClick={() => setOpen(false)}
              data-analytics-event="navigation_click"
              data-analytics-label="Resources"
              data-analytics-location="mobile-menu"
            >
              Resources
            </a>
            <a
              className="site-menu-panel__link"
              href="/security"
              onClick={() => setOpen(false)}
              data-analytics-event="navigation_click"
              data-analytics-label="Security and governance"
              data-analytics-location="mobile-menu"
            >
              Security and governance
            </a>
          </div>
          <Button
            href="/demo"
            className="site-menu-panel__cta"
            onClick={() => setOpen(false)}
            data-analytics-event="product_cta_click"
            data-analytics-label="Request Demo"
            data-analytics-location="mobile-menu"
          >
            Request Demo
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
        </Container>
      </div>
    </header>
  );
}
