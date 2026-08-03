import type { ReactNode } from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { productByPath, type ProductPath } from "../content/products";
import {
  NOT_FOUND_ROUTE,
  getSiteRoute,
  normalizePathname,
  type SitePageMetadata,
} from "../content/site";
import { useAnalytics } from "../hooks/useAnalytics";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { DemoPage } from "../pages/DemoPage";
import { HomePage } from "../pages/HomePage";
import { LegalPage } from "../pages/LegalPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ProductPage } from "../pages/ProductPage";
import { ResourceCenterPage } from "../pages/ResourceCenterPage";
import { SecurityPage } from "../pages/SecurityPage";

type AppProps = {
  path?: string;
};

function resolvePage(pathname: string): { route: SitePageMetadata; content: ReactNode; found: boolean } {
  const normalizedPath = normalizePathname(pathname);
  const route = getSiteRoute(normalizedPath);

  if (!route) {
    return { route: NOT_FOUND_ROUTE, content: <NotFoundPage />, found: false };
  }

  if (normalizedPath in productByPath) {
    return {
      route,
      content: <ProductPage product={productByPath[normalizedPath as ProductPath]} />,
      found: true,
    };
  }

  if (normalizedPath === "/security") {
    return { route, content: <SecurityPage />, found: true };
  }

  if (normalizedPath === "/resources") {
    return { route, content: <ResourceCenterPage />, found: true };
  }

  if (normalizedPath === "/demo") {
    return { route, content: <DemoPage />, found: true };
  }

  if (normalizedPath === "/privacy") {
    return { route, content: <LegalPage kind="privacy" />, found: true };
  }

  if (normalizedPath === "/terms") {
    return { route, content: <LegalPage kind="terms" />, found: true };
  }

  return { route, content: <HomePage />, found: true };
}

export function App({ path }: AppProps) {
  const requestedPath = path ?? (typeof window !== "undefined" ? window.location.pathname : "/");
  const page = resolvePage(requestedPath);
  useDocumentMetadata(page.route);
  useAnalytics(page.route);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header currentPath={page.found ? page.route.path : normalizePathname(requestedPath)} />
      <main id="main" tabIndex={-1}>
        {page.content}
      </main>
      <Footer />
    </>
  );
}
