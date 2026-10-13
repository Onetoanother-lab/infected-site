import { bi, biInline, clear, el } from '../core/dom';
import { lookup } from '../content/strings';
import type { Stage, StageContext } from '../types';

/**
 * Threat 5 — worm. A drawn grid of machines. The worm starts in one corner and
 * walks to its neighbours on its own; patched machines refuse it and the spread
 * breaks apart. Pure animation over an array — nothing scans or touches a real
 * network.
 */

const COLS = 9;
const ROWS = 5;
const COUNT = COLS * ROWS;
const PATCH_LEVELS = [0, 40, 80] as const;

const copy = (key: string) => lookup(`stages.worm.${key}`);

let patchPercent = 0;
let patched: boolean[] = [];

function dots(ctx: StageContext): HTMLElement[] {
  return [...ctx.demo.querySelectorAll<HTMLElement>('.worm-node')];
}

/** Spread the patched machines evenly, so the picture reads at a glance. */
function applyPatchLevel(ctx: StageContext, percent: number): void {
  patchPercent = percent;
  const target = Math.round((percent / 100) * COUNT);
  const step = target === 0 ? 0 : COUNT / target;
  patched = new Array<boolean>(COUNT).fill(false);
  for (let i = 0; i < target; i += 1) patched[Math.floor(i * step)] = true;

  dots(ctx).forEach((dot, index) => {
    dot.dataset.patched = String(patched[index] === true);
    dot.dataset.hit = 'false';
  });
  ctx.demo.querySelectorAll<HTMLElement>('.worm-level').forEach((button) => {
    button.setAttribute('aria-pressed', String(Number(button.dataset.level) === percent));
  });
  updateCounts(ctx, 0);
  const result = ctx.demo.querySelector<HTMLElement>('.worm-result');
  if (result) result.hidden = true;
}

function updateCounts(ctx: StageContext, infected: number): void {
  const infectedEl = ctx.demo.querySelector<HTMLElement>('.worm-count-infected');
  const heldEl = ctx.demo.querySelector<HTMLElement>('.worm-count-held');
  if (infectedEl) infectedEl.textContent = `${infected} / ${COUNT}`;
  if (heldEl) heldEl.textContent = `${patched.filter(Boolean).length} / ${COUNT}`;
}

/** Walk the worm outward from the top-left machine, one ring at a time. */
function spread(ctx: StageContext): void {
  const nodes = dots(ctx);
  nodes.forEach((dot) => (dot.dataset.hit = 'false'));

  const hit = new Array<boolean>(COUNT).fill(false);
  const waves: number[][] = [];
  let frontier = patched[0] === true ? [] : [0];
  if (frontier.length) hit[0] = true;

  while (frontier.length) {
    waves.push(frontier);
    const next: number[] = [];
    for (const index of frontier) {
      const row = Math.floor(index / COLS);
      const col = index % COLS;
      const neighbours = [
        row > 0 ? index - COLS : -1,
        row < ROWS - 1 ? index + COLS : -1,
        col > 0 ? index - 1 : -1,
        col < COLS - 1 ? index + 1 : -1,
      ];
      for (const n of neighbours) {
        if (n < 0 || hit[n] || patched[n] === true) continue;
        hit[n] = true;
        next.push(n);
      }
    }
    frontier = next;
  }

  const tl = ctx.timeline();
  let total = 0;
  waves.forEach((wave, waveIndex) => {
    total += wave.length;
    const reached = total;
    tl.call(
      () => {
        for (const index of wave) {
          const dot = nodes[index];
          if (dot) dot.dataset.hit = 'true';
        }
        updateCounts(ctx, reached);
      },
      undefined,
      waveIndex * 0.16,
    );
  });

  tl.call(
    () => {
      const result = ctx.demo.querySelector<HTMLElement>('.worm-result');
      if (!result) return;
      clear(result);
      result.append(bi(copy(patchPercent >= 80 ? 'resultHeld' : 'resultOpen')));
      result.dataset.tone = patchPercent >= 80 ? 'held' : 'open';
      result.hidden = false;
    },
    undefined,
    waves.length * 0.16 + 0.2,
  );
}

