# BUILD_REPORT — Taxation Laws & Practice landing page

## M5A — ABOVE-THE-FOLD CONVERSION
Status: **PASS**
Course details updated: Yes — 28 August 2026 (Friday), 6:00 PM–9:00 PM, 3 Hours, Online,
Bilingual (Tamil & English), ₹499, now live in Hero, header CTA, `EarlyCtaBand`, FAQ, and
`CONTENT_LOCK.md`. All "Announcing soon"/"To be announced" placeholders removed and now
verifier-enforced (`scripts/verify.sh` fails if either reappears).
Early VLS photography: Yes — new `EarlyTrust` section (2 real classroom photos) placed
immediately after the hero/lead form.
Early faculty trust: Yes — new compact `EarlyFacultyTrust` strip (photo + name +
qualification + one verified credibility line) placed right after `EarlyTrust`.
Early testimonial trust: Yes — new `EarlyTestimonial` section (2 genuine VLS testimonial
images, labeled neutrally "VLS Student Feedback") placed before Practice Gap, well inside the
first 30% of the page.
Desktop checked: 1440px, screenshotted hero → CoreVisual (covers >35% of the page).
Mobile checked: 390px, screenshotted all of screens 1–4 (hero, registration form, early trust
photos, faculty + testimonial proof) — testimonial proof confirmed visible by screen 4.
Build: PASS
Typecheck: PASS
Lint: PASS
Verify: PASS (`scripts/verify.sh`, including 2 new required-content checks for "28 August 2026"
/ "₹499" and 2 new forbidden-claim checks for the retired placeholders)

## M5A.1 — TOP-PAGE CLEANUP

Faculty duplicate removed: Yes — deleted `EarlyFacultyTrust.tsx` (no longer referenced anywhere).
Faculty moved upward: Yes — the existing full `Faculty` section now renders as Division 3,
directly after `EarlyTrust`, instead of far down the page.
Testimonials duplicate removed: Yes — deleted `EarlyTestimonial.tsx` (no longer referenced
anywhere).
Testimonials moved upward: Yes — the existing full `Testimonials` section (all 3 genuine VLS
images, unchanged) now renders as Division 4, directly after `Faculty`. `scripts/verify.sh`
now structurally enforces both — it fails if `src/app/page.tsx` renders `<Faculty />` or
`<Testimonials />` any number of times other than exactly once.
Division 2 photo alignment: Fixed — `EarlyTrust` now uses a single `grid-cols-1 sm:grid-cols-2`
row of exactly 2 photos (Dr. Sivakumar teaching + students taking notes), both at a shared
`aspect-[4/3]`, `object-cover`, 0-radius, consistent gap, aligned top and bottom on desktop;
stacks vertically full-width on mobile. Replaces the previous 2×2 collage-style crop.
Desktop checked: 1440px — verified full section order (Hero → EarlyTrust → Faculty →
Testimonials → Practice Gap → CoreVisual → EarlyCtaBand → …) via a complete DOM section map
(every `<section>`'s position and heading) plus matching real screenshots; confirmed Faculty
and Testimonials each appear exactly once in the whole page.
Tablet checked: 768px — zero horizontal overflow; the two Division 2 photos remain aligned and
balanced, no awkward half-column.
Mobile checked: 390px — zero horizontal overflow; photos stack cleanly full-width with
consistent gap; Faculty and Testimonials render at full size, once each, in the correct order.
Build: PASS
Typecheck: PASS
Lint: PASS
Verify: PASS (`scripts/verify.sh`, including 2 new structural checks: Faculty and Testimonials
each render exactly once in `page.tsx`)


Verification-pass report (2026-08-19). This is a re-verification against the completed site —
no UI was rebuilt; two documentation gaps from the prior report were closed (brochure source,
honest visual evidence) and one asset optimization from the prior session is re-confirmed.

## STATUS
**PASS**

## MODEL
Claude Sonnet 5

## EFFORT
HIGH

## BROCHURE SOURCE VERIFIED: YES
`references/Updated-Vls-Brochure.pdf` was not in the repo when this pass started. Searched the
accessible filesystem and found it at `~/Downloads/Updated Vls Brochure (2).pdf` (byte-identical
to a second copy also in Downloads) — copied it into `references/` and read it directly.
Located Module 10 (pages 7–8) and diffed every curriculum claim on the production page against
it line by line; full diff recorded in `references/CONTENT_LOCK.md`. Result: **no unsupported
claims**. Three trivial wording differences found (a missing "st" ordinal and a
singular/plural noun in the brochure itself, plus two topic chips that restate the unit's own
title rather than being separately itemized in the brochure body) — all are corrections toward
accuracy or faithful title-derived summaries, not additions beyond brochure scope, so no UI
change was made.

## SKILLS INSTALLED/APPLIED
| Skill | Installed | Available | Applied | Evidence |
|---|---|---|---|---|
| Ponytail | No | No | Manually (principles) | Not in plugin catalog (`SearchPlugins` → 0 results); no `claude` CLI on PATH to install from GitHub non-interactively |
| Emil Kowalski Skills | No | No | Manually (principles) | Same as above |
| Taste Skill | No | No | Manually (principles) | Same as above |
| Anthropic Frontend Design | No (files present, not enabled) | No | Manually (VLS fidelity overrode its generic guidance, as instructed) | Files exist on disk in the official marketplace mirror (`~/.claude/plugins/marketplaces/claude-plugins-official/plugins/frontend-design`), but `ListPlugins` returns empty and `Skill({skill:"frontend-design"})` errors `Unknown skill: frontend-design` — confirmed not invokable in this session |

No formal installation was possible from this session (no interactive plugin UI, no `claude`
CLI on PATH). All four skills' stated principles (minimal code, restrained/purposeful motion,
anti-generic-template taste, reference fidelity over invention) were applied by hand throughout
the original build and this verification pass.

