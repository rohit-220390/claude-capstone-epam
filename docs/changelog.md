# Changelog

Human-readable change summary for the Agentic SDLC Documentation Sync project.

<!-- Entries added by the PR Agent -->

## [Unreleased] - 2026-09-17

### Pipeline Run: EPMCDMETST-52015 IMPLEMENT Phase

#### Requirement Verification (DISCOVER)
Re-verified EPMCDMETST-52015 against live Jira source. Result: **UNCHANGED**. The requirement's 9 acceptance scenarios remain byte-identical to the normalized representation in `docs/requirements.md` (contentHash `e2a1f8bb89bfb301b616c2b1342608dc1236158eddf620be093c1f25e19c4a27`). No drift detected.

#### Design Approval (DESIGN_APPROVAL)
Human approved the following 4 design decisions as-is:

| Decision | Description | Rationale |
|----------|-------------|-----------|
| **DR-004** | In-memory catalog for capstone scope | Sufficient for acceptance criteria; keeps app portable without external DB setup |
| **DR-008** | clearAll() emits through onChange -> FilterStatePort.save() | Guarantees persisted state is cleared by construction, not convention |
| **DR-011** | Add `price: number` to Book model | Required for price-based sorting (high-to-low, low-to-high) |
| **DR-017** | Clear All Filters also resets sort to 'relevance'; sort stored in same SelectedFilters object | Consistent user mental model: "Clear All" means reset everything |

#### Plan Approval (PLAN_APPROVAL)
Human approved the 24-task implementation plan in `docs/impl-plan.md` after the following adjustments:

**Path Remap**: All task file paths corrected from the stale `bookstore-app/` prefix to `../bookstore-app-claude/` to match the authoritative target application location defined in CLAUDE.md Section "Target Application".

**TASK-013 Strengthened**: Added explicit assertion requirement that `FilterStatePort.load(category)` returns empty/undefined after `clearAll()`, ensuring DR-008's persistence-clearing guarantee is test-verified.

#### Resolved Open Items
Three implementation questions were resolved by human decision:

| Item | Decision | Impact |
|------|----------|--------|
| **UI framework** | Vanilla TypeScript/DOM (no React/Vue) | TASK-008/009/018 implement framework-agnostic components; app remains lightweight and portable |
| **Star-rating deselect behavior** | No-op (clicking active star keeps filter; only Clear All removes it) | Simplifies star-rating control; consistent with "single-select stays until explicitly cleared" pattern |
| **localStorage unavailable** | Silent no-op on save/load (never throws, never breaks core search) | FilterStatePort adapter degrades gracefully in private browsing or restrictive environments |

#### Documentation Updates
- `docs/documentation-map.md`: Added detailed acceptance scenario-to-artifact mapping for all 9 scenarios; updated pipeline state table; recorded approved decisions and resolved open items
- `docs/design-review.md`: Corrected 3 stale `bookstore-app/` path references to `../bookstore-app-claude/` (DR-002, DR-004, DR-007 recommendations)
- `docs/changelog.md`: This entry

---

## [Unreleased] - 2026-08-25

### Added - EPMCDMETST-52015: Sorting Support for Non-Fiction Filters
**Scenario: "Filtering works with sorting"**

#### Core Data Model
- Extended `Book` interface with `price: number` field for sorting by price
- Updated seed data with realistic price values ($5-$50 range)
- Added books with identical prices for stable-sort testing (f1, nf4, nf11: $24.99; f4, nf2: $19.99)

#### Sorting Infrastructure
- New `SortOption` type: `'price-high-to-low' | 'price-low-to-high' | 'rating-high-to-low' | 'publication-date-newest' | 'publication-date-oldest' | 'relevance'`
- Added `getSortOptions(category)` function maintaining Fiction/Non-Fiction parity
- Implemented `sortBooks()` function with ES2019+ stable sort for consistent ordering

#### Query Execution
- Updated `searchBooks()` to enforce Filter → Sort → Paginate execution order (DR-013)
- Sorting applied after filtering, before pagination
- Applied filters remain active when sorting is selected (AC requirement)

#### API & Validation
- Extended API endpoint to accept `?sort=` query parameter
- Invalid sort values default to 'relevance' (graceful degradation, no errors per DR-014)
- Server-side sort validation against Sort Option Catalog

#### UI Components
- Added `selectSort(option: SortOption)` method to SearchFiltersPanel
- Sort state included in `SelectedFilters` interface
- Clear All Filters also resets sort to default (DR-017)

#### State Persistence
- Extended FilterStatePort to persist and restore sort selections
- Sort validation on restore: invalid persisted sort values are dropped (DR-010)
- Sort state preserved across page refresh alongside filters

#### Testing
- 80 tests passing with 92.5% code coverage
- New acceptance test: "Scenario: Filtering works with sorting"
- Tests verify: sort options parity, execution order, persistence, and integration with filters

### Technical Details
- Execution order: Filter → Sort → Paginate (per approved architecture DR-013)
- Stable sort using ES2019+ `Array.sort()` (Node 12+ compatible)
- Sort options identical for Fiction and Non-Fiction categories (parity requirement)
- Sorting operates on filtered result set, not full catalog
- Page resets to 1 when sort changes (same behavior as filter changes)

### Removed - 2026-09-17 (human-approved)

- **Duplicate stale copy of EPMCDMETST-52015 requirement block** from `docs/requirements.md`
  - Cause: Append-instead-of-replace defect during requirement update created duplicate blocks
  - Removed copy was a strict subset (7 scenarios) missing "Filter state is preserved after page refresh" and "Filtering works with sorting" scenarios
  - Authoritative copy retained with all 9 scenarios and traceability JSON (contentHash `e2a1f8bb89bfb301b616c2b1342608dc1236158eddf620be093c1f25e19c4a27`)
