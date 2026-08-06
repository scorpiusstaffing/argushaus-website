# Argushaus — Design Directive

**Source:** multi-agent design conclave (Art Director / UX / Editorial / Data-Viz / Synthesizer)
**Date:** 2026-07-15
**Owner:** Jonathan de Klerk
**Status:** Applied to `index.html`, `styles.css`, `script.js` on the same day.

This document is the reference for the current visual and IA direction. If future
changes drift from these principles, revisit before shipping.

---

## Brand target

Editorial premium restraint. Reference points: Aesop, Kinfolk, Kirkland & Ellis,
private-equity firms, Blackstone, Bottega Veneta. Explicitly NOT: Canva,
generic-tech, splashy-startup, illustrations, stock photos, gradients-as-decoration,
dashboard-tier data visualizations, animated theatre.

## Verdict at start of conclave

5.5-6.5/10. Instincts correct (cream, mono marginalia, restraint). Execution
mistook decoration for discipline. Every accent element was doing the OPPOSITE
of what a premium brand does, which is remove things.

---

## Consensus issues (flagged by 2+ reviewers)

1. **Red is confetti, not scarce.** ~12 uses across the page. Kills the premium
   signal. Fix: reduce to exactly 3 uses — wordmark dot, §01 terminal dot, counter.
2. **Pool card was SaaS dashboard UI.** Card frame + LIVE badge + per-tier
   progress bars + aggregate bar = double-encoded, dashboard-tier. Fix: strip
   the card frame, present as typographic table.
3. **Pulsing LIVE mandate cards read as crypto-exchange placeholder** and
   contradicted the "confidential" promise. Fix: replace with retrospective
   "Recent placements" list.
4. **Timeline was decorative, not proof.** Day-intervals artificially even —
   day 7 sat at 50% of the line instead of the true 25% (7 of 28). Fix:
   scale positions proportionally to real days.
5. **No editorial type scale.** Everything was Switzer 400/500 at ad-hoc sizes.
   Fix: define one modular scale (1.333 ratio) and rebuild all sizes off it.
6. **Pillars leaked brand tone** ("0 RETAINER" with `;)` wink next to fee/no-cure).
   Fix: 2×2 grid split by category (Speed / Commercials), no wink, no red bookends.

## Key divergences (and how they were resolved)

- **Cities section.** Art Director + Editorial called it the strongest moment;
  UX + Data-Viz called it vanity. **Resolution:** keep the typography, add real
  numbers per city (firms · seniors) so it earns its space.
- **Pool card:** simplify vs. delete. **Resolution:** delete the card frame,
  keep the data as pure typography.
- **How-we-work section:** merge or keep. **Resolution:** merge — timeline
  moves into §02 right after pillars. Standalone §04 deleted. Site goes 7 → 6
  sections.

---

## Section order (new)

1. Hero
2. About (moved up from §06 — trust before offer)
3. For companies (with pool typography + pillars + inline timeline)
4. For talent (with recent placements)
5. Cities (with numbers)
6. Contact

## Type scale (Switzer / Fraunces / JetBrains Mono)

Ratio 1.333, tokenised in CSS variables:

| Token             | Size      | Where |
|-------------------|-----------|-------|
| `--fs-mono`       | 0.72rem   | Labels, chips, marginalia |
| `--fs-body-sm`    | 0.9rem    | Captions, footnotes |
| `--fs-body`       | 1.125rem  | Standard body |
| `--fs-sub`        | 1.5rem    | Sub-headings |
| `--fs-display-sm` | 2.5rem    | Small display headings |
| `--fs-display`    | 4rem      | Standard display h2 |
| `--fs-hero`       | 8rem      | Hero wordmark |

`.display` uses **Fraunces 300 italic-optional** for editorial contrast against
the Switzer body. Everything else stays Switzer / JetBrains Mono.

## Red-diet rules (permanent)

