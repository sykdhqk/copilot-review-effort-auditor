# Copilot Review Effort Auditor

[简体中文](README.zh-CN.md) · Supports [iPolloWork](https://github.com/Devin-AXIS/iPolloWork)

Copilot Review Effort Auditor is a reusable Skill for determining which GitHub Copilot code review effort level wins when request, pull-request, user, repository, organization, and built-in settings overlap. It produces an evidence trail, cutover map, defensible AI-credit range, and a controlled verification plan without changing GitHub settings.

## What it solves

Copilot code review effort is not decided by one repository toggle. An explicit effort on a request, a previous effort on the same pull request, or a requestor setting can take precedence over repository and organization defaults. A portfolio spreadsheet that looks only at repository settings can therefore misclassify both review depth and expected consumption.

This Skill walks the full precedence chain, stops when a higher-priority value is unknown, and keeps confirmed totals separate from planning scenarios. It is designed for administrators and engineering leads who need an auditable answer before changing defaults or budgets.

## Who it helps

- GitHub organization owners evaluating Copilot code review defaults.
- Repository administrators choosing Lite or Balanced for automatic reviews.
- FinOps and platform teams estimating AI-credit exposure without inventing a point forecast.
- Security and quality teams checking that critical changes receive the intended review depth.
- Auditors who need to distinguish configuration predictions from observed review-run evidence.

## Use cases

- Find repositories where a `Default` value may resolve to Balanced.
- Explain why an explicit manual request or previous PR run overrides lower-level defaults.
- Preserve an intentional repository Lite choice while identifying unresolved requestor behavior.
- Calculate confirmed monthly ranges and a separately labeled unknown-case envelope.
- Design a pilot with observable rollback signals before a broad configuration change.
- Reconcile a predicted effort with the effort shown in a Copilot review overview.

## Core features

- Normalizes every setting to `Lite`, `Balanced`, `Default`, `none`, or `unknown`.
- Traces six precedence steps and names the exact winner or blocking uncertainty.
- Records lower-priority values that were ignored.
- Separates `cutover-exposed`, explicitly protected, higher-precedence protected, and indeterminate cases.
- Multiplies only supplied review counts and cost ranges; unresolved cases stay outside confirmed totals.
- Produces an administrator-scoped action plan, verification data request, and rollback signals.
- Preserves human validation and an explicit no-external-change boundary.

## Workflow

1. Export or transcribe the applicable request, PR, requestor, repository, and organization effort settings.
2. Add ownership type, trigger, review count, change profile, applicable date, and supplied cost estimates.
3. Mark a setting `none` when it does not apply and `unknown` when it has not been collected.
4. Invoke Copilot Review Effort Auditor and request the full audit format.
5. Resolve every blocking unknown before treating lower-level defaults as effective.
6. Pilot representative repositories, capture the effort shown on each review, and compare observed consumption separately from estimates.
7. Expand the policy or restore the recorded prior value when the stated rollback signals fire.

## Prerequisites

- A text or table inventory of effort settings. The included example is sufficient for a dry run.
- A verified product rule for how `Default` behaves at the relevant scope and date.
- Review counts and cost estimates if a portfolio range is required.
- An iPolloWork local project with a configured model engine for the packaged installation route.

The Skill itself requires no GitHub token, account connection, network access, script runtime, or external service.

## Inputs and outputs

**Input:** one or more cases containing trigger type, explicit request effort, previous effort on the PR, requestor setting, repository setting, organization or owner setting, built-in default rule, ownership type, review volume, and cost assumptions.

**Output:** a Markdown audit with a verdict, one resolution row per case, evidence path, ignored settings, exposure label, confirmed and scenario ranges, action plan, verification query, rollback signals, and advisory boundary.

Missing evidence produces `unknown`; it is never silently treated as `none`.

## End-to-end example

[`examples/effort-audit-packet.md`](examples/effort-audit-packet.md) contains seven organization-owned repositories with overlapping values. Ask:

```text
Use Copilot Review Effort Auditor to audit this packet. Return the full resolution table, confirmed monthly range, cutover map, least-disruptive action plan, verification query, rollback signals, and advisory boundary.
```

The expected audit in [`examples/expected-audit.md`](examples/expected-audit.md) resolves an explicit Balanced request, a previous Lite run, and a requestor Balanced choice. It leaves four cases unresolved because requestor `Default` or unavailable higher-precedence values cannot safely be skipped. Confirmed monthly estimates are kept separate from the all-Lite/all-Balanced scenario envelope.

## Install and use in iPolloWork

1. Open the GitHub Release and download `copilot-review-effort-auditor-1.0.0.ipollowork-plugin`.
2. In iPolloWork, choose **Extensions → Plugins → Add → File** and select the downloaded file.
3. Confirm publisher `sykdhqk`, version `1.0.0`, one Skill resource, and no Agent, command, or MCP resource; then install it.
4. Keep both the plugin and the `Copilot Review Effort Auditor` Skill enabled.
5. Open a local project and start a new task so the installed Skill is loaded for that task.
6. Paste or attach an effort inventory and use the example request above.
7. Verify that the response names the winning precedence step or blocking unknown for every case, keeps confirmed costs separate, and ends with the advisory boundary.
8. Save or export the Markdown audit. Apply any approved GitHub changes separately through repository or organization controls.

For the standalone Skill route, unzip `copilot-review-effort-auditor-1.0.0-skill.zip`. In iPolloWork's local Skill import page, select the folder that directly contains `SKILL.md`, then reload as prompted. Do not select the ZIP or repository root.

### Troubleshooting

- If the plugin cannot be selected, confirm the file ends in `.ipollowork-plugin`.
- If the preview does not show one Skill, re-download the Release asset and verify `SHA256SUMS.txt`.
- If the task does not load the Skill, confirm it is enabled and start a new task after installation.
- If a result chooses a repository value despite an earlier `unknown`, ask for the full evidence path and require the unresolved value to remain unknown.

## Build and package

```sh
npm test
npm run package
cd dist && shasum -a 256 -c SHA256SUMS.txt
```

The build creates a direct-import `.ipollowork-plugin`, a standalone Skill ZIP, a source ZIP, and `SHA256SUMS.txt`. Packaging is deterministic, rejects symbolic links, includes the complete Skill reference directory, and keeps source separate from the installation package.

## Verification environment

Version 1.0.0 was imported from its packaged file and invoked in iPolloWork 0.50.12 on macOS arm64 with a local OpenCode project and the Big Pickle model. The preview reported one Skill and no agents, commands, MCP servers, permissions, authorization methods, local services, or native code. The invocation loaded the Skill and `audit-format.md`, then produced the expected seven-case audit from the included packet. See [`docs/desktop-acceptance.md`](docs/desktop-acceptance.md).

The package is declarative (`source.trusted=false`) and needs no runtime or credentials. This acceptance covers import, enablement, Skill loading, reference loading, one representative portfolio audit, and file export. It does not test every GitHub plan, administrator surface, billing arrangement, or future policy behavior.

## Functional limits

- The Skill audits supplied evidence; it does not read organization settings or review metadata from GitHub.
- It cannot determine how an undocumented `Default` behaves at a scope unless the packet supplies a verified rule.
- Cost ranges are estimates from the input and exclude components the input does not quantify.
- It does not change policies, budgets, pull requests, or review behavior.
- Balanced is not automatically recommended for every repository; effort should match criticality, latency, and budget constraints.
- Copilot feedback can be incomplete or incorrect and still requires human validation.

## FAQ

**Why is `unknown` different from `none`?**  
`none` means a precedence step does not apply. `unknown` means an applicable value may exist and could override every lower setting.

**Can a repository Lite setting override a manual Balanced request?**  
No. The explicit request is earlier in the supplied precedence chain.

**Does a previous Lite review stay relevant on a re-review?**  
It can: the supplied order places previous effort on the same PR before requestor, repository, and organization settings.

**Does this predict the invoice?**  
No. It applies only the supplied ranges and volumes, labels scenarios, and keeps other usage components outside the total.
