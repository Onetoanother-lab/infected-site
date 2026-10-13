import { bi, biInline, clear, el } from '../core/dom';
import { lookup } from '../content/strings';
import type { Stage, StageContext } from '../types';

/**
 * Threat 9 — ransomware. The lock is theatre: a panel over this one box, a
 * countdown, and the three sample lines redrawn as symbols. Nothing on the
 * visitor's device is read, renamed, encrypted or touched, and the real text is
 * kept in a local array so it can come back.
 */

const DOC_KEYS = ['doc1', 'doc2', 'doc3'] as const;
const SCRAMBLE = '▚▜▙▞▛▟▖▗▘▝';
const COUNTDOWN_FROM = 600;

const copy = (key: string) => lookup(`stages.ransomware.${key}`);

let hasBackup: boolean | null = null;

function clock(seconds: number): string {
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(Math.floor(seconds % 60)).padStart(2, '0');
  return `${mm}:${ss}`;
}

function scrambleText(text: string): string {
  return [...text]
    .map((ch) => (ch === ' ' ? ' ' : (SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)] ?? '▚')))
    .join('');
}

function lockLines(ctx: StageContext, locked: boolean): void {
  ctx.demo.querySelectorAll<HTMLElement>('.rans-line').forEach((line) => {
    const key = line.dataset.doc ?? 'doc1';
    const real = copy(key).uz;
    line.textContent = locked ? scrambleText(real) : real;
    line.dataset.locked = String(locked);
  });
}

function showOverlay(ctx: StageContext, show: boolean): void {
  const overlay = ctx.demo.querySelector<HTMLElement>('.rans-overlay');
  if (overlay) overlay.hidden = !show;
  ctx.demo.querySelector('.rans')?.classList.toggle('is-locked', show);
}

function showOutcome(ctx: StageContext): void {
  const outcome = ctx.demo.querySelector<HTMLElement>('.rans-outcome');
  if (!outcome) return;
  clear(outcome);
  outcome.append(bi(copy(hasBackup ? 'restoreFast' : 'restoreSlow')));
  outcome.dataset.tone = hasBackup ? 'fast' : 'slow';
  outcome.hidden = false;
}

function setBackup(ctx: StageContext, value: boolean): void {
  hasBackup = value;
  ctx.demo.querySelectorAll<HTMLElement>('.rans-choice').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.choice === (value ? 'yes' : 'no')));
  });
}

function paint(ctx: StageContext, state: 'infected' | 'secured' | 'pristine'): void {
  ctx.section.classList.toggle('is-infected', state === 'infected');
  ctx.section.classList.toggle('is-secured', state === 'secured');
  ctx.setState(state);
}

export const ransomware: Stage = {
  id: 'ransomware',
  order: 9,
  name: lookup('stages.ransomware.name'),

  build(ctx) {
    hasBackup = null;

    const choices = (['yes', 'no'] as const).map((choice) => {
      const button = el(
        'button.rans-choice',
        { type: 'button', 'data-choice': choice, 'aria-pressed': 'false' },
        biInline(copy(choice === 'yes' ? 'backupYes' : 'backupNo')),
      );
      button.addEventListener('click', () => setBackup(ctx, choice === 'yes'));
      return button;
    });

    const lines = DOC_KEYS.map((key) =>
      el('p.rans-line', { 'data-doc': key, 'data-locked': 'false', lang: 'uz' }, copy(key).uz),
    );

    const overlay = el(
      'div.rans-overlay',
      { hidden: true, role: 'group', 'aria-label': copy('noteTitle').uz },
      el('span.rans-lock', { 'aria-hidden': 'true' }, '▣'),
      bi(copy('noteTitle'), 'h4.rans-note-title'),
      bi(copy('noteBody'), 'p.rans-note-body'),
      el(
        'p.rans-timer-row',
        {},
        biInline(copy('timerLabel'), 'span.bi.bi-inline.rans-timer-label'),
        el('span.rans-timer', {}, clock(COUNTDOWN_FROM)),
      ),
      biInline(copy('dontPay'), 'span.bi.bi-inline.rans-dontpay'),
    );

    ctx.demo.append(
      el(
        'div.rans',
        {},
        el('div.rans-head', {}, bi(copy('demoTitle'), 'h3.rans-title'), bi(copy('demoHint'), 'p.rans-hint')),
        el(
          'div.rans-choice-row',
          {},
          bi(copy('backupQuestion'), 'p.rans-question'),
          el('div.rans-choices', {}, ...choices),
        ),
        el(
          'div.rans-doc',
          {},
          bi(copy('docTitle'), 'h4.rans-doc-title'),
          el('div.rans-lines', {}, ...lines),
          overlay,
        ),
        el('div.rans-outcome', { hidden: true }),
      ),
    );
  },

  /** Beat 1 — the display text scrambles and the fake note takes the box. */
  infect(ctx) {
    paint(ctx, 'infected');
    const timer = ctx.demo.querySelector<HTMLElement>('.rans-timer');
    const counter = { value: COUNTDOWN_FROM };

    ctx
      .timeline()
      .call(() => lockLines(ctx, true))
      .fromTo(ctx.demo.querySelectorAll('.rans-line'), { opacity: 0.2 }, { opacity: 1, duration: 0.3, stagger: 0.08 })
      .call(() => showOverlay(ctx, true))
      .fromTo(ctx.demo.querySelector('.rans-overlay'), { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.4 })
      .to(
        counter,
        {
          value: COUNTDOWN_FROM - 95,
          duration: 6,
          ease: 'none',
          onUpdate: () => {
            if (timer) timer.textContent = clock(counter.value);
          },
        },
        '<',
      );
  },

  /** Beat 3 — the backup answer decides how this ends; paying never does. */
  defend(ctx) {
    paint(ctx, 'secured');
    if (hasBackup === null) setBackup(ctx, true);

    ctx
      .timeline()
      .to(ctx.demo.querySelector('.rans-overlay'), { opacity: 0, duration: 0.4 })
      .call(() => {
        showOverlay(ctx, false);
        lockLines(ctx, false);
        showOutcome(ctx);
      })
      .fromTo(ctx.demo.querySelectorAll('.rans-line'), { opacity: 0.2, x: -8 }, { opacity: 1, x: 0, duration: 0.35, stagger: 0.08 })
      .fromTo(ctx.demo.querySelector('.rans-outcome'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2');
  },

  reset(ctx) {
    paint(ctx, 'pristine');
    clear(ctx.demo);
    this.build(ctx);
  },

  /** Calm fallback: the locked box and the note, still, with the timer stopped. */
  reducedMotion(ctx) {
    paint(ctx, 'infected');
    lockLines(ctx, true);
    showOverlay(ctx, true);
  },
};
