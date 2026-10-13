import type { Localized } from '../types';

type Attrs = Record<string, string | number | boolean | undefined>;

/** Small element helper: el('div.card', { role: 'group' }, child, 'text'). */
export function el<K extends keyof HTMLElementTagNameMap>(
  spec: string,
  attrs: Attrs = {},
  ...children: (Node | string | null | undefined)[]
): HTMLElementTagNameMap[K] {
  const [tagPart, ...classes] = spec.split('.');
  const tag = (tagPart || 'div') as K;
  const node = document.createElement(tag);
  if (classes.length) node.className = classes.join(' ');
  for (const [key, value] of Object.entries(attrs)) {
    if (value === undefined || value === false) continue;
    node.setAttribute(key, value === true ? '' : String(value));
  }
  for (const child of children) {
    if (child === null || child === undefined) continue;
    node.append(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}

/**
 * The site shows Uzbek only. Every string still carries its English twin in
 * strings.ts, so turning this to true brings the second language back
 * everywhere at once.
 */
const SHOW_ENGLISH = false;

/** Text block. Uzbek leads; English renders under it only when switched on. */
export function bi(text: Localized, spec = 'div.bi'): HTMLElement {
  return el(
    spec,
    {},
    el('span.bi-uz', { lang: 'uz' }, text.uz),
    SHOW_ENGLISH ? el('span.bi-en', { lang: 'en' }, text.en) : null,
  );
}

/** Bilingual inline label, for buttons and chips. */
export function biInline(text: Localized, spec = 'span.bi.bi-inline'): HTMLElement {
  return bi(text, spec);
}

export function clear(node: HTMLElement): void {
  while (node.firstChild) node.firstChild.remove();
}

/** True when the visitor's system asks for reduced motion. */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
