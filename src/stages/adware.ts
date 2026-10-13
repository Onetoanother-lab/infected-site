import Matter from 'matter-js';
import { bi, biInline, clear, el } from '../core/dom';
import { lookup } from '../content/strings';
import { gsap } from '../core/scroll';
import type { Stage, StageContext } from '../types';

/**
 * Threat 8 — adware. Invented ad windows drop into a box and pile up with
 * Matter.js physics. Their "close" button is the lie: pressing it brings two
 * more. The cleanup sweeps the lot. The physics world is torn down on reset.
 */

const AD_KEYS = ['ad1', 'ad2', 'ad3', 'ad4'] as const;
const MAX_POPUPS = 14;
const POPUP_W = 180;
const POPUP_H = 64;

const copy = (key: string) => lookup(`stages.adware.${key}`);

interface Pop {
  body: Matter.Body;
  node: HTMLElement;
}

let engine: Matter.Engine | null = null;
let pops: Pop[] = [];
let ticker: (() => void) | null = null;
let spawned = 0;
/** After the cleanup, nothing may drop in again until the stage is replayed. */
let accepting = true;

function updateCount(ctx: StageContext): void {
  const count = ctx.demo.querySelector<HTMLElement>('.adw-count-value');
  if (count) count.textContent = String(pops.length);
}

function addPopup(ctx: StageContext, index: number): void {
  const field = ctx.demo.querySelector<HTMLElement>('.adw-field');
  if (!field || !engine || !accepting || pops.length >= MAX_POPUPS) return;

  const width = field.clientWidth || 600;
  const key = AD_KEYS[index % AD_KEYS.length] ?? 'ad1';
  const x = 60 + Math.random() * Math.max(width - 120, 60);

  const close = el('button.adw-close', { type: 'button', 'aria-label': copy('closeHint').uz }, '✕');
  const node = el(
    'div.adw-popup',
    {},
    biInline(copy(key), 'span.bi.bi-inline.adw-popup-text'),
    close,
  );
  // The fake close: it never closes anything, it brings two more.
  close.addEventListener('click', () => {
    spawned += 1;
    addPopup(ctx, spawned);
    addPopup(ctx, spawned + 1);
  });

  const body = Matter.Bodies.rectangle(x, -POPUP_H, POPUP_W, POPUP_H, {
    restitution: 0.35,
    friction: 0.4,
    angle: (Math.random() - 0.5) * 0.4,
  });

  Matter.Composite.add(engine.world, body);
  field.append(node);
  pops.push({ body, node });
  updateCount(ctx);
}

function sweep(ctx: StageContext): void {
  if (!engine) return;
  accepting = false;
  for (const pop of pops) {
    Matter.Composite.remove(engine.world, pop.body);
    pop.node.remove();
  }
  pops = [];
  updateCount(ctx);
  const cleaned = ctx.demo.querySelector<HTMLElement>('.adw-cleaned');
  if (cleaned) cleaned.hidden = false;
}

function startWorld(ctx: StageContext): void {
  const field = ctx.demo.querySelector<HTMLElement>('.adw-field');
  if (!field) return;

  engine = Matter.Engine.create();
  engine.gravity.y = 1;

  const width = field.clientWidth || 600;
  const height = field.clientHeight || 300;
  const wall = { isStatic: true, restitution: 0.2 };
  Matter.Composite.add(engine.world, [
    Matter.Bodies.rectangle(width / 2, height + 20, width + 400, 40, wall),
    Matter.Bodies.rectangle(-20, height / 2, 40, height * 2, wall),
    Matter.Bodies.rectangle(width + 20, height / 2, 40, height * 2, wall),
  ]);

  ticker = () => {
    if (!engine) return;
    Matter.Engine.update(engine, 1000 / 60);
    for (const pop of pops) {
      const { x, y } = pop.body.position;
      pop.node.style.transform = `translate(${x - POPUP_W / 2}px, ${y - POPUP_H / 2}px) rotate(${pop.body.angle}rad)`;
    }
  };
  gsap.ticker.add(ticker);

  ctx.onReset(() => {
    if (ticker) gsap.ticker.remove(ticker);
    ticker = null;
    if (engine) {
      Matter.Composite.clear(engine.world, false);
      Matter.Engine.clear(engine);
    }
    engine = null;
    pops = [];
  });
}

