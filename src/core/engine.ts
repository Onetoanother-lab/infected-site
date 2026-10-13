import { gsap, ScrollTrigger } from './scroll';
import { buildSection } from './section';
import type { Tracker } from './tracker';
import type { Stage, StageContext, StageId, StageState } from '../types';

interface Mounted {
  stage: Stage;
  ctx: StageContext;
  section: HTMLElement;
  state: StageState;
  timelines: gsap.core.Timeline[];
  teardown: (() => void)[];
  /** Wipe this one stage back to pristine. */
  clear: () => void;
  /** Run beat 1 from the start, whatever state the stage was in. */
  play: () => void;
}

/** How long beat 1 is given before beat 3 may run. */
const HOOK_SECONDS = 3;

export interface Engine {
  /** The section element for a 1-based threat number. */
  sectionFor(order: number): HTMLElement | undefined;
  /** Presenter 1–9: show that threat from its first beat again. */
  replay(order: number): void;
  /** Presenter 'R': every stage back to pristine, no residue. */
  resetAll(): void;
  /** While a presenter jump is travelling, the scroll must not fire beats. */
  setLocked(locked: boolean): void;
}

/**
 * Builds the nine sections, gives each stage its context, and ties the three
 * beats to the scroll. Stages never touch ScrollTrigger or the tracker
 * themselves.
 */
export function mountStages(
  host: HTMLElement,
  stages: Stage[],
  tracker: Tracker,
  reduced: boolean,
): Engine {
  const mounted = new Map<StageId, Mounted>();
  let locked = false;


  for (const stage of stages) {
    const parts = buildSection(stage, stages.length);
    host.append(parts.section);

    const record: Mounted = {
      stage,
      ctx: undefined as unknown as StageContext,
      section: parts.section,
      state: 'pristine',
      timelines: [],
      teardown: [],
      clear: () => {},
      play: () => {},
    };

    const ctx: StageContext = {
      id: stage.id,
      section: parts.section,
      demo: parts.demo,
      reduced,
      setState(state: StageState) {
        record.state = state;
        parts.section.dataset.state = state;
        tracker.set(stage.id, state);
      },
      timeline(vars) {
        const tl = gsap.timeline(vars);
        record.timelines.push(tl);
        return tl;
      },
      own(disposable) {
        record.teardown.push(() => {
          disposable.kill?.();
          disposable.destroy?.();
        });
        return disposable;
      },
      onReset(fn) {
        record.teardown.push(fn);
      },
    };

    record.ctx = ctx;
    mounted.set(stage.id, record);
    stage.build(ctx);

    let infectedAt = 0;

    const runInfect = () => {
      if (locked || record.state !== 'pristine') return;
      infectedAt = performance.now();
      if (reduced) stage.reducedMotion(ctx);
      else stage.infect(ctx);
    };

    /**
     * Beat 3 always comes after beat 1 has been seen. On a presenter jump both
     * triggers can fire in the same frame, so the defense waits out the rest of
     * the hook instead of wiping it away immediately.
     */
    const runDefend = () => {
      if (locked || record.state !== 'infected') return;
      const waited = (performance.now() - infectedAt) / 1000;
      const rest = Math.max(HOOK_SECONDS - waited, 0);
      if (rest === 0) {
        stage.defend(ctx);
        return;
      }
      const call = gsap.delayedCall(rest, () => {
        if (record.state === 'infected') stage.defend(ctx);
      });
      record.teardown.push(() => call.kill());
    };

    record.clear = () => {
      for (const tl of record.timelines) tl.revert();
      record.timelines.length = 0;
      for (const fn of record.teardown) fn();
      record.teardown.length = 0;
      stage.reset(ctx);
      ctx.setState('pristine');
    };

    record.play = () => {
      record.clear();
      runInfect();
    };

    // Beat 1 fires when the theatre is well inside the viewport, beat 3 when
    // the defense card arrives. The third trigger only tells the rail where we are.
    ScrollTrigger.create({ trigger: parts.demo, start: 'top 70%', onEnter: runInfect });
    ScrollTrigger.create({ trigger: parts.defend, start: 'top 80%', onEnter: runDefend });
    ScrollTrigger.create({
      trigger: parts.section,
      start: 'top 60%',
      end: 'bottom 40%',
      onToggle: (self) => {
        if (self.isActive) tracker.setActive(stage.id);
      },
    });
  }

  return {
    sectionFor(order) {
      const stage = stages[order - 1];
      return stage ? mounted.get(stage.id)?.section : undefined;
    },
    setLocked(value) {
      locked = value;
    },
    replay(order) {
      const stage = stages[order - 1];
      if (stage) mounted.get(stage.id)?.play();
    },
    resetAll() {
      for (const record of mounted.values()) record.clear();
      tracker.setActive(null);
      ScrollTrigger.refresh();
    },
  };
}
