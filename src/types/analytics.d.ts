declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __docuscritGaInitialized?: boolean;
  }
}

export {};
