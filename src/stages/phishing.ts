import { bi, biInline, clear, el } from '../core/dom';
import { lookup } from '../content/strings';
import type { Stage, StageContext } from '../types';

/**
 * Threat 1 — phishing. Everything here is theatre: the messages are invented,
 * the "brands" are fictional (Namuna Bank, Qalqon Pay), there is no text input
 * and nothing leaves the page. The visitor only presses buttons; the verdict is
 * compared in a local variable and shown on screen.
 */

interface Card {
  key: 'msg1' | 'msg2' | 'msg3';
  scam: boolean;
  urgent: boolean;
}

const CARDS: Card[] = [
  { key: 'msg1', scam: true, urgent: true },
  { key: 'msg2', scam: false, urgent: false },
  { key: 'msg3', scam: true, urgent: false },
];

const copy = (key: string) => lookup(`stages.phishing.${key}`);

let answered = 0;
let correct = 0;
let scoreValue: HTMLElement | null = null;

function updateScore(): void {
  if (scoreValue) scoreValue.textContent = `${correct} / ${answered}`;
}

function answer(card: Card, cardEl: HTMLElement, said: 'real' | 'scam'): void {
  if (cardEl.dataset.answered === 'true') return;
  const right = (said === 'scam') === card.scam;
  cardEl.dataset.answered = 'true';
  cardEl.classList.add(right ? 'is-right' : 'is-wrong');
  cardEl.querySelectorAll<HTMLButtonElement>('button').forEach((b) => (b.disabled = true));

  const verdict = cardEl.querySelector<HTMLElement>('.phish-verdict');
  if (verdict) {
    verdict.append(biInline(right ? copy('demoRight') : copy('demoWrong'), 'span.bi.bi-inline.verdict-mark'));
  }
  const why = cardEl.querySelector<HTMLElement>('.phish-why');
  if (why) why.hidden = false;

  answered += 1;
  if (right) correct += 1;
  updateScore();
}

function buildCard(card: Card): HTMLElement {
  const from = copy(`${card.key}From`);
  const initial = from.en.trim().charAt(0).toUpperCase();

  const realBtn = el('button.phish-btn', { type: 'button' }, biInline(copy('demoReal')));
  const scamBtn = el('button.phish-btn.phish-btn-scam', { type: 'button' }, biInline(copy('demoScam')));

  const cardEl = el(
    'article.phish-msg',
    { 'data-answered': 'false', 'data-urgent': String(card.urgent) },
    el(
      'header.phish-msg-head',
      {},
      el('span.phish-avatar', { 'aria-hidden': 'true' }, initial),
      bi(from, 'span.bi.bi-from'),
    ),
    bi(copy(`${card.key}Body`), 'p.phish-body'),
    card.urgent ? el('div.phish-urgency', { 'aria-hidden': 'true' }, el('span.phish-urgency-fill')) : null,
    el('div.phish-actions', {}, realBtn, scamBtn, el('span.phish-verdict', { 'aria-live': 'polite' })),
    bi(copy(`${card.key}Why`), 'p.phish-why'),
  );

  const why = cardEl.querySelector<HTMLElement>('.phish-why');
  if (why) why.hidden = true;

  realBtn.addEventListener('click', () => answer(card, cardEl, 'real'));
  scamBtn.addEventListener('click', () => answer(card, cardEl, 'scam'));

  return cardEl;
}

function paint(ctx: StageContext, state: 'infected' | 'secured' | 'pristine'): void {
  ctx.section.classList.toggle('is-infected', state === 'infected');
  ctx.section.classList.toggle('is-secured', state === 'secured');
  ctx.setState(state);
}

export const phishing: Stage = {
  id: 'phishing',
  order: 1,
  name: lookup('stages.phishing.name'),

  build(ctx) {
    answered = 0;
    correct = 0;

    scoreValue = el('span.phish-score-value', {}, '0 / 0');

    const inbox = el('div.phish-inbox', {}, ...CARDS.map(buildCard));

    ctx.demo.append(
      el(
        'div.phish',
        {},
        el(
          'div.phish-demo-head',
          {},
          bi(copy('demoTitle'), 'h3.phish-demo-title'),
          bi(copy('demoHint'), 'p.phish-demo-hint'),
        ),
        inbox,
        el('div.phish-hook', { 'aria-hidden': 'true' }, el('span.phish-hook-line'), el('span.phish-hook-barb')),
        el('div.phish-loot', { 'aria-hidden': 'true' }, el('span.phish-loot-glyph', {}, '••••••')),
        el('div.phish-shield', { 'aria-hidden': 'true' }),
        el(
          'p.phish-score',
          {},
          biInline(copy('demoScore'), 'span.bi.bi-inline.phish-score-label'),
          scoreValue,
        ),
      ),
    );
    updateScore();
  },

  /** Beat 1 — the hook, literally: a line drops in and yanks the data out. */
  infect(ctx) {
    paint(ctx, 'infected');
    const q = <T extends Element>(sel: string) => ctx.demo.querySelector<T>(sel);
    const urgent = ctx.demo.querySelector('.phish-msg[data-urgent="true"]');

    ctx.timeline()
      .fromTo(ctx.demo.querySelectorAll('.phish-msg'), { y: 16, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.4 })
      .fromTo(q('.phish-urgency-fill'), { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'power1.in' }, '-=0.1')
      .to(urgent, { boxShadow: '0 0 0 2px var(--infect)', duration: 0.2 }, '<')
      .fromTo(q('.phish-hook'), { y: '-120%', rotate: -18 }, { y: '-10%', rotate: 4, duration: 0.5, ease: 'power3.in' })
      .set(q('.phish-loot'), { opacity: 1 })
      .to(q('.phish-loot'), { y: -140, x: 40, opacity: 0, duration: 0.6, ease: 'power2.in' })
      .to(q('.phish-hook'), { y: '-120%', rotate: -10, duration: 0.5, ease: 'power2.inOut' }, '-=0.3');
  },

  /** Beat 3 — the turn: the hook snaps, the data comes back, the inbox is guarded. */
  defend(ctx) {
    paint(ctx, 'secured');
    const q = <T extends Element>(sel: string) => ctx.demo.querySelector<T>(sel);

    ctx.timeline()
      .set(q('.phish-hook'), { opacity: 0 })
      .fromTo(q('.phish-shield'), { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' })
      .fromTo(q('.phish-loot'), { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2')
      .to(ctx.demo.querySelectorAll('.phish-msg[data-urgent="true"]'), { opacity: 0.45, duration: 0.4 }, '<');
  },

  reset(ctx) {
    paint(ctx, 'pristine');
    clear(ctx.demo);
    this.build(ctx);
  },

  /** Calm fallback: the end state of the hook, no swinging line. */
  reducedMotion(ctx) {
    paint(ctx, 'infected');
    const fill = ctx.demo.querySelector<HTMLElement>('.phish-urgency-fill');
    if (fill) fill.style.transform = 'scaleX(1)';
    const loot = ctx.demo.querySelector<HTMLElement>('.phish-loot');
    if (loot) loot.style.opacity = '0';
  },
};
