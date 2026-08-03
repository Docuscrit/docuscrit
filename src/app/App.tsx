import type { ReactNode } from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { productByPath, type ProductPath } from "../content/products";
import { SITE_ROUTES, normalizeSitePath, type SitePageMetadata } from "../content/site";
import { useAnalytics } from "../hooks/useAnalytics";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { DemoPage } from "../pages/DemoPage";
import { HomePage } from "../pages/HomePage";
import { LegalPage } from "../pages/LegalPage";
import { ProductPage } from "../pages/ProductPage";
import { ResourceCenterPage } from "../pages/ResourceCenterPage";
import { SecurityPage } from "../pages/SecurityPage";

function getPage(): { route: SitePageMetadata; content: ReactNode } {
  const pathname = normalizeSitePath(window.location.pathname);
  const route = SITE_ROUTES[pathname];

  if (pathname in productByPath) {
    return { route, content: <ProductPage product={productByPath[pathname as ProductPath]} /> };
  }

  if (pathname === "/security") {
    return { route, content: <SecurityPage /> };
  }

  if (pathname === "/resources") {
    return { route, content: <ResourceCenterPage /> };
  }

  if (pathname === "/demo") {
    return { route, content: <DemoPage /> };
  }

  if (pathname === "/privacy") {
    return { route, content: <LegalPage kind="privacy" /> };
  }

  if (pathname === "/terms") {
    return { route, content: <LegalPage kind="terms" /> };
  }

  return { route, content: <HomePage /> };
}

export function App() {
  const page = getPage();
  useDocumentMetadata(page.route);
  useAnalytics(page.route);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        {page.content}
      </main>
      <Footer />
    </>
  );
}