function paint(ctx: StageContext, state: 'infected' | 'secured' | 'pristine'): void {
  ctx.section.classList.toggle('is-infected', state === 'infected');
  ctx.section.classList.toggle('is-secured', state === 'secured');
  ctx.setState(state);
}

export const worm: Stage = {
  id: 'worm',
  order: 5,
  name: lookup('stages.worm.name'),

  build(ctx) {
    patchPercent = 0;
    patched = new Array<boolean>(COUNT).fill(false);

    const grid = el(
      'div.worm-grid',
      { 'aria-hidden': 'true' },
      ...Array.from({ length: COUNT }, () => el('span.worm-node', { 'data-patched': 'false', 'data-hit': 'false' })),
    );

    const levels = PATCH_LEVELS.map((level) => {
      const button = el(
        'button.worm-level',
        { type: 'button', 'data-level': String(level), 'aria-pressed': String(level === 0) },
        `${level}%`,
      );
      button.addEventListener('click', () => applyPatchLevel(ctx, level));
      return button;
    });

    const release = el('button.worm-btn', { type: 'button' }, biInline(copy('release')));
    release.addEventListener('click', () => spread(ctx));

    ctx.demo.append(
      el(
        'div.worm',
        {},
        el('div.worm-head', {}, bi(copy('demoTitle'), 'h3.worm-title'), bi(copy('demoHint'), 'p.worm-hint')),
        grid,
        el(
          'div.worm-stats',
          {},
          el('span.worm-stat', {}, biInline(copy('infectedLabel'), 'span.bi.bi-inline.worm-stat-label'), el('span.worm-count-infected', {}, `0 / ${COUNT}`)),
          el('span.worm-stat', {}, biInline(copy('heldLabel'), 'span.bi.bi-inline.worm-stat-label'), el('span.worm-count-held', {}, `0 / ${COUNT}`)),
        ),
        el(
          'div.worm-actions',
          {},
          el('div.worm-levels', {}, biInline(copy('patchLabel'), 'span.bi.bi-inline.worm-levels-label'), ...levels),
          release,
        ),
        el('div.worm-result', { hidden: true }),
      ),
    );
  },

  /** Beat 1 — nothing is patched, so one machine is enough. */
  infect(ctx) {
    paint(ctx, 'infected');
    applyPatchLevel(ctx, 0);
    ctx
      .timeline()
      .fromTo(ctx.demo.querySelectorAll('.worm-node'), { scale: 0.6, opacity: 0.2 }, { scale: 1, opacity: 1, duration: 0.3, stagger: 0.004 })
      .call(() => spread(ctx));
  },

  /** Beat 3 — patch most of them and the same worm runs out of room. */
  defend(ctx) {
    paint(ctx, 'secured');
    applyPatchLevel(ctx, 80);
    ctx
      .timeline()
      .fromTo(
        ctx.demo.querySelectorAll('.worm-node[data-patched="true"]'),
        { scale: 0.8 },
        { scale: 1, duration: 0.3, stagger: 0.01, ease: 'back.out(2)' },
      )
      .call(() => spread(ctx));
  },

  reset(ctx) {
    paint(ctx, 'pristine');
    clear(ctx.demo);
    this.build(ctx);
  },

  /** Calm fallback: the unpatched network, already overrun. */
  reducedMotion(ctx) {
    paint(ctx, 'infected');
    applyPatchLevel(ctx, 0);
    dots(ctx).forEach((dot) => (dot.dataset.hit = 'true'));
    updateCounts(ctx, COUNT);
    const result = ctx.demo.querySelector<HTMLElement>('.worm-result');
    if (result) {
      clear(result);
      result.append(bi(copy('resultOpen')));
      result.dataset.tone = 'open';
      result.hidden = false;
    }
  },
};
