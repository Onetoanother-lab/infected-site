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
}

export interface Engine {
  /** The section element for a 1-based threat number. */
  sectionFor(order: number): HTMLElement | undefined;
  /** Presenter 'R': every stage back to pristine, no residue. */
  resetAll(): void;
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

    const runInfect = () => {
      if (record.state !== 'pristine') return;
      if (reduced) stage.reducedMotion(ctx);
      else stage.infect(ctx);
    };
    const runDefend = () => {
      if (record.state !== 'infected') return;
      stage.defend(ctx);
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
    resetAll() {
      for (const record of mounted.values()) {
        for (const tl of record.timelines) tl.revert();
        record.timelines.length = 0;
        for (const fn of record.teardown) fn();
        record.teardown.length = 0;
        record.stage.reset(record.ctx);
        record.ctx.setState('pristine');
      }
      tracker.setActive(null);
      ScrollTrigger.refresh();
    },
  };
}
