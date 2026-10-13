import { bi, biInline, clear, el } from '../core/dom';
import { lookup } from '../content/strings';
import type { Stage, StageContext } from '../types';

/**
 * Threat 7 — rootkit. A drawn task manager whose listed processes add up to far
 * less than the total load. The scan from inside keeps saying "clean"; the scan
 * from outside shows the row the inside view hides. All numbers are invented.
 */

const PROCESSES: [string, number][] = [
  ['proc1', 14],
  ['proc2', 11],
  ['proc3', 6],
  ['proc4', 5],
];
const HIDDEN_LOAD = 55;
const TOTAL_LOAD = PROCESSES.reduce((sum, [, load]) => sum + load, 0) + HIDDEN_LOAD;

const copy = (key: string) => lookup(`stages.rootkit.${key}`);

function listedSum(ctx: StageContext): number {
  const rows = [...ctx.demo.querySelectorAll<HTMLElement>('.root-row:not([hidden])')];
  return rows.reduce((sum, row) => sum + Number(row.dataset.load ?? 0), 0);
}

function refreshSums(ctx: StageContext): void {
  const sum = ctx.demo.querySelector<HTMLElement>('.root-sum-value');
  if (sum) sum.textContent = `${listedSum(ctx)}%`;
  const gap = ctx.demo.querySelector('.root-figures');
  gap?.classList.toggle('is-mismatch', listedSum(ctx) !== TOTAL_LOAD);
}

function say(ctx: StageContext, key: string, tone: 'inside' | 'outside' | 'clean'): void {
  const out = ctx.demo.querySelector<HTMLElement>('.root-result');
  if (!out) return;
  clear(out);
  out.append(bi(copy(key)));
  out.dataset.tone = tone;
  out.hidden = false;
}

function revealHidden(ctx: StageContext, show: boolean): void {
  const row = ctx.demo.querySelector<HTMLElement>('.root-row-hidden');
  if (row) row.hidden = !show;
  refreshSums(ctx);
}

function paint(ctx: StageContext, state: 'infected' | 'secured' | 'pristine'): void {
  ctx.section.classList.toggle('is-infected', state === 'infected');
  ctx.section.classList.toggle('is-secured', state === 'secured');
  ctx.setState(state);
}

export const rootkit: Stage = {
  id: 'rootkit',
  order: 7,
  name: lookup('stages.rootkit.name'),

  build(ctx) {
    const rows = PROCESSES.map(([key, load]) =>
      el(
        'li.root-row',
        { 'data-load': String(load) },
        bi(copy(key), 'span.bi.root-row-name'),
        el('span.root-row-load', {}, `${load}%`),
      ),
    );

    const hiddenRow = el(
      'li.root-row.root-row-hidden',
      { 'data-load': String(HIDDEN_LOAD), hidden: true },
      bi(copy('procHidden'), 'span.bi.root-row-name'),
      el('span.root-row-load', {}, `${HIDDEN_LOAD}%`),
    );

    const inside = el('button.root-btn', { type: 'button' }, biInline(copy('scanInside')));
    const outside = el('button.root-btn.root-btn-outside', { type: 'button' }, biInline(copy('scanOutside')));
    inside.addEventListener('click', () => say(ctx, 'insideResult', 'inside'));
    outside.addEventListener('click', () => {
      revealHidden(ctx, true);
      say(ctx, 'outsideResult', 'outside');
    });

    ctx.demo.append(
      el(
        'div.root',
        {},
        el('div.root-head', {}, bi(copy('demoTitle'), 'h3.root-title'), bi(copy('demoHint'), 'p.root-hint')),
        el(
          'div.root-panel',
          {},
          bi(copy('listLabel'), 'h4.root-panel-title'),
          el('ul.root-list', {}, ...rows, hiddenRow),
          el(
            'div.root-figures',
            {},
            el(
              'div.root-figure',
              {},
              biInline(copy('sumLabel'), 'span.bi.bi-inline.root-figure-label'),
              el('span.root-sum-value', {}, `${PROCESSES.reduce((s, [, l]) => s + l, 0)}%`),
            ),
            el(
              'div.root-figure',
              {},
              biInline(copy('totalLabel'), 'span.bi.bi-inline.root-figure-label'),
              el('span.root-total-value', {}, `${TOTAL_LOAD}%`),
            ),
          ),
        ),
        el('div.root-actions', {}, inside, outside),
        el('div.root-result', { hidden: true }),
      ),
    );

    refreshSums(ctx);
  },

  /** Beat 1 — the load climbs while the list stays innocent. */
  infect(ctx) {
    paint(ctx, 'infected');
    const total = ctx.demo.querySelector<HTMLElement>('.root-total-value');
    const counter = { value: 0 };

    ctx
      .timeline()
      .fromTo(ctx.demo.querySelectorAll('.root-row'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.07 })
      .to(
        counter,
        {
          value: TOTAL_LOAD,
          duration: 1.1,
          ease: 'power1.in',
          onUpdate: () => {
            if (total) total.textContent = `${Math.round(counter.value)}%`;
          },
        },
        0.2,
      )
      .call(() => say(ctx, 'insideResult', 'inside'))
      .fromTo(ctx.demo.querySelector('.root-figures'), { x: -4 }, { x: 4, duration: 0.08, repeat: 5, yoyo: true });
  },

  /** Beat 3 — look from outside, then rebuild from a clean image. */
  defend(ctx) {
    paint(ctx, 'secured');
    const total = ctx.demo.querySelector<HTMLElement>('.root-total-value');

    ctx
      .timeline()
      .call(() => {
        revealHidden(ctx, true);
        say(ctx, 'outsideResult', 'outside');
      })
      .fromTo(ctx.demo.querySelector('.root-row-hidden'), { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.4 })
      .to(ctx.demo.querySelector('.root-row-hidden'), { opacity: 0, height: 0, duration: 0.4, delay: 0.5 })
      .call(() => {
        revealHidden(ctx, false);
        const sumOnly = PROCESSES.reduce((s, [, l]) => s + l, 0);
        if (total) total.textContent = `${sumOnly}%`;
        const figures = ctx.demo.querySelector('.root-figures');
        figures?.classList.remove('is-mismatch');
        say(ctx, 'cleanedResult', 'clean');
      });
  },

  reset(ctx) {
    paint(ctx, 'pristine');
    clear(ctx.demo);
    this.build(ctx);
  },

  /** Calm fallback: the mismatch on screen with the inside scan's denial. */
  reducedMotion(ctx) {
    paint(ctx, 'infected');
    const total = ctx.demo.querySelector<HTMLElement>('.root-total-value');
    if (total) total.textContent = `${TOTAL_LOAD}%`;
    say(ctx, 'insideResult', 'inside');
    refreshSums(ctx);
  },
};
