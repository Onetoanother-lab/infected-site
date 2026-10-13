import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/**
 * Smooth scroll, driven by GSAP's ticker so ScrollTrigger and Lenis agree on
 * one clock. With reduced motion we skip Lenis entirely and let the browser
 * scroll natively.
 */
export function initSmoothScroll(reduced: boolean): Lenis | null {
  if (reduced) return null;

  const lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.4 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

/** Jump to an element, with or without smooth scrolling. */
export function scrollToElement(lenis: Lenis | null, target: HTMLElement, instant = false): void {
  if (lenis) {
    lenis.scrollTo(target, { offset: -40, immediate: instant });
    return;
  }
  target.scrollIntoView({ behavior: instant ? 'auto' : 'smooth', block: 'start' });
}

export function scrollToTop(lenis: Lenis | null): void {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
    return;
  }
  window.scrollTo({ top: 0, behavior: 'auto' });
}
