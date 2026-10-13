import { bi, biInline, clear, el } from '../core/dom';
import { lookup } from '../content/strings';
import type { Stage, StageContext } from '../types';

/**
 * Threat 2 — pharming. The visitor never clicks anything wrong: the address
 * stays correct and the lookup table underneath is what changes. Everything is
 * drawn; there is no DNS call, no form and no input of any kind. The addresses
 * below are invented and the numbers come from the ranges reserved for
 * documentation.
 */

const REAL_IP = '203.0.113.9';
const FAKE_IP = '198.51.100.7';
const OTHER_ROWS: [string, string][] = [
  ['qalqon-pay.xyz', '203.0.113.21'],
  ['maktab-forum.xyz', '203.0.113.44'],
];

const copy = (key: string) => lookup(`stages.pharming.${key}`);

let poisoned = false;

function row(address: string, ip: string, primary = false): HTMLElement {
  return el(
    'div.pharm-row',
    primary ? { 'data-primary': 'true' } : {},
    el('span.pharm-row-name', {}, address),
    el('span.pharm-row-arrow', { 'aria-hidden': 'true' }, '::'),
    el('span.pharm-row-ip', {}, ip),
  );
}

/** The end state of the infect beat, with no motion. */
function showClone(ctx: StageContext): void {
  const q = <T extends Element>(sel: string) => ctx.demo.querySelector<T>(sel);
  ctx.demo.querySelector('.pharm')?.classList.add('is-poisoned');
  const ip = q<HTMLElement>('.pharm-row[data-primary="true"] .pharm-row-ip');
  if (ip) ip.textContent = FAKE_IP;
  const server = q<HTMLElement>('.pharm-server-name');
  if (server) {
    clear(server);
    server.append(bi(copy('serverFake')));
  }
  const title = q<HTMLElement>('.pharm-page-title');
  if (title) {
    clear(title);
    title.append(bi(copy('pageClone')));
  }
  const cert = q<HTMLElement>('.pharm-cert');
  if (cert) cert.hidden = false;
  poisoned = true;
}

/** The end state of the defend beat, with no motion. */
function showReal(ctx: StageContext): void {
  const q = <T extends Element>(sel: string) => ctx.demo.querySelector<T>(sel);
  ctx.demo.querySelector('.pharm')?.classList.remove('is-poisoned');
  const ip = q<HTMLElement>('.pharm-row[data-primary="true"] .pharm-row-ip');
  if (ip) ip.textContent = REAL_IP;
  const server = q<HTMLElement>('.pharm-server-name');
  if (server) {
    clear(server);
    server.append(bi(copy('serverReal')));
  }
  const title = q<HTMLElement>('.pharm-page-title');
  if (title) {
    clear(title);
    title.append(bi(copy('pageReal')));
  }
  const cert = q<HTMLElement>('.pharm-cert');
  if (cert) cert.hidden = true;
  poisoned = false;
}

/** One packet running from the address table to whichever server it points at. */
function runPacket(ctx: StageContext): void {
  const packet = ctx.demo.querySelector('.pharm-packet');
  if (!packet) return;
  ctx
    .timeline()
    .fromTo(packet, { xPercent: 0, opacity: 0 }, { opacity: 1, duration: 0.15 })
    .to(packet, { xPercent: 900, duration: 0.7, ease: 'power1.inOut' })
    .to(packet, { opacity: 0, duration: 0.2 })
    .fromTo(
      ctx.demo.querySelector('.pharm-page'),
      { scale: 0.985 },
      { scale: 1, duration: 0.3, ease: 'power2.out' },
      '-=0.1',
    )
    // while the table is poisoned, trying again lands on the same copy
    .to(ctx.demo.querySelector('.pharm-cert'), {
      scale: poisoned ? 1.05 : 1,
      duration: 0.15,
      repeat: poisoned ? 3 : 0,
      yoyo: true,
    });
}

function paint(ctx: StageContext, state: 'infected' | 'secured' | 'pristine'): void {
  ctx.section.classList.toggle('is-infected', state === 'infected');
  ctx.section.classList.toggle('is-secured', state === 'secured');
  ctx.setState(state);
}

