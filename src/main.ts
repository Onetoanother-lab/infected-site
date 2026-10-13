import './styles/main.css';
import './styles/stages.css';

import { buildIntro, buildOutro } from './core/bookends';
import { mountStages } from './core/engine';
import { initPresenter } from './core/presenter';
import { initSmoothScroll, ScrollTrigger, scrollToElement, scrollToTop } from './core/scroll';
import { buildTracker } from './core/tracker';
import { prefersReducedMotion, el } from './core/dom';
import { lookup } from './content/strings';
import { stages } from './stages';

// '?reduced=1' forces the calm path, so the fallback can be checked and shown
// in class without changing an OS setting.
const forced = new URLSearchParams(window.location.search).has('reduced');
const reduced = forced || prefersReducedMotion();
document.documentElement.dataset.reducedMotion = String(reduced);
document.title = lookup('ui.siteTitle').uz;

const app = document.querySelector<HTMLElement>('#app');
if (!app) throw new Error('#app is missing from index.html');

const lenis = initSmoothScroll(reduced);

const acts = el('main.acts', { id: 'acts' });
app.append(acts);

const tracker = buildTracker(stages, (stage) => jumpTo(stage.order));

acts.append(buildIntro(reduced));
const engine = mountStages(acts, stages, tracker, reduced);
acts.append(buildOutro());
app.append(tracker.element);

let jumpTimer: number | undefined;

function jumpTo(order: number): void {
  const section = engine.sectionFor(order);
  if (!section) return;
  // The jump travels past every stage in between. Hold the beats while it
  // moves, then play the target threat from its hook.
  engine.setLocked(true);
  scrollToElement(lenis, section);
  section.focus({ preventScroll: true });
  window.clearTimeout(jumpTimer);
  jumpTimer = window.setTimeout(() => {
    engine.setLocked(false);
    engine.replay(order);
  }, 1100);
}

const presenter = initPresenter(engine, jumpTo, () => {
  engine.resetAll();
  scrollToTop(lenis);
});
app.append(presenter.element);

ScrollTrigger.refresh();
