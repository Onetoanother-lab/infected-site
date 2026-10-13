import { bi, el } from './dom';
import { lookup, tryLookup } from '../content/strings';
import type { Stage } from '../types';

export interface SectionParts {
  section: HTMLElement;
  /** Sticky theatre box — the stage draws its demo here. */
  demo: HTMLElement;
  /** Beat 2 card: what it is, the red flag, the example. */
  explain: HTMLElement;
  /** Beat 3 card: the defense. */
  defend: HTMLElement;
}

/**
 * The shared shell every stage sits in, so all nine read as one piece. The
 * stage module only fills `demo`; all copy comes from strings.ts.
 */
export function buildSection(stage: Stage, total: number): SectionParts {
  const ui = (key: string) => lookup(`ui.${key}`);
  const copy = (key: string) => lookup(`stages.${stage.id}.${key}`);

  const count = {
    uz: `${ui('threatCount').uz} ${stage.order} / ${total}`,
    en: `${ui('threatCount').en} ${stage.order} / ${total}`,
  };

  const demo = el('div.theatre-box', {
    'data-demo': stage.id,
    role: 'group',
    'aria-label': stage.name.uz,
  });

  const redFlag = tryLookup(`stages.${stage.id}.redFlag`);
  const example = tryLookup(`stages.${stage.id}.example`);
  const defense = tryLookup(`stages.${stage.id}.defense`);

  const explain = el(
    'div.beat.beat-explain',
    {},
    el('div.beat-label', {}, bi(ui('whatIs'), 'span.bi.bi-label')),
    bi(copy('what'), 'p.beat-text'),
    redFlag
      ? el(
          'div.flag',
          {},
          el('div.beat-label.beat-label-flag', {}, bi(ui('redFlag'), 'span.bi.bi-label')),
          bi(redFlag, 'p.beat-text'),
        )
      : null,
    example
      ? el(
          'figure.example',
          {},
          el('figcaption.beat-label', {}, bi(ui('example'), 'span.bi.bi-label')),
          bi(example, 'blockquote.example-quote'),
        )
      : null,
  );

  const defend = el(
    'div.beat.beat-defend',
    {},
    el('div.beat-label.beat-label-shield', {}, bi(ui('defense'), 'span.bi.bi-label')),
    defense ? bi(defense, 'p.beat-text') : null,
  );

  const section = el(
    'section.stage',
    {
      id: `stage-${stage.id}`,
      'data-stage': stage.id,
      'data-order': stage.order,
      'data-state': 'pristine',
      'aria-labelledby': `stage-${stage.id}-title`,
      tabindex: '-1',
    },
    el('span.stage-ghost', { 'aria-hidden': 'true' }, String(stage.order)),
    el(
      'header.stage-head',
      {},
      bi(count, 'p.stage-count'),
      el('h2.stage-title', { id: `stage-${stage.id}-title` }, bi(stage.name, 'span.bi.bi-title')),
    ),
    el('div.theatre', {}, demo),
    el('div.beats', {}, explain, defend),
  );

  return { section, demo, explain, defend };
}
