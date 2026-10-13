import { bi, biInline, clear, el } from '../core/dom';
import { lookup } from '../content/strings';
import type { Stage, StageContext } from '../types';

/**
 * Threat 3 — vishing. The call is four short written lines, each one tied to
 * the warning sign it carries, so the stage teaches recognition instead of
 * handing anyone a script. There is no audio, no microphone, no input element
 * and nothing leaves the page. The caller and the number are invented.
 */

const LINES = ['1', '2', '3', '4'] as const;

const copy = (key: string) => lookup(`stages.vishing.${key}`);

/** Seconds on the fake call timer when the script reaches its last line. */
const CALL_SECONDS = 42;

function clock(seconds: number): string {
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(Math.floor(seconds % 60)).padStart(2, '0');
  return `${mm}:${ss}`;
}

function setStatus(ctx: StageContext, key: string): void {
  const status = ctx.demo.querySelector<HTMLElement>('.vish-status');
  if (!status) return;
  clear(status);
  status.append(bi(copy(key)));
}

/** The whole call, already played: every line read, every sign lit. */
function showCallPlayed(ctx: StageContext): void {
  const phone = ctx.demo.querySelector('.vish-phone');
  phone?.classList.remove('is-ringing', 'is-safe');
  phone?.classList.add('is-live');
  setStatus(ctx, 'statusLive');
  ctx.demo.querySelectorAll<HTMLElement>('.vish-line').forEach((line) => {
    line.dataset.said = 'true';
  });
  ctx.demo.querySelectorAll<HTMLElement>('.vish-flag').forEach((flag) => {
    flag.dataset.lit = 'true';
  });
  const timer = ctx.demo.querySelector<HTMLElement>('.vish-timer');
  if (timer) timer.textContent = clock(CALL_SECONDS);
}

/** Back to a silent phone: nothing said, no sign lit. */
function showCallIdle(ctx: StageContext): void {
  const phone = ctx.demo.querySelector('.vish-phone');
  phone?.classList.remove('is-live', 'is-safe');
  phone?.classList.add('is-ringing');
  setStatus(ctx, 'statusIncoming');
  ctx.demo.querySelectorAll<HTMLElement>('.vish-line').forEach((line) => {
    line.dataset.said = 'false';
  });
  ctx.demo.querySelectorAll<HTMLElement>('.vish-flag').forEach((flag) => {
    flag.dataset.lit = 'false';
  });
  const timer = ctx.demo.querySelector<HTMLElement>('.vish-timer');
  if (timer) timer.textContent = clock(0);
  const outcome = ctx.demo.querySelector<HTMLElement>('.vish-outcome');
  if (outcome) outcome.hidden = true;
}

/** The call ends the way it should: hung up, then called back on a known number. */
function showHungUp(ctx: StageContext): void {
  const phone = ctx.demo.querySelector('.vish-phone');
  phone?.classList.remove('is-ringing', 'is-live');
  phone?.classList.add('is-safe');
  setStatus(ctx, 'statusCallback');
  const name = ctx.demo.querySelector<HTMLElement>('.vish-caller-name');
  if (name) {
    clear(name);
    name.append(bi(copy('callbackName')));
  }
  const outcome = ctx.demo.querySelector<HTMLElement>('.vish-outcome');
  if (outcome) outcome.hidden = false;
}

