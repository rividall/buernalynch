# Research, Analysis & Deployment Docs

This folder contains all technical research, package analysis, and deployment documentation for the buenalynch.com portfolio project. It follows a three-stage pipeline for integrating new packages and features.

---

## The Pipeline

Every new package or major feature goes through three stages:

1. **Research** - Evaluate the package using [HOW_TO_RESEARCH_PACKAGES.md](./HOW_TO_RESEARCH_PACKAGES.md) and write the analysis using [RESEARCH_TEMPLATE.md](./RESEARCH_TEMPLATE.md).
2. **Analysis** - Document the decision: why this package, how it fits the stack, pros/cons, alternatives considered. Named `{feature}-analysis.md`.
3. **Deployment** - Track integration, configuration, known issues, and troubleshooting. Named `{feature}-deployment.md`.

Not every feature needs all three stages. Some only need a deployment doc (e.g., Docker). But any new third-party library **must** have at least an analysis doc.

---

## Documents in This Folder

### Research Guides
| File | Purpose |
|------|---------|
| [HOW_TO_RESEARCH_PACKAGES.md](./HOW_TO_RESEARCH_PACKAGES.md) | Step-by-step process for evaluating packages |
| [RESEARCH_TEMPLATE.md](./RESEARCH_TEMPLATE.md) | 15-section template for analysis docs |

### Analysis Docs
| File | Feature | Recommendation |
|------|---------|----------------|
| _(none yet)_ | | |

### Deployment Docs
| File | Feature | Status |
|------|---------|--------|
| [server-deployment.md](./server-deployment.md) | Raspberry Pi + Docker + Cloudflare Tunnel | Infra ready, waiting for container |

---

## Adding New Docs

- **New package?** Follow [HOW_TO_RESEARCH_PACKAGES.md](./HOW_TO_RESEARCH_PACKAGES.md) -> create `{package}-analysis.md` using [RESEARCH_TEMPLATE.md](./RESEARCH_TEMPLATE.md)
- **Deploying a feature?** Create `{feature}-deployment.md` with setup steps, configuration, and troubleshooting
- **Update RESEARCH.md** when adding new docs - keep the tables current

---

## Quick Links

- [Project README](../../README.md) - Tech stack, structure, architecture
- [PROGRESS.md](../PROGRESS.md) - What's built, what's next
- [TODO.md](../TODO.md) - Pending tasks
- [TRD](../TRD.md) - Technical requirements

---

**Last Updated:** 2026-03-08
