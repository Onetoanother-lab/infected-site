import { bi, biInline, clear, el } from '../core/dom';
import { lookup } from '../content/strings';
import type { Stage, StageContext } from '../types';

/**
 * Threat 4 — trojan. Three invented apps sit on a shelf; a lens shows what is
 * inside each one. Only the "free premium" app from an unknown link carries
 * something extra. Nothing is downloaded, installed or executed: the apps are
 * drawn, the installer bar is an animation.
 */

interface App {
  key: 'app1' | 'app2' | 'app3';
  glyph: string;
  official: boolean;
  carries: boolean;
}

const APPS: App[] = [
  { key: 'app1', glyph: '▶', official: false, carries: true },
  { key: 'app2', glyph: '✎', official: true, carries: false },
  { key: 'app3', glyph: '◆', official: true, carries: false },
];

const copy = (key: string) => lookup(`stages.trojan.${key}`);

function setXray(ctx: StageContext, on: boolean): void {
  const shelf = ctx.demo.querySelector('.troj-shelf');
  shelf?.classList.toggle('is-xray', on);
}

function buildApp(app: App): HTMLElement {
  return el(
    'article.troj-app',
    { 'data-app': app.key, 'data-carries': String(app.carries) },
    el('span.troj-icon', { 'aria-hidden': 'true' }, app.glyph),
    bi(copy(app.key), 'h4.troj-name'),
    el(
      'dl.troj-meta',
      {},
      el('dt', {}, biInline(copy('sourceLabel'))),
      el('dd', {}, biInline(copy(app.official ? 'storeOfficial' : 'storeUnknown'))),
      el('dt', {}, biInline(copy('insideLabel'))),
      el('dd.troj-inside', {}, biInline(copy(app.carries ? 'hidden' : 'clean'))),
    ),
    el('span.troj-status', {}, biInline(copy('installing'))),
  );
}

function paint(ctx: StageContext, state: 'infected' | 'secured' | 'pristine'): void {
  ctx.section.classList.toggle('is-infected', state === 'infected');
  ctx.section.classList.toggle('is-secured', state === 'secured');
  ctx.setState(state);
}

export const trojan: Stage = {
  id: 'trojan',
  order: 4,
  name: lookup('stages.trojan.name'),

  build(ctx) {
    const xray = el('button.troj-btn', { type: 'button', 'aria-pressed': 'false' }, biInline(copy('xray')));
    xray.addEventListener('click', () => {
      const on = xray.getAttribute('aria-pressed') !== 'true';
      xray.setAttribute('aria-pressed', String(on));
      setXray(ctx, on);
    });

    const shelf: HTMLElement = el('div.troj-shelf', {}, ...APPS.map(buildApp));

    // The lens follows the pointer for anyone using a mouse; the button above
    // does the same job for keyboard and touch.
    const lens = el('span.troj-lens', { 'aria-hidden': 'true' });
    shelf.addEventListener('pointermove', (event: PointerEvent) => {
      const box = shelf.getBoundingClientRect();
      lens.style.transform = `translate(${event.clientX - box.left}px, ${event.clientY - box.top}px)`;
      shelf.classList.add('is-lens');
    });
    shelf.addEventListener('pointerleave', () => shelf.classList.remove('is-lens'));
    shelf.append(lens);

    ctx.demo.append(
      el(
        'div.troj',
        {},
        el('div.troj-head', {}, bi(copy('demoTitle'), 'h3.troj-title'), bi(copy('demoHint'), 'p.troj-hint')),
        el('div.troj-bar', { 'aria-hidden': 'true' }, el('span.troj-bar-fill')),
        shelf,
        el('div.troj-actions', {}, xray),
        bi(copy('defendNote'), 'p.troj-note'),
      ),
    );

    const note = ctx.demo.querySelector<HTMLElement>('.troj-note');
    if (note) note.hidden = true;
  },

  /** Beat 1 — the free app installs and something slips out behind it. */
  infect(ctx) {
    paint(ctx, 'infected');
    const q = <T extends Element>(sel: string) => ctx.demo.querySelector<T>(sel);
    const bad = q<HTMLElement>('.troj-app[data-carries="true"]');

    ctx
      .timeline()
      .fromTo(q('.troj-bar-fill'), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power1.inOut' })
      .call(() => {
        ctx.demo.querySelectorAll<HTMLElement>('.troj-status').forEach((status) => {
          clear(status);
          status.append(biInline(copy('installed')));
        });
      })
      .fromTo(ctx.demo.querySelectorAll('.troj-app'), { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 })
      .call(() => bad?.classList.add('is-carrying'))
      .fromTo(bad, { x: 0 }, { x: -4, duration: 0.08, repeat: 5, yoyo: true });
  },

  /** Beat 3 — keep what came from the official store, drop the rest. */
  defend(ctx) {
    paint(ctx, 'secured');
    const bad = ctx.demo.querySelector<HTMLElement>('.troj-app[data-carries="true"]');
    const note = ctx.demo.querySelector<HTMLElement>('.troj-note');

    setXray(ctx, true);
    ctx
      .timeline()
      .to(bad, { opacity: 0.2, scale: 0.96, duration: 0.5, ease: 'power2.inOut' })
      .call(() => {
        bad?.classList.remove('is-carrying');
        bad?.classList.add('is-removed');
        const status = bad?.querySelector<HTMLElement>('.troj-status');
        if (status) {
          clear(status);
          status.append(biInline(copy('removed')));
        }
        if (note) note.hidden = false;
      })
      .fromTo(note, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 });
  },

  reset(ctx) {
    paint(ctx, 'pristine');
    clear(ctx.demo);
    this.build(ctx);
  },

  /** Calm fallback: apps installed, the lens already on, the extra one marked. */
  reducedMotion(ctx) {
    paint(ctx, 'infected');
    ctx.demo.querySelectorAll<HTMLElement>('.troj-status').forEach((status) => {
      clear(status);
      status.append(biInline(copy('installed')));
    });
    ctx.demo.querySelector('.troj-app[data-carries="true"]')?.classList.add('is-carrying');
    const fill = ctx.demo.querySelector<HTMLElement>('.troj-bar-fill');
    if (fill) fill.style.transform = 'scaleX(1)';
    setXray(ctx, true);
    const xray = ctx.demo.querySelector('.troj-btn');
    xray?.setAttribute('aria-pressed', 'true');
  },
};
