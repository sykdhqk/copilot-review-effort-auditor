# Copilot review effort audit

## Verdict

**blocked** — R-01 and R-02 use an undefined requestor-level `Default`, while R-06 and R-07 have unknown higher-precedence values. The three resolved cases still support a bounded verification plan.

## Resolution table

| Case | Effective effort | Winning step | Exposure | Confidence | Owner action |
|---|---|---|---|---|---|
| R-01 | unknown | requestor `Default` is undefined before repository `Default` | indeterminate | unknown | Determine whether requestor `Default` falls through. |
| R-02 | unknown | requestor `Default` is undefined before repository Lite | indeterminate; repository Lite is conditionally protective | unknown | Determine requestor behavior; preserve repository Lite if routine feedback is intended. |
| R-03 | Balanced | explicit request | protected-higher-precedence | confirmed | No administrator edit is needed for this run. |
| R-04 | Lite | previous effort on the same PR | protected-higher-precedence | confirmed | Verify the overview remains Lite on re-review. |
| R-05 | Balanced | requestor explicit Balanced | protected-higher-precedence | confirmed | Do not claim repository Lite controls this run. |
| R-06 | unknown | requestor setting is unknown before repository Default | indeterminate | unknown | Collect requestor or observed run effort. |
| R-07 | unknown | requestor and repository settings are unknown | indeterminate | unknown | Collect both values or observed run effort. |

## Portfolio ranges

- Known Lite: 40 reviews × USD 0.05–1 = **USD 2–40/month**.
- Known Balanced: 80 reviews × USD 0.25–5 = **USD 20–400/month**.
- Confirmed resolved population: **USD 22–440/month** for 120 reviews.
- Unresolved: 160 reviews. A labeled scenario envelope adds USD 8–160 if all resolve to Lite or USD 40–800 if all resolve to Balanced, yielding a whole-portfolio envelope of **USD 30–1,240/month**. This is a scenario, not a forecast.

GitHub Actions minutes, allowances, taxes, and budget-stop behavior are outside the supplied estimates.

## Action plan

1. Establish how requestor `Default` behaves for R-01 and R-02, and collect R-06/R-07 requestor and repository values or review-overview evidence.
2. Preserve R-02 repository Lite while its routine-work intent remains valid; do not claim it determines the run until the higher step is known.
3. Pilot R-01 after the cutover and capture both the effective effort and winning source shown on the review.
4. Compare monthly review counts, AI-credit usage, Actions usage, latency, and human-review findings.
5. Revisit the specific repository or organization default if the observed effort differs, a budget blocks reviews, latency misses the agreed SLA, or review depth is inadequate.

## Boundary

This audit is advisory. It has not changed GitHub settings, budgets, or review behavior.
