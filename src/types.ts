/** The two languages the site always shows together. Uzbek leads. */
export type Lang = 'uz' | 'en';

/** Every piece of user-facing text is a pair. Never one without the other. */
export interface Localized {
  uz: string;
  en: string;
}

export const STAGE_IDS = [
  'phishing',
  'pharming',
  'vishing',
  'trojan',
  'worm',
  'spyware',
  'rootkit',
  'adware',
  'ransomware',
] as const;

export type StageId = (typeof STAGE_IDS)[number];

/** What the side tracker shows for a stage. */
export type StageState = 'pristine' | 'infected' | 'secured';

/**
 * Everything a stage module is allowed to touch. A stage never reaches outside
 * its own section, and never queries the document directly.
 */
export interface StageContext {
  readonly id: StageId;
  /** The stage's own <section>. */
  readonly section: HTMLElement;
  /** The empty box inside the section that the stage draws its demo into. */
  readonly demo: HTMLElement;
  /** True when the visitor asked for less motion. */
  readonly reduced: boolean;

  /** Tell the tracker (and the page) where this stage stands. */
  setState(state: StageState): void;

  /**
   * A GSAP timeline bound to this stage. Killed automatically on reset, so a
   * stage never has to track its own tweens.
   */
  timeline(vars?: gsap.TimelineVars): gsap.core.Timeline;
  /** Anything with kill()/destroy() that must die on reset. */
  own<T extends { kill?: () => void; destroy?: () => void }>(disposable: T): T;
  /** A plain teardown callback, run on reset. */
  onReset(fn: () => void): void;
}

/**
 * One threat. The shape is identical for all nine; see
 * .claude/skills/infection-stage/SKILL.md for the three-beat contract.
 */
export interface Stage {
  id: StageId;
  order: number;
  name: Localized;

  /** Build the pristine demo DOM. No animation, no infection yet. */
  build(ctx: StageContext): void;
  /** Beat 1 — the hook. Seconds, not a movie. */
  infect(ctx: StageContext): void;
  /** Beat 3 — the visible repair. Must fully undo infect(). */
  defend(ctx: StageContext): void;
  /** Back to pristine, for presenter 'R'. No residue. */
  reset(ctx: StageContext): void;
  /** Calm fallback: the end state of infect(), without the violent motion. */
  reducedMotion(ctx: StageContext): void;
}