Red (`--red: #C8362A`) may only appear in exactly three places:

1. `.brand-dot` — the dot in the wordmark "Argushaus."
2. `.hero .red-block` — the square dot in the §01 hero wordmark
3. `#counter-current` — the current section number in the fixed counter

All other places retint to `--ink` or `--muted`. If a future feature wants to
add a red accent, first demonstrate why one of the above three should give up
its exclusivity.

## What earned its keep

- Wordmark (huge Switzer 700, red-square dot).
- Fixed corner marginalia (Argushaus. / Est. 2026 / contact@ / Scorpius group).
- Mono chapter labels (`02 / For consultancies` — but now left-aligned, no red slash).
- Section counter (bottom-right, red current-number).
- Cities typographic treatment (huge left-aligned type stack).
- Restrained cream gradient background.

## What got deleted

- Pool card frame + LIVE TALENT POOL badge + aggregate segmented bar + per-tier
  progress bars + colored tier dots.
- Pulsing red LIVE indicators on mandate cards + `@keyframes pulse`.
- Mandate "Enquire" arrows and mailto subject lines.
- Fact-list mono bullets (superseded by pillars grid; then pillars restructured 2×2).
- Terminal red dots after §02–§07 display h2s (kept only on §01 hero).
- `;)` wink glyph in pillars.
- Red slash separator in section labels (`.label-slash` retinted to muted).
- Red day labels on timeline (`.tl-day` retinted to muted).
- Red timeline endpoints (all dots ink-colored now).
- "How we work" as a standalone §04 (timeline folded into §02).

## Action list executed

1. ✅ Red-diet — 3 exceptions only, everywhere else retinted.
2. ✅ Pool card deleted, replaced with typographic table (huge 10,162 + DE/NL stat
   blocks + 3-column tier table with hairline dividers).
3. ✅ Mandates replaced with "Recent placements" retrospective list.
4. ✅ Timeline folded into §02, rescaled with real proportions
   (`left: calc(day/28 * 100%)`).
5. ✅ Fraunces loaded for `.display` only.
6. ✅ Type scale rebuilt on 1.333 ratio.
7. ✅ Cities enriched with `city — N firms · N seniors` mono labels.
8. ✅ About moved to §02 with founder name + placements-to-date + guarantee.
9. ✅ Labels left-aligned.
10. ✅ Pillars restructured 2×2 (Speed row + Commercials row), no wink, no red.

## What the user does when re-opening this file

Read the "Brand target" section and the "Red-diet rules." If a proposed change
violates either, push back. If a keeper is at risk, reference "What earned its
keep."

---

## Full raw synthesis from the conclave

**LEAD PRINCIPAL DESIGNER — Synthesis**

### Consensus issues (2+ reviewers)

1. Red accent is confetti, not scarce. All 4 reviewers flag this. ~12 uses
   across the page. Kills the premium signal.
2. The `.pool` card is over-engineered SaaS UI. Art Director + Data-Viz +
   Editorial all flag the per-tier progress bars as redundant / dashboard-tier.
   Data-Viz notes they double-encode the aggregate bar.
3. Pulsing LIVE mandate cards read as crypto exchange / placeholder. Art
   Director calls them animated theatre; UX says they actively destroy trust
   and contradict the "confidential" promise one paragraph above.
4. Timeline is decorative, not proof. Data-Viz (falsified spacing, day 7 at
   50%) + UX (wrong section position) + Art Director (endpoint reds). It's
   not doing its job.
