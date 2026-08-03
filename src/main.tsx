import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./app/App";
import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/utilities.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("DocuScrit root element was not found.");
}

const app = (
  <StrictMode>
    <App path={window.location.pathname} />
  </StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
