# Example review-effort packet

Audit seven organization-owned repositories. Each case has 40 monthly reviews. Lite is estimated at USD 0.05–1 per review and Balanced at USD 0.25–5. Settings are:

| Case | Explicit request | Previous PR effort | Requestor | Repository | Organization |
|---|---|---|---|---|---|
| R-01 | none | none | Default | Default | Default |
| R-02 | none | none | Default | Lite | Default |
| R-03 | Balanced | none | Lite | Lite | Lite |
| R-04 | none | Lite | Balanced | Default | Balanced |
| R-05 | none | none | Balanced | Lite | Default |
| R-06 | none | none | unknown | Default | Lite |
| R-07 | none | none | unknown | unknown | Default |

The supplied rule says organization and repository `Default` resolve to Balanced on September 28, 2026. The operator can edit organization and repository settings, but not personal requestor settings. Produce the full audit format without accessing GitHub.
