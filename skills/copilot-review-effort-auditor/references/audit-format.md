# Audit format

## Verdict

Use one status:

- `ready`: every case resolves and no unreviewed cutover exposure remains;
- `action-needed`: every material case resolves, but one or more settings need an explicit decision or controlled rollout;
- `blocked`: an unknown higher-precedence value, missing rule, or missing inventory prevents a material conclusion.

Name the smallest set of facts that determines the verdict.

## Resolution table

Use one row per case:

| Case | Trigger | Effective effort | Winning step | Evidence path | Ignored lower settings | Exposure | Confidence | Owner action |
|---|---|---|---|---|---|---|---|---|

`Evidence path` should show the walk from highest priority to the winner or blocking unknown. `Confidence` is `confirmed`, `derived`, or `unknown`.

## Portfolio ranges

Show:

1. known Lite review count and range;
2. known Balanced review count and range;
3. combined confirmed range;
4. unresolved review count;
5. optional unresolved scenario envelope, clearly labeled as a scenario.

State the multiplication used so the totals can be checked.

## Cutover map

List `cutover-exposed`, `protected-explicit-lite`, `protected-higher-precedence`, and `indeterminate` cases. Do not call a case protected when an unknown earlier step could override the cited setting.

## Action plan

Order actions as:

1. resolve blocking unknowns;
2. preserve explicit choices that match intent;
3. make bounded administrator-controlled edits;
4. pilot representative changes;
5. compare observed effort and consumption to the audit;
6. expand or roll back.

## Verification query

For each observed run capture: case/repository, PR, automatic or manual trigger, requestor, explicit request value, previous effort, requestor setting if available, repository setting, organization setting, effective effort shown in the review overview, AI-credit usage, Actions usage, timestamp, and discrepancy note.

## Rollback signals

Name measurable signals and the exact setting to revisit, such as an unexpected effective effort, budget block, materially higher consumption, missed review SLA, or loss of required review depth. Keep human review in the loop.

## Boundary

End with the required advisory sentence from `SKILL.md`.
