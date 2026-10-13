import { bi, biInline, clear, el } from '../core/dom';
import { lookup } from '../content/strings';
import type { Stage, StageContext } from '../types';

/**
 * Threat 6 — spyware, as a transparency demo. It reflects only what the visitor
 * just did inside this one box: hovering a tile, clicking a tile, pausing. The
 * log lives in a local array, is shown at once and is wiped on the defend beat
 * and on reset. No keystrokes, no camera, no microphone, no storage, nothing
 * sent anywhere.
 */

const PAUSE_MS = 1400;
const MAX_ENTRIES = 6;

const copy = (key: string) => lookup(`stages.spyware.${key}`);

let entries: string[] = [];
let pauseTimer: number | undefined;

function clock(): string {
  const now = new Date();
  return `${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
}

function render(ctx: StageContext): void {
  const list = ctx.demo.querySelector<HTMLElement>('.spy-log-list');
  const empty = ctx.demo.querySelector<HTMLElement>('.spy-log-empty');
  if (!list) return;
  clear(list);
  if (empty) empty.hidden = entries.length > 0;
  for (const entry of entries) {
    list.append(el('li.spy-entry', {}, entry));
  }
}

function note(ctx: StageContext, target: string, eventKey: string): void {
  entries = [`${clock()}  ·  ${target} — ${copy(eventKey).uz}`, ...entries].slice(0, MAX_ENTRIES);
  render(ctx);
}

function wipe(ctx: StageContext, announce: boolean): void {
  entries = [];
  render(ctx);
  const wiped = ctx.demo.querySelector<HTMLElement>('.spy-wiped');
  if (wiped) wiped.hidden = !announce;
}

function setPermissions(ctx: StageContext, on: boolean): void {
  ctx.demo.querySelectorAll<HTMLElement>('.spy-perm').forEach((perm) => {
    perm.dataset.on = String(on);
    const value = perm.querySelector<HTMLElement>('.spy-perm-value');
    if (!value) return;
    clear(value);
    value.append(biInline(copy(on ? 'permOn' : 'permOff')));
  });
}

function paint(ctx: StageContext, state: 'infected' | 'secured' | 'pristine'): void {
  ctx.section.classList.toggle('is-infected', state === 'infected');
  ctx.section.classList.toggle('is-secured', state === 'secured');
  ctx.setState(state);
}

export const spyware: Stage = {
  id: 'spyware',
  order: 6,
  name: lookup('stages.spyware.name'),

  build(ctx) {
    entries = [];

    const tiles = (['targetImage', 'targetButton', 'targetText'] as const).map((key) => {
      const label = copy(key).uz;
      const tile = el('button.spy-tile', { type: 'button', 'data-tile': key }, biInline(copy(key)));
      tile.addEventListener('pointerenter', () => note(ctx, label, 'eventHover'));
      tile.addEventListener('focus', () => note(ctx, label, 'eventHover'));
      tile.addEventListener('click', () => note(ctx, label, 'eventClick'));
      return tile;
    });

    const perms = (['permLocation', 'permContacts', 'permUsage'] as const).map((key) =>
      el(
        'li.spy-perm',
        { 'data-on': 'false' },
        biInline(copy(key), 'span.bi.bi-inline.spy-perm-name'),
        el('span.spy-perm-value', {}, biInline(copy('permOff'))),
      ),
    );

    const wipeBtn = el('button.spy-btn', { type: 'button' }, biInline(copy('wipe')));
    wipeBtn.addEventListener('click', () => wipe(ctx, true));

    const board: HTMLElement = el('div.spy-board', {}, ...tiles);

    // "You paused here" — measured only inside this box, never stored.
    board.addEventListener('pointermove', () => {
      window.clearTimeout(pauseTimer);
      pauseTimer = window.setTimeout(() => note(ctx, copy('demoTitle').uz, 'eventPause'), PAUSE_MS);
    });
    ctx.onReset(() => window.clearTimeout(pauseTimer));

    ctx.demo.append(
      el(
        'div.spy',
        {},
        el('div.spy-head', {}, bi(copy('demoTitle'), 'h3.spy-title'), bi(copy('demoHint'), 'p.spy-hint')),
        el(
          'div.spy-body',
          {},
          board,
          el(
            'div.spy-log',
            {},
            bi(copy('logTitle'), 'h4.spy-log-title'),
            bi(copy('logEmpty'), 'p.spy-log-empty'),
            el('ul.spy-log-list', { 'aria-live': 'polite' }),
          ),
        ),
        el('div.spy-perms', {}, bi(copy('permTitle'), 'h4.spy-perms-title'), el('ul.spy-perm-list', {}, ...perms)),
        el('div.spy-actions', {}, wipeBtn),
        bi(copy('wiped'), 'p.spy-wiped'),
      ),
    );

    const wiped = ctx.demo.querySelector<HTMLElement>('.spy-wiped');
    if (wiped) wiped.hidden = true;
    render(ctx);
  },

  /** Beat 1 — the watch window opens and the permissions flip on by themselves. */
  infect(ctx) {
    paint(ctx, 'infected');
    setPermissions(ctx, true);
    ctx
      .timeline()
      .fromTo(ctx.demo.querySelector('.spy-log'), { opacity: 0, x: 14 }, { opacity: 1, x: 0, duration: 0.45 })
      .fromTo(ctx.demo.querySelectorAll('.spy-perm'), { x: 10, opacity: 0.3 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.08 }, '-=0.2');
  },

  /** Beat 3 — take the permissions back and wipe what was collected. */
  defend(ctx) {
    paint(ctx, 'secured');
    setPermissions(ctx, false);
    const shown = ctx.demo.querySelectorAll('.spy-entry');
    const tl = ctx.timeline();
    if (shown.length) tl.to(shown, { opacity: 0, x: -10, duration: 0.25, stagger: 0.05 });
    tl.call(() => wipe(ctx, true)).fromTo(
      ctx.demo.querySelector('.spy-wiped'),
      { opacity: 0 },
      { opacity: 1, duration: 0.35 },
    );
  },

  reset(ctx) {
    paint(ctx, 'pristine');
    window.clearTimeout(pauseTimer);
    clear(ctx.demo);
    this.build(ctx);
  },

  /** Calm fallback: the window open and the permissions already taken. */
  reducedMotion(ctx) {
    paint(ctx, 'infected');
    setPermissions(ctx, true);
  },
};
