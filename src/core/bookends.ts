import { bi, el } from './dom';
import { lookup } from '../content/strings';

/** The calm opening, so the first infection lands hard. */
export function buildIntro(reduced: boolean): HTMLElement {
  const t = (key: string) => lookup(`intro.${key}`);

  return el(
    'section.intro',
    { id: 'intro', 'aria-labelledby': 'intro-title' },
    el(
      'div.intro-inner',
      {},
      bi(t('kicker'), 'p.intro-kicker'),
      el('h1.intro-title', { id: 'intro-title' }, bi(t('title'), 'span.bi.bi-display')),
      bi(t('lead'), 'p.intro-lead'),
      bi(t('promise'), 'p.intro-promise'),
      reduced ? bi(lookup('ui.reducedNotice'), 'p.intro-notice') : null,
      el(
        'p.intro-hint',
        { 'aria-hidden': 'true' },
        bi(lookup('ui.scrollHint'), 'span.bi.bi-inline'),
        el('span.intro-hint-line'),
      ),
    ),
  );
}

/** The restored page and the one habit worth keeping. */
export function buildOutro(): HTMLElement {
  const t = (key: string) => lookup(`outro.${key}`);

  return el(
    'section.outro',
    { id: 'outro', 'aria-labelledby': 'outro-title' },
    el(
      'div.outro-inner',
      {},
      el('h2.outro-title', { id: 'outro-title' }, bi(t('title'), 'span.bi.bi-display')),
      bi(t('lead'), 'p.outro-lead'),
      bi(t('habits'), 'p.outro-habits'),
    ),
  );
}
