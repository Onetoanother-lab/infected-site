import { el } from '../core/dom';
import { lookup } from '../content/strings';
import type { Stage, StageId, StageContext } from '../types';

/**
 * Scaffold for a stage whose three beats are not built yet (Phase A). It
 * honours the full Stage contract — infect/defend/reset stay symmetric — so the
 * scroll, the tracker and the presenter jumps already work end to end. Replace
 * one of these with a real module, never extend this file with threat content.
 */
export function placeholderStage(id: StageId, order: number): Stage {
  const mark = (ctx: StageContext, state: 'infected' | 'secured' | 'pristine') => {
    ctx.section.classList.toggle('is-infected', state === 'infected');
    ctx.section.classList.toggle('is-secured', state === 'secured');
    ctx.setState(state);
  };

  return {
    id,
    order,
    name: lookup(`stages.${id}.name`),

    build(ctx) {
      ctx.demo.append(el('div.placeholder', { 'aria-hidden': 'true' }, el('span.placeholder-num', {}, String(order))));
    },

    infect(ctx) {
      mark(ctx, 'infected');
      ctx.timeline().fromTo(
        ctx.demo.querySelector('.placeholder'),
        { scale: 0.96, opacity: 0.4 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' },
      );
    },

    defend(ctx) {
      mark(ctx, 'secured');
    },

    reset(ctx) {
      mark(ctx, 'pristine');
    },

    reducedMotion(ctx) {
      mark(ctx, 'infected');
    },
  };
}
