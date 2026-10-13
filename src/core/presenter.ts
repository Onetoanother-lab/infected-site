import { bi, el } from './dom';
import { lookup } from '../content/strings';
import type { Engine } from './engine';

export interface Presenter {
  element: HTMLElement;
  toggleHelp(force?: boolean): void;
}

/**
 * Live-talk controls: 1–9 jump to a threat, R resets the page, ? shows the
 * list. Keys are ignored while the visitor is typing in a field, so the page
 * stays usable without the shortcuts.
 */
export function initPresenter(
  engine: Engine,
  jumpTo: (order: number) => void,
  onReset: () => void,
): Presenter {
  const ui = (key: string) => lookup(`ui.${key}`);

  const overlay = el(
    'div.presenter',
    { role: 'dialog', 'aria-modal': 'false', 'aria-label': ui('presenterTitle').en, hidden: true },
    el(
      'div.presenter-card',
      {},
      bi(ui('presenterTitle'), 'h2.presenter-title'),
      el(
        'ul.presenter-keys',
        {},
        el('li', {}, bi(ui('presenterJump'), 'span.bi')),
        el('li', {}, bi(ui('presenterReset'), 'span.bi')),
        el('li', {}, bi(ui('presenterHelp'), 'span.bi')),
        el('li', {}, bi(ui('presenterClose'), 'span.bi')),
      ),
    ),
  );

  const toast = el('div.toast', { role: 'status', 'aria-live': 'polite' });
  overlay.append(toast);

  const toggleHelp = (force?: boolean) => {
    const show = force ?? overlay.hidden;
    overlay.hidden = !show;
  };

  const flash = (text: string) => {
    toast.textContent = text;
    toast.dataset.visible = 'true';
    window.setTimeout(() => {
      toast.dataset.visible = 'false';
    }, 1600);
  };

  const typing = (target: EventTarget | null) => {
    const node = target as HTMLElement | null;
    if (!node) return false;
    return node.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(node.tagName);
  };

  window.addEventListener('keydown', (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey || typing(event.target)) return;

    if (event.key >= '1' && event.key <= '9') {
      const order = Number(event.key);
      if (engine.sectionFor(order)) {
        event.preventDefault();
        jumpTo(order);
      }
      return;
    }
    if (event.key === 'r' || event.key === 'R') {
      event.preventDefault();
      onReset();
      flash(`${ui('resetDone').uz} / ${ui('resetDone').en}`);
      return;
    }
    if (event.key === '?' || (event.key === '/' && event.shiftKey)) {
      event.preventDefault();
      toggleHelp();
      return;
    }
    if (event.key === 'Escape') toggleHelp(false);
  });

  return { element: overlay, toggleHelp };
}