## BUILD
PASS

## TYPECHECK
PASS

## LINT
PASS (0 errors, 0 warnings)

## VERIFY.SH
PASS — all content/forbidden-claim/asset/structure checks green (see script output; expanded
forbidden-term list checked in this pass: ITR filing, GST return filing, GST registration,
Heads of Income, TDS, TCS, Input Tax Credit, bookkeeping, accounting, tax saving, transfer
pricing, international taxation, guaranteed career/earning/income, become a tax expert —
**all 16 clean, zero hits**).

## VISUAL SCORE
**40/40** — re-scored this pass against real screenshots (not DOM/text inspection); see
`references/VISUAL_AUDIT.md` for the full breakdown and honest evidence-capture method.

## VISUAL EVIDENCE PATHS
No file-export path was available in this session to save screenshot bytes to disk, so no PNG
files exist under `references/`. Instead, `references/VISUAL_AUDIT.md` records the exact
reproducible capture method (viewport sizes + `marginTop` offsets) used to get real
scroll-position-0 pixel screenshots of every required section at 1440px and 390px, avoiding a
scroll-capture bug that made this session's browser pane unreliable after an actual scroll.

## RESPONSIVE CHECK
PASS — zero horizontal overflow re-confirmed at 1440, 1280, 1024, 768, 430, 390, 360
(`scrollWidth === clientWidth` at every width, checked fresh this pass).

## ASSET CHECK
PASS — all 9 local assets resolve; zero remote-hotlinked `<img>`/`Image` sources in `src/`
(only legitimate `href` navigation links to vlslawacademy.com in the footer, not image sources).

## FACULTY CLAIM CHECK
Dr. Sivakumar Sivaprakasam, B.Sc./M.L./Ph.D.(Law), "Lawyer, Chennai High Court", and all
numeric training claims (250+ TN Judicial Services aspirants, 1,200+ TN Civil Services
candidates, mentoring since 2003) match the approved source
(`aiforadvocates.vlslawacademy.com`, VLS's own sibling page) verbatim. The Taxation brochure
does not cover faculty at all, so there is no brochure conflict to check against. No
taxation-specific credentials are claimed anywhere on the page.

## FORM BACKEND
`PENDING INTEGRATION` — `src/lib/submitWaitlist.ts` remains a clearly-labeled placeholder
adapter (validates client-side, resolves locally, delivers nothing). Re-tested this pass:
submitting the hero form empty correctly shows all four field-level error messages.

## REMAINING HUMAN DECISIONS
- Real batch date, mode, language and fee (currently "announcing soon" placeholders, as brochure has none)
- A real lead-capture backend/CRM/WhatsApp-automation endpoint for the waitlist form
- Production domain, to replace the placeholder `taxation.vlslawacademy.com` used for canonical/OG URLs
- Terms and Privacy Policy destinations (footer links are currently `#` placeholders — no such pages exist yet)
- Whether to formally install the Ponytail / Emil Kowalski / Taste / Frontend-Design skills for future sessions (requires interactive plugin installation outside this harness)
