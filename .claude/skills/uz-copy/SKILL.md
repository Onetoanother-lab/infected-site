---
description: Write and review the site's bilingual Uzbek + English copy. Use when filling src/content/strings.ts, writing any user-facing text, or checking that the two languages stay in sync and use correct security terms.
---

# Bilingual copy (Uzbek primary, English secondary)

All user-facing text lives in `src/content/strings.ts`, keyed by stage id, with a `uz`
and an `en` for every string. Components read from there — never hard-code visible text.

## Rules

- **Every key has both `uz` and `en`.** Never ship one without the other. If you add a
  string, add both languages in the same edit.
- **Uzbek leads.** Write the Uzbek first and make it natural for a student audience, then
  the English. Don't produce stiff word-for-word translations in either direction — match
  meaning and tone.
- **Latin Uzbek script** (oʻzbek lotin alifbosi), with correct `oʻ` and `gʻ` (use the
  proper characters, not plain `o'`/`g'` where the real glyphs belong). Keep it consistent
  across the whole site.
- **Tone:** short sentences, direct, a little playful on the hooks, plain on the lessons.
  No jargon without a one-word gloss. These are students, not a SOC team.
- **Keep the three beats parallel** in both languages: hook line, red-flag line, defense
  line. Same structure for all nine threats so it reads as a set.
- **Keep lengths close.** The layout shows both languages, so avoid one being three times
  the other. Trim, don't pad.

## Term glossary (keep these consistent)

| Concept            | Uzbek (use)                        | English          |
| ------------------ | ---------------------------------- | ---------------- |
| Phishing           | fishing                            | phishing         |
| Pharming           | farming (DNS orqali yoʻnaltirish)  | pharming         |
| Vishing            | ovozli fishing                     | vishing          |
| Trojan             | troyan                             | trojan           |
| Worm               | qurt                               | worm             |
| Spyware            | josuslik dasturi                   | spyware          |
| Rootkit            | rutkit                             | rootkit          |
| Adware             | reklama dasturi                    | adware           |
| Ransomware         | toʻlov talab qiluvchi dastur       | ransomware       |
| Red flag / warning | ogohlantiruvchi belgi              | red flag         |
| Defense / safety   | himoya / xavfsizlik choralari      | defense          |
| Backup             | zaxira nusxa                       | backup           |
| Two-factor (2FA)   | ikki bosqichli tasdiqlash          | 2FA              |
| One-time code      | bir martalik kod                   | one-time code    |
| Update / patch     | yangilash                          | update / patch   |

Keep the English security terms as loanwords where that's what people actually say
(phishing, rootkit), and gloss them once in Uzbek on first use.

## Checklist before marking copy done

- Both languages present for every key in play.
- Security terms match the glossary.
- Red-flag line and defense line read as actions, not warnings in the abstract.
- No real brand, bank, person, or domain named anywhere in the copy.