5. §05 Cities stack is beautiful but empty. UX + Data-Viz both flag it as
   vanity typography carrying no data. (Art Director + Editorial call it the
   site's best moment — see divergence.)
6. No editorial type contrast / no scale system. Art Director wants a serif
   for `.display`; Editorial wants a real 5-step modular scale. Same root
   problem: everything is Switzer 400/500 in ad-hoc sizes.
7. Pillars leak brand tone. Data-Viz + Editorial: the `;)` wink, mixed
   categories on one rail, red bookends. Blackstone doesn't wink.

### Key divergences

- **The Cities section.** Art Director + Editorial say it's the ONE moment
  that reads editorial and should be the template for the rest of the site.
  UX + Data-Viz say it's decorative filler that a hiring lead can't use.
  **Resolution:** both are right, and the fix reconciles them — keep the
  typographic treatment, but anchor each line to a real number.
- **Kill the pool card vs. simplify it.** Art Director wants it deleted
  entirely (set 10,162 on page background, plain type table). Data-Viz wants
  to keep it but drop redundant bars and surface DE/NL. **Resolution:** Art
  Director wins. The card frame is the SaaS tell. Remove it.
- **Where "How we work" belongs.** UX says merge into §02. Editorial says
  break the 100vh lock. **Resolution:** UX wins. Fold the timeline into §02
  immediately after pillars; delete §04 as a standalone screen. Site goes
  7 → 6 sections.

### Verdict

Not at the user's bar. Currently 5.5–6.5/10. Not Kirkland/Aesop tier. The
instincts are correct (cream, mono marginalia, restrained CTAs, Switzer 500
display). The execution mistakes decoration for discipline — every accent
element is doing the opposite of what a premium brand does, which is remove
things.

Keepers: wordmark, mono chapter marker system (once fixed), cities typographic
treatment (with numbers added), the Switzer/JetBrains pair, section counter
scaffolding.

### Action list (in order)

1. Red diet. Reduce red to exactly three uses: wordmark dot, `.display`
   terminal dot on §01 only, `.counter-current`. Retint everywhere else to
   `var(--ink)` or `var(--muted)`.
2. Delete the pool card, replace with a typographic table. Remove `.pool`
   card chrome, LIVE TALENT POOL badge, aggregate bar, all per-tier progress
   bars. Set 10,162 at `clamp(6rem, 14vw, 11rem)` Switzer 500 on the page
   background. Two mono stat blocks flanking: `9,247 DE · 915 NL`. Below,
   a 3-column type table: tier name · count · %. 1px `--line` between rows.
3. Replace mandates grid with "Recent placements" (retrospective, anonymised).
   `Practice Lead / GenAI / Munich — placed in 22 days · June 2026`.
4. Fold timeline into §02, kill §04. Rescale to real days:
   `left: calc(day/28 * 100%)`. Day 7 lands at 25% — that IS the proof.
   Update counter total from 07 to 06.
5. Load Fraunces (or GT Sectra) for `.display` only. `font-family: 'Fraunces',
   serif; font-weight: 300; letter-spacing: -0.02em;`. Largest tier-lift on
   the page.
6. Rebuild the type scale on one ratio (1.333). Tokens defined above.
7. Add numbers to the cities stack. `MÜNCHEN — 47 firms · 892 seniors`
   right-aligned mono, replacing the "DE / SOUTH" region label.
8. Add real trust content to §06 and move it above §03. Founder name,
   placements-to-date, explicit 90-day replacement guarantee, "25% of
   first-year base salary" (clarify the base). Delete "Founder led. Veterans."
   as it currently reads.
9. Commit to left-aligned labels. `.label { align-self: flex-start;
   text-align: left; margin-bottom: 1.75rem; }`.
10. Fix pillars — 2×2 with row labels, no wink. Row 1 "Speed" (7d / 28d).
    Row 2 "Commercials" (25% / 0 retainer). Delete `;)`. Delete red bookends.
    Kill border-right between cells; use a hairline row divider only.

### Do this first

Ship the red diet (Action 1) and delete the pool card (Action 2) in a single
pass, in that order. Those two changes alone flip the site from "founder who
cares about design" to "brand with a house" — because they are the two moves
that *remove* the SaaS-dashboard tells the user keeps flinching at.
Everything after that is refinement; those two are the pivot.
