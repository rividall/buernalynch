# Portfolio buenalynch.com - Claude Code Instructions

## Before ANY Task

Read these docs in order before writing code:

1. **README.md** - Tech stack, project structure, architecture, doc update checklist
2. **docs/TODO.md** - Known issues & technical notes (READ ONLY - do not modify unless explicitly asked)
3. **docs/PROGRESS.md** - What's built, what's in progress
4. **docs/research/RESEARCH.md** - Index of all research, analysis & deployment docs

For feature-specific context, check the relevant docs linked from RESEARCH.md.

## Rules

- **Read official docs first.** Before using any package, library, or tool - read its official documentation. Not your training data, not your memory. The actual docs.
- **docs/TODO.md is read-only.** Do NOT add, update, or remove items from TODO.md unless the user explicitly asks you to. Read it for context, but never auto-update it.
- **Follow STYLEGUIDE.md** for all UI changes - colors, typography, component patterns.
- **Follow API.md conventions** for all endpoint changes.
- **New package?** Follow the 3-stage pipeline in docs/research/RESEARCH.md: Research -> Analysis doc -> Deployment doc.
- **When giving a docker command always add sudo** for docker build, docker compose, etc.
- **Do NOT run git commands** (commit, push, etc.).

## After Completing a Feature

Follow the 6-step doc update checklist in README.md:

1. **README.md** - Tech Stack, Project Structure, Architecture Notes, Development Progress
2. **PROGRESS.md** - Check off completed items
3. **TODO.md** - ONLY if the user explicitly asks. Do not auto-update.
4. **API.md** - If endpoints were added, changed, or removed
5. **docs/research/RESEARCH.md** - If new analysis or deployment docs were created
6. **Relevant deployment doc** in docs/research/ - Update status, known issues

This is not optional. Do it before considering a feature "done".
