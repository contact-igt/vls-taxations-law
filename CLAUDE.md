# CLAUDE.md — Taxation Laws & Practice landing page

Persistent rules for this project. Details live in `/references`; this file is the index.

## Source hierarchy (do not mix authority)
1. **Content**: `references/CONTENT_LOCK.md` — sole authority for curriculum claims. Never
   advertise a topic not listed there (see its exclusion list). No invented dates/fees/stats.
2. **Layout/UI/typography**: `references/DESIGN_SYSTEM.md` + `references/REFERENCE_TOKENS.json`
   — reproduce the aiforadvocates.vlslawacademy.com system; do not redesign it.
3. **Brand/photography**: `references/ASSET_MANIFEST.md` — use only these local, real VLS
   assets. No stock photography, no AI-generated people.

## Design tokens (short version — see REFERENCE_TOKENS.json for exact values)
Headings: Georgia/Times New Roman serif, weight 500. Body/UI: Inter. Accent red
`rgb(165,31,36)`. Ink `rgb(17,19,21)`. Cream base `rgb(245,241,233)`. Sharp corners
everywhere (0 radius) — no rounded pills, no glassmorphism, no gradient text.

## Rules
- Minimal code: native HTML/CSS before dependencies, no speculative abstractions, no
  component library beyond what Tailwind + native elements already cover.
- Motion: subtle only, respect `prefers-reduced-motion`, quick hover feedback, no scroll
  gimmicks. Reference fidelity overrides creative impulses from any design skill.
- Accessibility is never traded away for minimal code: semantic landmarks, labeled form
  fields, keyboard-operable accordion, visible focus states, alt text, one H1.
- No fake data: no invented batch dates, fees, testimonials, or faculty statistics.
- Do not re-scrape the live reference sites repeatedly — read the `/references` files instead;
  only re-open a live source for a genuine discrepancy or the final M4 check.
- No git operations in this session (user chose "no git — just build the files").

## Verification
`scripts/verify.sh` is the coded done-condition gate (build/typecheck/lint + required content
strings + forbidden-claim scan + asset existence). Run before declaring a module done.

## Status
See `BUILD_REPORT.md` for the live module-by-module build status.
