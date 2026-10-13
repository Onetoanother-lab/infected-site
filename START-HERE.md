# Start here

This folder is a starter kit for building the "site that gets infected" cyber-awareness
experience with Claude Code. Drop its contents at the root of a new empty project folder.

## What's in it

```
CLAUDE.md                     Project memory — vision, architecture, and the hard rules.
                              Claude Code loads this automatically every session.
PROMPT.md                     Setup steps, the kickoff prompt to paste, and phase prompts.
docs/THREATS.md               The safe, recognition-and-defense framing for all 9 threats.
                              Source of truth for what each stage may say.
.claude/skills/
  infection-stage/SKILL.md    How to build one threat stage (the 3-beat contract).
  uz-copy/SKILL.md            Bilingual Uzbek+English copy rules and a term glossary.
  verify/SKILL.md             Build/run + safety checks. Replaces the bundled /verify and
                              runs before each commit.
.claude/agents/
  design-reviewer.md          Read-only reviewer for visual polish + the safety rules.
```

Everything under `.claude/` loads automatically when you start Claude Code in this folder
— the skills trigger when relevant and also as `/infection-stage`, `/uz-copy`, `/verify`.

## Steps

1. Put these files in your project folder (keep the `.claude/` folder — it's hidden).
2. Open a terminal there and run the setup in `PROMPT.md` §1 (two plugins, Chrome).
3. Start Claude Code and paste the kickoff prompt from `PROMPT.md` §2.
4. Work through the phases in `PROMPT.md` §3, reviewing after each.

## The one thing to remember

The site is a piece of theatre about staying safe online. Nothing in it is a real attack
or collects real data — fictional brands, in-browser-only demos, animation instead of
exploits. `CLAUDE.md` spells out the rules; if a change would break them, Claude will flag
it and offer the staged version instead.
