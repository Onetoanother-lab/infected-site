# Project: "The Site That Gets Infected" — a cyber-awareness experience

A single-page scroll experience for an IT/English class. As the visitor scrolls, the
page itself appears to get "infected" by nine threats one at a time. Each threat is
shown, explained in plain language, then **cleaned** by the matching defense. The point
the visitor leaves with is always: *how do I recognize this, and how do I stay safe.*

Topic (as assigned): Phishing, Pharming, Vishing, Trojan, Worm, Spyware, Rootkit,
Adware, Ransomware — tushunchalari va xavfsizlikni ta'minlash.

Audience: students and a live classroom presentation. Bilingual: **Uzbek (primary) +
English (secondary)**. Tone: sharp, a little playful, never a wall of text.

## This is a simulation — hard rules (do not break these)

These are not suggestions. Every stage is theatre built from animation and copy. If a
step would only "work" by doing the real thing, stop and build the staged version
instead.

1. **No real malware, exploit code, or working attack tooling** anywhere in the repo —
   not in demos, not in comments, not "for realism." Effects are CSS/JS animation.
2. **Fictional brands only.** Invent bank/app/company names and logos (e.g. "Namuna
   Bank", "Qalqon Pay"). Never imitate a real bank, company, government site, or their
   logos/domains — not even "as a placeholder."
3. **No real data collection, ever.** Any input the visitor types in a demo stays in a
   JS variable in their own browser. Never send it anywhere, never persist it
   server-side, never log it, never put typed content into analytics. There is no
   backend that receives form data.
4. **No credential or payment capture**, even fake-looking. Demo "login" forms post
   nowhere and are visibly part of the lesson.
5. **Every stage ends on recognition + defense.** The infect animation is the hook; the
   explanation and the "clean" are the payload. A stage that only scares is unfinished.
6. **The spyware stage is a transparency demo, not surveillance.** It may reflect only
   actions the visitor just took *inside this page* (e.g. "you clicked here, you paused
   there"), shown immediately, then wiped. No camera, no mic, no keylogging of other
   sites, nothing transmitted or stored.
7. **Ransomware never encrypts anything real.** The "lock" is a fake overlay + scrambled
   display text with a countdown. Nothing on the visitor's device is touched.

If any requested change conflicts with rules 1–7, say so and propose the staged
equivalent instead of implementing it.

## Experience shape

- One long vertical scroll, calm and elegant at the top so the first "infection" lands
  hard. Avoid the clichéd green-on-black "hacker" look.
- Two acts: **Act I — Infection** (threats 1→9 appear and are explained) and **Act II —
  Cleanup** (the defenses visibly repair the page). A short intro and outro bookend them.
- A persistent **threat tracker** down the side showing which of the nine have appeared.
- **Presenter mode** for the live talk: number keys 1–9 jump to a threat, `R` resets the
  page to pristine, `?` shows the shortcut list.

## Architecture

- Keep it **one self-contained site**. Preferred stack: **Vite + TypeScript**, vanilla
  DOM (no framework needed). Scroll: **GSAP ScrollTrigger + Lenis**. Pop-up physics:
  **Matter.js**. Keep everything else hand-written.
- Each threat is one **stage module** with a shared contract — see the `infection-stage`
  skill. A central `stages[]` array drives the scroll, the tracker, and presenter jumps.
- All copy lives in one bilingual strings file (`src/content/strings.ts`), keyed by
  stage id, with `uz` and `en` for every string. No hard-coded user-facing text in
  components. See the `uz-copy` skill.
- `prefers-reduced-motion`: every stage must have a calm fallback that still teaches the
  lesson (show the end state, skip the violent motion). Audio is off by default and
  captioned.

## Content model (per threat)

Each stage carries: `id`, threat name (uz/en), a one-line "what it is", the **red flag**
(how you spot it), the **defense** (what you do), one true-to-life *recognition* example
using fictional brands, and an optional real historical case stated at a factual level
(e.g. WannaCry for the worm). Attack how-to is never part of the content. The safe
per-threat framing lives in `docs/THREATS.md` — treat that file as the source of truth
for what each stage may say.

## Commands

```bash
npm install
npm run dev        # local dev server
npm run build      # production build to dist/
npm run preview    # serve the built site
```

## Definition of done (per stage)

- Infect beat, explanation, and defense beat all present and in both languages.
- Reduced-motion fallback works and still conveys recognition + defense.
- Keyboard reachable; presenter jump lands on it; `R` resets it cleanly.
- No network request carries anything the visitor typed (verify with the `verify` skill).
- Only fictional brands appear. No real logos, domains, or org names.