/** Plays the four lines, lighting each warning sign as it lands. */
function playCall(ctx: StageContext): void {
  showCallIdle(ctx);
  const phone = ctx.demo.querySelector('.vish-phone');
  const timer = ctx.demo.querySelector<HTMLElement>('.vish-timer');
  const counter = { value: 0 };

  const tl = ctx.timeline();
  tl.call(() => {
    phone?.classList.remove('is-ringing');
    phone?.classList.add('is-live');
    setStatus(ctx, 'statusLive');
  });
  tl.to(
    counter,
    {
      value: CALL_SECONDS,
      duration: 4.4,
      ease: 'none',
      onUpdate: () => {
        if (timer) timer.textContent = clock(counter.value);
      },
    },
    0,
  );

  LINES.forEach((n, index) => {
    const line = ctx.demo.querySelector<HTMLElement>(`.vish-line[data-line="${n}"]`);
    const flag = ctx.demo.querySelector<HTMLElement>(`.vish-flag[data-flag="${n}"]`);
    const at = 0.3 + index * 1.05;
    tl.call(
      () => {
        if (line) line.dataset.said = 'true';
        if (flag) flag.dataset.lit = 'true';
      },
      undefined,
      at,
    );
    tl.fromTo(line, { x: -10, opacity: 0.25 }, { x: 0, opacity: 1, duration: 0.35 }, at);
    tl.fromTo(flag, { scale: 0.9 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' }, at);
  });
}

function paint(ctx: StageContext, state: 'infected' | 'secured' | 'pristine'): void {
  ctx.section.classList.toggle('is-infected', state === 'infected');
  ctx.section.classList.toggle('is-secured', state === 'secured');
  ctx.setState(state);
}

export const vishing: Stage = {
  id: 'vishing',
  order: 3,
  name: lookup('stages.vishing.name'),

  build(ctx) {
    const replay = el('button.vish-btn', { type: 'button' }, biInline(copy('replay')));
    const hangup = el('button.vish-btn.vish-btn-hangup', { type: 'button' }, biInline(copy('hangup')));
    replay.addEventListener('click', () => playCall(ctx));
    hangup.addEventListener('click', () => showHungUp(ctx));

    const phone = el(
      'div.vish-phone.is-ringing',
      {},
      el(
        'div.vish-caller',
        {},
        el('span.vish-avatar', { 'aria-hidden': 'true' }),
        el(
          'div.vish-caller-text',
          {},
          el('div.vish-caller-name', {}, bi(copy('callerName'))),
          el('span.vish-caller-num', {}, copy('callerNumber').uz),
        ),
      ),
      el(
        'div.vish-meta',
        {},
        el('div.vish-status', {}, bi(copy('statusIncoming'))),
        el('span.vish-timer', { 'aria-live': 'off' }, clock(0)),
      ),
    );

    const script = el(
      'ol.vish-script',
      {},
      ...LINES.map((n) =>
        el('li.vish-line', { 'data-line': n, 'data-said': 'false' }, bi(copy(`line${n}`), 'p.vish-line-text')),
      ),
    );

    const flags = el(
      'div.vish-flags',
      {},
      bi(copy('flagsTitle'), 'h4.vish-flags-title'),
      el(
        'ul.vish-flag-list',
        {},
        ...LINES.map((n) =>
          el('li.vish-flag', { 'data-flag': n, 'data-lit': 'false' }, biInline(copy(`flag${n}`))),
        ),
      ),
    );

    const outcome = el(
      'div.vish-outcome',
      { hidden: true },
      bi(copy('outcomeTitle'), 'h4.vish-outcome-title'),
      bi(copy('outcome'), 'p.vish-outcome-text'),
    );

    ctx.demo.append(
      el(
        'div.vish',
        {},
        el('div.vish-head', {}, bi(copy('demoTitle'), 'h3.vish-title'), bi(copy('demoHint'), 'p.vish-hint')),
        phone,
        el('div.vish-body', {}, script, flags),
        el('div.vish-actions', {}, replay, hangup),
        outcome,
      ),
    );
  },

  /** Beat 1 — the phone rings and the call plays itself out. */
  infect(ctx) {
    paint(ctx, 'infected');
    ctx
      .timeline()
      .fromTo(
        ctx.demo.querySelector('.vish-phone'),
        { x: -6 },
        { x: 6, duration: 0.07, repeat: 7, yoyo: true, ease: 'none' },
      )
      .set(ctx.demo.querySelector('.vish-phone'), { x: 0 })
      .call(() => playCall(ctx));
  },

  /** Beat 3 — hang up, dial the number you already have, keep the code. */
  defend(ctx) {
    paint(ctx, 'secured');
    showHungUp(ctx);
    ctx
      .timeline()
      .fromTo(ctx.demo.querySelector('.vish-phone'), { scale: 0.98 }, { scale: 1, duration: 0.4, ease: 'power2.out' })
      .fromTo(ctx.demo.querySelector('.vish-outcome'), { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '-=0.2')
      .to(ctx.demo.querySelectorAll('.vish-flag'), { opacity: 0.45, duration: 0.3, stagger: 0.05 }, '<');
  },

  reset(ctx) {
    paint(ctx, 'pristine');
    clear(ctx.demo);
    this.build(ctx);
  },

  /** Calm fallback: the call already played, every sign lit, no shaking. */
  reducedMotion(ctx) {
    paint(ctx, 'infected');
    showCallPlayed(ctx);
  },
};
