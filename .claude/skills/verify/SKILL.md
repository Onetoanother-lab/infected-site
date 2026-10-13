---
description: Build, run, and safety-check the site before a commit or hand-off. Verifies it compiles and runs, that no demo sends typed input anywhere, that no real brands slipped in, and that reduced-motion and keyboard paths work.
---

# Verify the site

Run this before each commit (except docs-only changes) and before hand-off. It confirms
the site works *and* that the hard rules in `CLAUDE.md` still hold. Report what you
checked and anything that failed; don't "fix" a failure by weakening a rule.

## 1. It builds and runs

```bash
npm run build
```

- Build succeeds with no type errors (the typescript-lsp plugin surfaces these as you go).
- Start the dev server and load the page; the console has no errors on load or on a full
  scroll through all nine stages.

## 2. No real data leaves the page (most important)

The demos must keep every typed value in the browser. Check the source:

```bash
grep -rnE "fetch\(|XMLHttpRequest|sendBeacon|axios|\.post\(|action=" src/
```

- Any hit must be unrelated to demo input (e.g. loading a local asset). No request body,
  query string, or form `action` may carry something the visitor typed into a demo.
- With the site running and Chrome connected, open the Network panel, type into the
  phishing/pharming/spyware demos, and confirm **no request** fires carrying that text.
- `grep -rnE "localStorage|sessionStorage|indexedDB" src/` — demo input must not be
  persisted either. (Presenter/UI preferences are fine.)

## 3. No real brands or targets

```bash
grep -rniE "sberbank|visa|mastercard|google|gmail|telegram|instagram|facebook|apple|microsoft|\.uz|\.com|\.ru" src/
```

- Review each hit. Logos, bank names, app names, and domains must be invented. Real
  loadword *terms* (e.g. "phishing") are fine; real *brands, orgs, and domains* are not.
- The one allowed real reference is a historical case stated factually in copy (e.g.
  WannaCry for the worm) — and only as described in `docs/THREATS.md`.

## 4. Accessibility & presenter

- With OS "reduce motion" on, every stage still shows its end state and teaches the red
  flag + defense (no stage goes blank or relies on the violent animation).
- Tab through the page: every interactive demo element is reachable and operable by
  keyboard; focus is visible.
- Any audio is off by default and has captions.
- Presenter keys work: 1–9 jump to each threat, `R` resets the page to pristine (run a
  couple of stages, hit `R`, confirm no residue), `?` shows the shortcut list.

## 5. Stage completeness

For each of the nine stages: infect, explain (uz + en), and defend beats all present;
`reset()` fully undoes `infect()`.

## Report

List each section 1–5 as pass/fail with a one-line note. For any fail, say what's wrong
and propose the fix that keeps the hard rules intact.