function paint(ctx: StageContext, state: 'infected' | 'secured' | 'pristine'): void {
  ctx.section.classList.toggle('is-infected', state === 'infected');
  ctx.section.classList.toggle('is-secured', state === 'secured');
  ctx.setState(state);
}

export const adware: Stage = {
  id: 'adware',
  order: 8,
  name: lookup('stages.adware.name'),

  build(ctx) {
    pops = [];
    spawned = 0;
    accepting = true;

    const cleanup = el('button.adw-btn', { type: 'button' }, biInline(copy('cleanup')));
    cleanup.addEventListener('click', () => sweep(ctx));

    ctx.demo.append(
      el(
        'div.adw',
        {},
        el('div.adw-head', {}, bi(copy('demoTitle'), 'h3.adw-title'), bi(copy('demoHint'), 'p.adw-hint')),
        el('div.adw-field', {}),
        el(
          'div.adw-actions',
          {},
          el('span.adw-count', {}, biInline(copy('countLabel'), 'span.bi.bi-inline.adw-count-label'), el('span.adw-count-value', {}, '0')),
          cleanup,
        ),
        bi(copy('closeHint'), 'p.adw-close-hint'),
        bi(copy('cleaned'), 'p.adw-cleaned'),
      ),
    );

    const cleaned = ctx.demo.querySelector<HTMLElement>('.adw-cleaned');
    if (cleaned) cleaned.hidden = true;
    startWorld(ctx);
  },

  /** Beat 1 — the windows start dropping, one after another. */
  infect(ctx) {
    paint(ctx, 'infected');
    accepting = true;
    const tl = ctx.timeline();
    for (let i = 0; i < 7; i += 1) {
      tl.call(
        () => {
          spawned += 1;
          addPopup(ctx, spawned);
        },
        undefined,
        i * 0.25,
      );
    }
  },

  /** Beat 3 — blocker on, unknown extension gone, the pile swept away. */
  defend(ctx) {
    paint(ctx, 'secured');
    const shown = ctx.demo.querySelectorAll('.adw-popup');
    const tl = ctx.timeline();
    if (shown.length) tl.to(shown, { opacity: 0, scale: 0.9, duration: 0.3, stagger: 0.04 });
    tl.call(() => sweep(ctx)).fromTo(
      ctx.demo.querySelector('.adw-cleaned'),
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4 },
    );
  },

  reset(ctx) {
    paint(ctx, 'pristine');
    if (ticker) gsap.ticker.remove(ticker);
    ticker = null;
    if (engine) {
      Matter.Composite.clear(engine.world, false);
      Matter.Engine.clear(engine);
    }
    engine = null;
    pops = [];
    clear(ctx.demo);
    this.build(ctx);
  },

  /** Calm fallback: a tidy stack of windows, no falling and no bouncing. */
  reducedMotion(ctx) {
    paint(ctx, 'infected');
    const field = ctx.demo.querySelector<HTMLElement>('.adw-field');
    if (!field) return;
    field.classList.add('is-static');
    AD_KEYS.forEach((key, index) => {
      field.append(
        el(
          'div.adw-popup.is-static',
          { style: `transform: translate(${12 + index * 18}px, ${12 + index * 56}px)` },
          biInline(copy(key), 'span.bi.bi-inline.adw-popup-text'),
          el('span.adw-close', { 'aria-hidden': 'true' }, '✕'),
        ),
      );
    });
    const count = ctx.demo.querySelector<HTMLElement>('.adw-count-value');
    if (count) count.textContent = String(AD_KEYS.length);
  },
};