export const pharming: Stage = {
  id: 'pharming',
  order: 2,
  name: lookup('stages.pharming.name'),

  build(ctx) {
    poisoned = false;

    const retry = el('button.pharm-retry', { type: 'button' }, biInline(copy('retry')));
    retry.addEventListener('click', () => runPacket(ctx));

    const site = el(
      'div.pharm-site',
      { 'aria-hidden': 'true' },
      el('span.pharm-logo', {}, 'N'),
      el('span.pharm-brand', {}, 'Namuna Bank'),
      el(
        'div.pharm-fields',
        {},
        el('div.pharm-field', {}, bi(copy('mockUser'), 'span.bi.pharm-field-label'), el('span.pharm-field-bar')),
        el('div.pharm-field', {}, bi(copy('mockPass'), 'span.bi.pharm-field-label'), el('span.pharm-field-bar')),
      ),
    );

    const cert = el('p.pharm-cert', { hidden: true }, biInline(copy('certWarn')));

    ctx.demo.append(
      el(
        'div.pharm',
        {},
        el(
          'div.pharm-head',
          {},
          bi(copy('demoTitle'), 'h3.pharm-title'),
          bi(copy('demoHint'), 'p.pharm-hint'),
        ),
        el(
          'div.pharm-bar',
          {},
          el('span.pharm-bar-lock', { 'aria-hidden': 'true' }),
          el('span.pharm-bar-url', {}, copy('address').uz),
        ),
        el(
          'div.pharm-wire',
          {},
          el(
            'div.pharm-book',
            {},
            bi(copy('bookLabel'), 'h4.pharm-panel-title'),
            row(copy('address').uz, REAL_IP, true),
            ...OTHER_ROWS.map(([name, ip]) => row(name, ip)),
          ),
          el('span.pharm-packet', { 'aria-hidden': 'true' }),
          el(
            'div.pharm-server',
            {},
            bi(copy('serverLabel'), 'h4.pharm-panel-title'),
            el('div.pharm-server-name', {}, bi(copy('serverReal'))),
          ),
        ),
        el('div.pharm-page', {}, el('div.pharm-page-title', {}, bi(copy('pageReal'))), site, cert),
        el('div.pharm-actions', {}, retry, bi(copy('retryNote'), 'p.pharm-note')),
        bi(copy('mockNote'), 'p.pharm-mock-note'),
      ),
    );
  },

  /** Beat 1 — the table entry flips while the address stays exactly right. */
  infect(ctx) {
    paint(ctx, 'infected');
    const q = <T extends Element>(sel: string) => ctx.demo.querySelector<T>(sel);
    const ipCell = q<HTMLElement>('.pharm-row[data-primary="true"] .pharm-row-ip');

    ctx
      .timeline()
      .fromTo(q('.pharm-row'), { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, stagger: 0.06 })
      .to(q('.pharm-row[data-primary="true"]'), { duration: 0.2 })
      .to(ipCell, { opacity: 0, duration: 0.25 })
      .call(() => showClone(ctx))
      .to(ipCell, { opacity: 1, duration: 0.25 })
      .fromTo(q('.pharm-packet'), { xPercent: 0, opacity: 0 }, { opacity: 1, duration: 0.15 })
      .to(q('.pharm-packet'), { xPercent: 900, duration: 0.6, ease: 'power1.in' })
      .to(q('.pharm-packet'), { opacity: 0, duration: 0.15 })
      .fromTo(q('.pharm-page'), { y: 0 }, { y: -6, duration: 0.12, repeat: 3, yoyo: true })
      .fromTo(q('.pharm-cert'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35 });
  },

  /** Beat 3 — heed the warning, clean the lookup, land on the real site again. */
  defend(ctx) {
    paint(ctx, 'secured');
    const q = <T extends Element>(sel: string) => ctx.demo.querySelector<T>(sel);
    const ipCell = q<HTMLElement>('.pharm-row[data-primary="true"] .pharm-row-ip');

    ctx
      .timeline()
      .to(q('.pharm-cert'), { opacity: 0, y: -6, duration: 0.3 })
      .to(ipCell, { opacity: 0, duration: 0.25 })
      .call(() => showReal(ctx))
      .to(ipCell, { opacity: 1, duration: 0.25 })
      .fromTo(q('.pharm-bar'), { boxShadow: '0 0 0 0 rgba(91, 179, 166, 0)' }, { boxShadow: '0 0 0 2px var(--calm)', duration: 0.4 })
      .fromTo(q('.pharm-page'), { opacity: 0.6 }, { opacity: 1, duration: 0.4 }, '<');
  },

  reset(ctx) {
    paint(ctx, 'pristine');
    clear(ctx.demo);
    this.build(ctx);
  },

  /** Calm fallback: the poisoned table and the clone, shown straight away. */
  reducedMotion(ctx) {
    paint(ctx, 'infected');
    showClone(ctx);
  },
};
