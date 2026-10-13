---
description: Build or edit one threat "stage" in the infection experience. Use when adding, wiring, or revising any of the nine threat sections (phishing, pharming, vishing, trojan, worm, spyware, rootkit, adware, ransomware) or their cleanup counterparts.
---

# Building one infection stage

Every threat is one stage with the same three-beat rhythm. Follow this contract so all
nine feel like one piece. Read `docs/THREATS.md` for the approved framing of the specific
threat before building its stage, and keep to the hard rules in `CLAUDE.md`.

## The three beats (in order, always)

1. **Infect** — the hook. A short, striking animation where this threat visibly does
   something to the page. Seconds, not a movie. This beat earns attention; it does not
   teach yet.
2. **Explain** — the payload. In plain language and in both Uzbek and English: what it is,
   the **red flag** (how you spot it), and one recognition example using a fictional brand.
   Short sentences. This is the part they should remember.
3. **Defend** — the turn. The matching protection, stated as an action the visitor can
   take, plus the visible "clean" that repairs what the infect beat broke (the repair may
   land now or in Act II — keep the hook so Act II can pay it off).

A stage that has only the infect beat is unfinished. The lesson is beats 2 and 3.

## Stage module contract

Each stage lives in `src/stages/<id>.ts` and exports an object matching the shared
`Stage` type. Keep this shape identical across all nine:

```ts
export const phishing: Stage = {
  id: 'phishing',
  order: 1,
  name: lookup('stages.phishing.name'),
  // all user-facing text comes from strings.ts, keyed by id — never inline copy here
  build: (ctx) => { /* the pristine demo DOM, drawn into ctx.demo */ },
  infect: (ctx) => { /* animation in, through ctx.timeline() so reset can revert it */ },
  defend: (ctx) => { /* visible repair; must fully undo infect() */ },
  reset:  (ctx) => { /* return this stage to pristine for presenter 'R' */ },
  reducedMotion: (ctx) => { /* calm fallback: show the end state, skip violent motion */ },
};
```

The shared shell around the stage (count, title, the explain and defend copy) is built
by `src/core/section.ts` from `strings.ts`; a stage module only fills `ctx.demo`.
`ctx.timeline()` and `ctx.own()` register things the engine kills on reset, and
`ctx.setState()` is the only way a stage talks to the tracker.

- Register every stage in the central `stages[]` array (ordered 1–9). That array drives
  the scroll, the side tracker, and the presenter jumps — don't wire those per stage.
- `infect` / `defend` / `reset` must be symmetric: after `reset`, no trace of the stage
  remains and the next run looks identical to the first.
- Drive motion through GSAP ScrollTrigger timelines tied to the stage's scroll range.
  Pop-up physics (adware) use Matter.js; clean the physics world up in `reset`.

## Non-negotiables for every stage

- **Fictional brands only.** Invent the bank/app/logo. Never a real one.
- **No real data capture.** If the stage has an input, its value stays in a local
  variable and is used only to drive the on-screen animation. No `fetch`/`XHR`/
  `sendBeacon`/form `action` ever carries it anywhere. (The `verify` skill checks this.)
- **Spyware stage:** reflect only in-page actions the visitor just took, show them at
  once, then wipe. No device sensors, no external capture, no storage.
- **Ransomware stage:** fake overlay + scrambled *display* text + countdown only. Never
  touch, read, or encrypt anything real.
- **Reduced motion:** the `reducedMotion` path is required, not optional, and must still
  deliver the red flag and the defense.
- **Reachable:** the stage's interactive bits work by keyboard; any audio is off by
  default and captioned.

## When you finish a stage

Run through the per-stage "definition of done" in `CLAUDE.md`. If anything about the
stage would only work by doing the real thing (real capture, real brand, real lock), stop
and build the staged equivalent, and say so.
