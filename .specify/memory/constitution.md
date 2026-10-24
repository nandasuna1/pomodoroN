<!--
Sync Impact Report
Version change: none → 1.0.0
Modified principles:
  - [PRINCIPLE_1_NAME] → Simplicity & User Focus
  - [PRINCIPLE_2_NAME] → Component-First Design
  - [PRINCIPLE_3_NAME] → Test-First Development (NON-NEGOTIABLE)
  - [PRINCIPLE_4_NAME] → Accessibility & Inclusivity
  - [PRINCIPLE_5_NAME] → Observability & Versioning
Added sections:
  - Constraints: Technology stack & security expectations
  - Development Workflow: PRs, CI, release process
Removed sections: none
Follow-up TODOs:
  - RATIFICATION_DATE: missing — requires project ratification date or meeting note
-->

# PomodoroN Constitution

## Core Principles

### Simplicity & User Focus
The project MUST prioritize a simple, predictable user experience. Features MUST be clearly valuable to end users and avoid unnecessary complexity. Decisions that increase cognitive load or configuration for users are disallowed unless accompanied by measurable user benefit and an explicit justification.

Rationale: The app's value is productivity; simplicity reduces friction and maintenance.

### Component-First Design
Code MUST be organized into small, reusable React components. Each component MUST have a clear public contract, prop validation (via TypeScript types), and isolated styles. Global state SHOULD be limited to contexts (Theme, Timer state) and accessed through well-defined hooks.

Rationale: Component-first structure improves testability and reuse across the UI.

### Test-First Development (NON-NEGOTIABLE)
All non-trivial behavior MUST have automated tests before implementation: unit tests for reducers and components, and integration tests for flows (start/pause/save). Tests MUST run in CI and pass before merging.

Rationale: Tests prevent regressions and document expected behavior for a time-sensitive app like a timer.

### Accessibility & Inclusivity
UI controls MUST be accessible: semantic HTML, keyboard operability, focus management, and ARIA where necessary. Text alternatives and sufficient contrast are REQUIRED.

Rationale: A timer must be usable by people with diverse needs; accessibility is a baseline requirement.

### Observability & Versioning
Releases MUST include a changelog entry and semantic versioning (MAJOR.MINOR.PATCH). Logging for errors and key user actions SHOULD be structured to aid debugging. Breaking changes MUST be documented and communicated.

Rationale: Clear versions and observability reduce user confusion and simplify troubleshooting.

## Constraints: Technology, Security, Performance

The project SHALL use the existing stack: React, TypeScript, Vite, styled-components, and the listed dependencies in package.json. Security-sensitive data MUST not be committed to the repo. Performance expectations: UI interactions (start/pause/reset) MUST respond within 100ms on typical desktop hardware.

Rationale: Constraining the stack reduces cognitive overhead and aligns contributors.

## Development Workflow

- Branching: Use feature branches named feature/<short-desc>.
- Pull requests: All changes MUST go through PRs with at least one approving review from a project maintainer.
- CI: Commits to PRs MUST run lint and tests; PRs with failing checks MUST NOT be merged.
- Releases: Tag releases with semantic versions; update CHANGELOG.md summarizing user-visible changes.
- Commit messages: Use conventional commits (type: scope — summary) where practical.

Rationale: A lightweight but enforced workflow ensures quality without blocking small contributions.

## Governance

Amendments: Proposals to amend this constitution MUST be published as a PR that explains the change, the rationale, and migration steps for any affected code or processes. A simple majority of active maintainers (or explicit maintainer approval) is required to ratify amendments.

Versioning policy: MAJOR when changes break backward compatibility or redefine principles; MINOR when adding principles or materially expanding guidance; PATCH for clarifications, typos, or non-semantic wording changes.

Compliance review: Periodic reviews (annually) SHOULD be scheduled to ensure practices match the constitution. The Last Amended date MUST be updated when changes are merged.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): project ratification date needed | **Last Amended**: 2026-10-13
