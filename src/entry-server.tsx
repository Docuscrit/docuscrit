import { renderToString } from "react-dom/server";
import { App } from "./app/App";
import { getSiteRoute, NOT_FOUND_ROUTE } from "./content/site";
import { buildStructuredData } from "./utils/structuredData";

export function render(pathname: string) {
  return renderToString(<App path={pathname} />);
}

export function getStructuredDataForPath(pathname: string) {
  return buildStructuredData(getSiteRoute(pathname) ?? NOT_FOUND_ROUTE);
}
