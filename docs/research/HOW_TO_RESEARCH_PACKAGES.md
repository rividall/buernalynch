# How to Research Packages for Integration

**Purpose:** This guide provides a systematic process for evaluating third-party packages/libraries before integrating them into the ECHO project. Follow this process to ensure consistency, quality, and informed decision-making.

---

## Table of Contents

1. [When to Use This Process](#when-to-use-this-process)
2. [Research Process Overview](#research-process-overview)
   - [Step 1: Preparation](#step-1-preparation-5-minutes)
   - [Step 2: Package Discovery](#step-2-package-discovery-10-15-minutes)
   - [Step 3: Deep Dive Research](#step-3-deep-dive-research-30-45-minutes)
   - [Step 4: Document Your Findings](#step-4-document-your-findings-30-60-minutes)
   - [Step 5: Review & Share](#step-5-review--share-10-minutes)
3. [Master Prompt for AI Assistants](#master-prompt-for-ai-assistants-claude-cowork-etc)
4. [Research Checklist](#research-checklist)
5. [Examples](#examples)
6. [Tips for Effective Research](#tips-for-effective-research)
7. [Questions?](#questions)

---

## When to Use This Process

Use this research process when considering:
- ✅ New UI component libraries (Gantt charts, calendars, rich text editors, etc.)
- ✅ State management libraries
- ✅ Backend packages (ORM extensions, authentication libraries, etc.)
- ✅ Major dependencies that affect architecture
- ✅ Any package that will be used across multiple features

**Skip this for:**
- ❌ Utility packages with narrow scope (e.g., date-fns, lodash)
- ❌ Official React/framework packages
- ❌ Packages already used in the project

---

## Research Process Overview

### Step 1: Preparation (5 minutes)
Read these project documents to understand current context:

**Required Reading:**
1. [`README.md`](../../README.md) - Tech stack, setup, architecture
2. [`docs/PROGRESS.md`](../PROGRESS.md) - Current phase, what's built, what's next
3. [`docs/TODO.md`](../TODO.md) - Pending features and tasks
4. [`frontend/package.json`](../../frontend/package.json) - Frontend dependencies
5. [`backend/pyproject.toml`](../../backend/pyproject.toml) - Backend dependencies
6. [`docs/../TRD_Communication & Dashboard Platform.docx.md`](../TRD_Communication%20&%20Dashboard%20Platform.docx.md) - Requirements (relevant sections)

**Key things to note:**
- Current tech stack (see [README.md Tech Stack section](../../README.md#tech-stack))
- Current project phase (see [PROGRESS.md](../PROGRESS.md))
- Frontend dependencies (see [frontend/package.json](../../frontend/package.json))
- Backend dependencies (see [backend/pyproject.toml](../../backend/pyproject.toml))
- Requirements related to the feature you're researching (see [TRD](../TRD_Communication%20&%20Dashboard%20Platform.docx.md))

---

### Step 2: Package Discovery (10-15 minutes)

**Find the package:**
1. Start with official documentation (e.g., https://docs.library.com)
2. Check npm/PyPI page for package info
3. Review GitHub repository (stars, issues, last commit, license)
4. Search for comparison articles ("best [type] libraries for React 2026")

**Key Questions:**
- Is it actively maintained? (Recent commits, issues handled)
- What's the license? (MIT, Apache, Commercial?)
- How popular is it? (npm downloads, GitHub stars)
- Does it have TypeScript support?
- Is there good documentation?

---

### Step 3: Deep Dive Research (30-45 minutes)

Research the following areas systematically:

#### 3.1 Technical Compatibility
- **React/Framework Version:** Compatible with current version? (see [package.json](../../frontend/package.json))
- **TypeScript:** Has type definitions?
- **Build Tool:** Compatible with current build tool? (see [README.md](../../README.md))
- **UI Library:** Works with/alongside current UI framework? (see [README.md](../../README.md))
- **State Management:** Integrates with current state management? (see [package.json](../../frontend/package.json))
- **Backend:** Compatible with current backend stack? (see [backend/pyproject.toml](../../backend/pyproject.toml) and [README.md](../../README.md))

#### 3.2 Features & Capabilities
- What does it do? (Core features)
- What editions exist? (Open source vs PRO/Commercial)
- Does it cover project requirements? (Check PROGRESS.md, TRD)
- What's missing? (Gaps in functionality)

#### 3.3 Installation & Setup
- How to install? (`npm install` or `pip install`)
- What dependencies does it pull in?
- Basic usage example (copy from docs)
- Configuration complexity (simple vs complex)

#### 3.4 Integration Approach
- How does it integrate with existing code?
- Does it require backend changes?
- Does it require new models/endpoints?
- Data structure requirements (what format does it expect?)

#### 3.5 Customization & Extensibility
- Can it be styled to match Chakra UI?
- Can it be extended with custom logic?
- Does it support plugins/extensions?

#### 3.6 Alternatives
- What are 2-3 alternative packages?
- Quick comparison (features, license, cost, complexity)

#### 3.7 Effort Estimate
- Backend work needed (models, API, endpoints) - days
- Frontend work needed (components, integration, styling) - days
- Total estimate for integration

---

### Step 4: Document Your Findings (30-60 minutes)

Use the [RESEARCH_TEMPLATE.md](./RESEARCH_TEMPLATE.md) to structure your findings.

**Create a new research document:**
```bash
# Create file in docs/research/
touch docs/research/[package-name]-analysis.md
```

**Fill in all sections from the template:**
1. Executive Summary & Recommendation
2. Library Overview
3. Technical Compatibility
4. Installation & Setup (with code examples)
5. Data Structure Requirements
6. Integration with Existing Stack
7. Requirements Coverage
8. Pros and Cons
9. Alternatives Comparison
10. Development Effort Estimate
11. Packages to Install
12. Integration Approach
13. Will It Make Our Lives Easier?
14. Recommendation & Next Steps
15. Additional Resources

**Tips:**
- Be specific (include code examples, version numbers, file paths)
- Be honest about cons and limitations
- Quantify effort estimates (days/weeks)
- Include links to documentation, npm, GitHub
- Use tables for comparisons
- Use checkmarks (✅/❌/⚠️) for quick scanning

---

### Step 5: Review & Share (10 minutes)

**Before sharing:**
- [ ] Proofread for typos and clarity
- [ ] Verify all links work
- [ ] Ensure recommendation is clear (YES/NO/CONDITIONAL)
- [ ] Check that code examples are accurate
- [ ] Confirm effort estimates are realistic

**Share with team:**
1. Commit the research document to the repo
2. Update `docs/research/RESEARCH.md` with a link to your analysis
3. Notify team in chat/email
4. Discuss in next standup/meeting

---

## Master Prompt for AI Assistants (Claude Cowork, etc.)

**Copy this prompt when asking an AI to research a package:**

```
I need you to research [PACKAGE_NAME] for potential integration into our project.

## Context
Read these files first to understand our project:
- README.md - Tech stack overview (see Tech Stack section)
- docs/PROGRESS.md - Current phase and progress
- docs/TODO.md - Future features
- frontend/package.json - Current frontend dependencies and versions
- backend/pyproject.toml - Current backend dependencies and versions
- docs/../TRD_Communication & Dashboard Platform.docx.md - Requirements (sections related to [FEATURE])

## Your Task
1. Research [PACKAGE_NAME] thoroughly (official docs, npm/PyPI, GitHub, comparisons)
2. Evaluate it against our tech stack (see README.md for current stack, package.json/pyproject.toml for versions)
3. Determine if it meets our requirements for [FEATURE_NAME] (see PROGRESS.md Phase X and TRD)
4. Follow the structure in docs/RESEARCH_TEMPLATE.md

## Evaluation Criteria
- Technical compatibility (check versions against package.json/pyproject.toml)
- License (prefer MIT/Apache open source)
- Features vs requirements coverage (compare against PROGRESS.md and TRD)
- Installation complexity
- Integration effort estimate
- Pros and cons
- Comparison with 2-3 alternatives

## Deliverable
Create a comprehensive research document at:
docs/research/[package-name]-analysis.md

Follow the structure in docs/RESEARCH_TEMPLATE.md. Include:
- Clear YES/NO/CONDITIONAL recommendation
- Code examples for installation and basic usage
- Effort estimate in days/weeks
- Pros/cons list
- Alternatives comparison table
- Links to documentation and resources

Be thorough, specific, and honest about limitations.
```

---

## Research Checklist

Use this checklist to ensure complete research:

### Discovery
- [ ] Found official documentation
- [ ] Checked npm/PyPI page (downloads, version, license)
- [ ] Reviewed GitHub (stars, issues, last commit, contributors)
- [ ] Searched for comparison articles

### Compatibility
- [ ] Verified React/Python version compatibility
- [ ] Checked TypeScript support
- [ ] Confirmed Vite/build tool compatibility
- [ ] Tested integration with Chakra UI (if UI component)
- [ ] Verified Zustand/TanStack Query compatibility (if state-heavy)

### Functionality
- [ ] Listed all core features
- [ ] Identified open source vs commercial features
- [ ] Mapped features to project requirements
- [ ] Noted missing features/limitations

### Integration
- [ ] Documented installation steps
- [ ] Created basic usage example
- [ ] Identified backend changes needed (models, API)
- [ ] Identified frontend changes needed (components, routes)
- [ ] Estimated integration effort

### Evaluation
- [ ] Listed 3+ pros
- [ ] Listed 3+ cons
- [ ] Compared with 2-3 alternatives
- [ ] Made clear recommendation (YES/NO/CONDITIONAL)

### Documentation
- [ ] Created research doc in docs/research/
- [ ] Followed RESEARCH_TEMPLATE.md structure
- [ ] Included code examples
- [ ] Added links to resources
- [ ] Proofread and reviewed

---

## Examples

See these completed research documents for reference:
- [SVAR React Gantt Analysis](./svar-gantt-analysis.md) - Example of thorough package research

---

## Tips for Effective Research

### Do:
- ✅ Be thorough but concise
- ✅ Use tables for comparisons
- ✅ Include code examples
- ✅ Quantify effort estimates
- ✅ Link to primary sources
- ✅ Be honest about cons
- ✅ Consider long-term maintenance

### Don't:
- ❌ Skip compatibility checks
- ❌ Ignore licensing issues
- ❌ Underestimate integration effort
- ❌ Forget to compare alternatives
- ❌ Make recommendations without evidence
- ❌ Copy-paste marketing fluff

---

## Questions?

If you're unsure about:
- **Requirements:** Check PROGRESS.md, TRD, or ask project lead
- **Tech Stack:** Check README.md or package.json files
- **Existing Patterns:** Grep the codebase for similar implementations
- **Effort Estimates:** Compare to similar past integrations

---

**Last Updated:** 2026-02-13
**Maintained By:** Project Team
