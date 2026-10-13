# The nine threats — safe framing (source of truth for stage content)

Every stage says three things: **what it is** (plain language), **the red flag** (how an
ordinary person spots it), and **the defense** (what they do about it). The "demo" line
describes the *staged animation* for that stage — a visual metaphor, never a real attack.

Keep all of this at the level below. Do **not** add operational attack detail (how to
build the fake, exact social-engineering wording, working code). This is recognition and
protection content. Use fictional brands throughout (e.g. Namuna Bank, Qalqon Pay).

---

## 1. Phishing (Fishing)
- **What it is:** fake messages — email, SMS, DM — that impersonate someone you trust to
  get you to click a link or hand over information.
- **Red flag:** unexpected message + urgency ("act now or lose access") + a link that
  wants you to log in.
- **Defense:** don't click links in messages; reach the site yourself by typing the real
  address or using your own bookmark; check the sender and the real domain; turn on 2FA.
- **Demo:** a "real or fake?" sorting game using invented messages. Guessing wrong
  triggers a harmless animated reveal. Nothing the visitor types is captured or sent.

## 2. Pharming
- **What it is:** even when you type the correct address, tampering (e.g. a poisoned DNS
  or hosts entry) can silently send you to a look-alike copy.
- **Red flag:** you did everything right and still landed somewhere subtly wrong —
  certificate warnings, a URL that's *almost* right, a page that feels off.
- **Defense:** heed HTTPS/certificate warnings, keep your devices and router clean and
  updated, prefer networks you trust.
- **Demo:** an animated "address book" lookup for a fictional bank where the destination
  card visibly gets swapped, landing on a clone. Contrast with phishing: no click needed.

## 3. Vishing (voice phishing)
- **What it is:** the phone-call version — a caller pretends to be your bank or "support"
  and pressures you into revealing codes or installing something.
- **Red flag:** an *inbound* call that asks for a one-time code, password, or remote
  access; urgency and secrecy ("don't tell anyone, stay on the line").
- **Defense:** hang up and call the number on the back of your card or the official site
  yourself. A real bank never needs your one-time code. Slow down; urgency is the tell.
- **Demo:** a short dramatization that surfaces the red flags on screen as they occur and
  then shows the correct response (hang up → call back officially). Keep it at the level
  of recognizing the pattern and responding safely — not a reusable script.

## 4. Trojan
- **What it is:** malware hidden inside something that looks useful or desirable.
- **Red flag:** "free premium" / cracked apps, unexpected attachments, installers from
  random links.
- **Defense:** install only from official stores and sites; be wary of "too good to be
  true"; keep protection on; grant least privilege.
- **Demo:** drag an "X-ray lens" over a fictional "free app" icon to reveal a hidden
  payload icon inside — purely illustrative.

## 5. Worm
- **What it is:** malware that copies itself across a network on its own, without anyone
  clicking.
- **Red flag:** rapid spread; many machines affected at once; unpatched systems.
- **Defense:** patch promptly, segment networks, keep backups.
- **Demo:** an animated network of nodes; releasing the worm spreads it, and a "% patched"
  slider shows patched nodes resisting. Historical case (factual, allowed): **WannaCry
  (2017)** spread to unpatched systems despite a fix existing months earlier.

## 6. Spyware
- **What it is:** software that secretly watches what you do and reports it back.
- **Red flag:** battery or data use spikes, permissions you don't remember granting, apps
  you didn't install.
- **Defense:** review app permissions, install from trusted sources, use reputable
  security tools, keep the OS updated.
- **Demo (transparency, not surveillance):** reflect only what the visitor just did
  *inside this page* — e.g. "you hovered here, you paused on this word" — shown
  immediately and then wiped, to make the idea concrete. No camera, no mic, no keylogging
  of anything outside the page, nothing transmitted or stored.

## 7. Rootkit
- **What it is:** malware that buries itself deep in the system and lies to the tools that
  look for it, so it stays hidden.
- **Red flag:** numbers that don't add up; something clearly wrong that scans can't see;
  detection often needs a trusted tool from *outside* the system.
- **Defense:** secure boot and integrity checks, scan from known-clean media, and when in
  doubt rebuild from a trusted image.
- **Demo:** a fake task manager whose totals don't match the listed processes; an "outside
  scan" overlay then reveals the hidden process the inside view denied.

## 8. Adware
- **What it is:** software that floods you with ads, sometimes bundling worse things.
- **Red flag:** pop-up storms, fake "close" buttons that open more, a browser that changed
  on its own.
- **Defense:** use an ad blocker, remove unknown extensions and apps, reset the browser.
- **Demo:** playful pop-ups that pile up with physics; a "cleanup" action sweeps them away.

## 9. Ransomware
- **What it is:** malware that locks or encrypts your files and demands payment to release
  them.
- **Red flag:** files suddenly inaccessible, a ransom note, a countdown timer.
- **Defense:** keep offline, tested backups (3-2-1 rule), patch, and don't pay — paying
  funds the next attack and rarely restores everything. Report it.
- **Demo:** the page text scrambles into a **fake** locked state with a ransom-style
  overlay and countdown; the "clean" rewards an earlier "did you back up?" choice by
  restoring instantly. Nothing on the visitor's device is ever touched or encrypted.

---

## Intro & outro

- **Intro:** a calm, trustworthy-looking page — so the first infection is a jolt. One line
  on what's coming: "this page is about to get attacked nine ways — watch how, and how to
  stop each one."
- **Outro:** the page restored, the tracker all-green, and a short recap: the single
  habit that blunts most of these is *slow down and verify* — plus backups, updates, and
  2FA. Offer the shortcut list for anyone presenting.
