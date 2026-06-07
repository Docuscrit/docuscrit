import { useEffect, useLayoutEffect } from "react";

const REVEAL_SAFETY_TIMEOUT_MS = 900;

export function useRevealAnimations() {
  useLayoutEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.documentElement.classList.add("motion-ready");

    function markVisible(element: HTMLElement) {
      element.classList.remove("reveal-pending");
      element.classList.add("is-visible");
    }

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealTargets.forEach(markVisible);
      return undefined;
    }

    revealTargets.forEach((target) => target.classList.add("reveal-pending"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            markVisible(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    revealTargets.forEach((target) => observer.observe(target));

    // Visual-regression, print, and slow-device safety: reveal animations must never be
    // able to leave real content transparent if the observer does not fire.
    const safetyTimer = window.setTimeout(() => {
      revealTargets.forEach(markVisible);
    }, REVEAL_SAFETY_TIMEOUT_MS);

    return () => {
      window.clearTimeout(safetyTimer);
      observer.disconnect();
      revealTargets.forEach((target) => target.classList.remove("reveal-pending"));
    };
  }, []);

  useEffect(() => {
    const updateHeaderState = () => {
      document.body.classList.toggle("has-scrolled", window.scrollY > 10);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);
}
