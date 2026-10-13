import { bi, el } from './dom';
import { lookup } from '../content/strings';
import type { Stage, StageId, StageState } from '../types';

export interface Tracker {
  element: HTMLElement;
  set(id: StageId, state: StageState): void;
  setActive(id: StageId | null): void;
}

/**
 * The persistent side rail: which of the nine have appeared, and whether they
 * are still infected or already secured. Each entry is a button, so the rail
 * doubles as keyboard navigation.
 */
export function buildTracker(stages: Stage[], onJump: (stage: Stage) => void): Tracker {
  const rows = new Map<StageId, { button: HTMLElement; name: string }>();

  const list = el('ol.tracker-list', {});
  for (const stage of stages) {
    const button = el(
      'button.tracker-btn',
      { type: 'button', 'data-stage': stage.id, 'data-state': 'pristine' },
      el('span.tracker-num', { 'aria-hidden': 'true' }, String(stage.order)),
      bi(stage.name, 'span.bi.bi-tracker'),
      el('span.tracker-dot', { 'aria-hidden': 'true' }),
    );
    button.addEventListener('click', () => onJump(stage));
    const row = el('li.tracker-row', {}, button);
    rows.set(stage.id, { button, name: stage.name.en });
    list.append(row);
  }

  const element = el(
    'nav.tracker',
    { 'aria-label': lookup('ui.trackerTitle').en },
    bi(lookup('ui.trackerTitle'), 'h2.tracker-title'),
    list,
  );

  const stateLabel = (state: StageState) =>
    state === 'infected'
      ? lookup('ui.stateInfected')
      : state === 'secured'
        ? lookup('ui.stateSecured')
        : lookup('ui.statePristine');

  return {
    element,
    set(id, state) {
      const row = rows.get(id);
      if (!row) return;
      row.button.dataset.state = state;
      const label = stateLabel(state);
      row.button.setAttribute('aria-label', `${row.name} — ${label.en}`);
      row.button.title = `${label.uz} / ${label.en}`;
    },
    setActive(id) {
      for (const [stageId, row] of rows) {
        row.button.dataset.active = String(stageId === id);
      }
    },
  };
}
