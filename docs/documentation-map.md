# Documentation Map

Mapping between source requirements and repository artifacts.

| Requirement | Source | Repository Artifact | Impact Type |
|-------------|--------|-------------------|-------------|
| EPMCDMETST-52015 | Jira | [docs/requirements.md](./requirements.md) | test-impacting |
| EPMCDMETST-52015 | Jira | [docs/architecture.md](./architecture.md) | architecture-impacting |
| EPMCDMETST-52015 | Jira | [docs/design-review.md](./design-review.md) | architecture-impacting |
| EPMCDMETST-52015 | Jira | [docs/impl-plan.md](./impl-plan.md) | code-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/src/catalog/book.ts` | code-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/src/catalog/filter-catalog.ts` | code-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/src/catalog/seed-data.ts` | code-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/src/catalog/seed-data.json` | code-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/src/search/validate-filters.ts` | code-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/src/search/date-filter.ts` | code-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/src/search/query-builder.ts` | code-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/src/api/search-endpoint.ts` | code-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/src/api/start.ts` | code-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/src/api/app-server.ts` | code-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/src/web/search-filters-panel.ts` | code-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/src/web/results-view.ts` | code-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/src/web/filter-state-persistence.ts` | code-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/src/web/browser-app.ts` | code-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/public/index.html` | code-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/public/styles.css` | code-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/tests/catalog/filter-catalog.test.ts` | test-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/tests/search/validate-filters.test.ts` | test-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/tests/search/date-filter.test.ts` | test-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/tests/search/query-builder.test.ts` | test-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/tests/api/search-endpoint.test.ts` | test-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/tests/web/search-filters-panel.test.ts` | test-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/tests/web/results-view.test.ts` | test-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/tests/web/filter-state-persistence.test.ts` | test-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/tests/acceptance/non-fiction-filters.test.ts` | test-impacting |
| EPMCDMETST-52015 | Jira | `../bookstore-app-claude/tests/api/app-server.test.ts` | test-impacting |
<!-- Maintained by the Documentation Agent -->
<!-- Last synchronized: 2026-09-17 IMPLEMENT phase - DISCOVER verified (unchanged), DESIGN_APPROVAL granted, PLAN_APPROVAL granted -->

## Pipeline State for EPMCDMETST-52015

| Phase | Status | Date |
|-------|--------|------|
| DISCOVER | Verified unchanged vs. Jira | 2026-09-17 |
| DESIGN_APPROVAL | Granted (4 decisions approved) | 2026-09-17 |
| PLAN_APPROVAL | Granted (24 tasks, path remap applied) | 2026-09-17 |
| IMPLEMENT | In progress | 2026-09-17 |

### Approved Design Decisions
- **DR-004**: In-memory catalog for capstone scope (approved as-is)
- **DR-008**: clearAll() emits through onChange -> FilterStatePort.save() (approved as-is)
- **DR-011**: Add `price: number` to Book model (approved as-is)
- **DR-017**: Clear All Filters resets sort to 'relevance', sort in same persisted SelectedFilters object (approved as-is)

### Resolved Open Items
- **UI framework**: Vanilla TypeScript/DOM (no React/Vue)
- **Star-rating deselect**: No-op (clicking active star keeps filter; only Clear All removes it)
- **localStorage unavailable**: Silent no-op on save/load (never throws, never breaks core search)

## Acceptance Scenario to Artifact Mapping

**Source**: Jira EPMCDMETST-52015 (9 scenarios)

### Scenario 1: Filter availability on Non-Fiction results
| Artifact | Coverage |
|----------|----------|
| `../bookstore-app-claude/src/catalog/filter-catalog.ts` | getFilterOptions(category) returns identical options |
| `../bookstore-app-claude/src/web/search-filters-panel.ts` | Renders all filter groups for both categories |
| `../bookstore-app-claude/tests/catalog/filter-catalog.test.ts` | Parity test: fiction === non-fiction |
| `../bookstore-app-claude/tests/acceptance/non-fiction-filters.test.ts` | End-to-end scenario |

### Scenario 2: Book Format filter works
| Artifact | Coverage |
|----------|----------|
| `../bookstore-app-claude/src/search/validate-filters.ts` | Validates format against allow-list |
| `../bookstore-app-claude/src/search/query-builder.ts` | Applies format filter predicate |
| `../bookstore-app-claude/tests/search/query-builder.test.ts` | Format-only filter test |
| `../bookstore-app-claude/tests/acceptance/non-fiction-filters.test.ts` | End-to-end scenario |

### Scenario 3: Language filter works
| Artifact | Coverage |
|----------|----------|
| `../bookstore-app-claude/src/search/validate-filters.ts` | Validates language against allow-list |
| `../bookstore-app-claude/src/search/query-builder.ts` | Applies language filter predicate |
| `../bookstore-app-claude/tests/search/query-builder.test.ts` | Language-only filter test |
| `../bookstore-app-claude/tests/acceptance/non-fiction-filters.test.ts` | End-to-end scenario |

### Scenario 4: Publication Date filter works
| Artifact | Coverage |
|----------|----------|
| `../bookstore-app-claude/src/search/date-filter.ts` | Relative date computation (injectable clock) |
| `../bookstore-app-claude/src/search/query-builder.ts` | Applies publication date filter |
| `../bookstore-app-claude/tests/search/date-filter.test.ts` | Boundary tests with mocked clock |
| `../bookstore-app-claude/tests/acceptance/non-fiction-filters.test.ts` | End-to-end scenario |

### Scenario 5: Customer Reviews filter works
| Artifact | Coverage |
|----------|----------|
| `../bookstore-app-claude/src/web/search-filters-panel.ts` | Clickable star-rating control |
| `../bookstore-app-claude/src/search/query-builder.ts` | Applies minRating filter predicate |
| `../bookstore-app-claude/tests/web/search-filters-panel.test.ts` | Star-rating selection behavior |
| `../bookstore-app-claude/tests/acceptance/non-fiction-filters.test.ts` | End-to-end scenario |

### Scenario 6: Consistency with Fiction
| Artifact | Coverage |
|----------|----------|
| `../bookstore-app-claude/src/catalog/filter-catalog.ts` | Shared catalog config for both categories |
| `../bookstore-app-claude/tests/catalog/filter-catalog.test.ts` | Parity assertion: fiction === non-fiction |
| `../bookstore-app-claude/tests/acceptance/non-fiction-filters.test.ts` | Cross-category consistency test |

### Scenario 7: Clear all filters
| Artifact | Coverage |
|----------|----------|
| `../bookstore-app-claude/src/web/search-filters-panel.ts` | clearAll() method via onChange path |
| `../bookstore-app-claude/src/web/filter-state-persistence.ts` | Persists empty filters on clearAll |
| `../bookstore-app-claude/tests/web/search-filters-panel.test.ts` | Verifies onChange emission with empty filters |
| `../bookstore-app-claude/tests/web/filter-state-persistence.test.ts` | Asserts load(category) empty after clearAll |
| `../bookstore-app-claude/tests/acceptance/non-fiction-filters.test.ts` | End-to-end scenario |

### Scenario 8: Filter state is preserved after page refresh
| Artifact | Coverage |
|----------|----------|
| `../bookstore-app-claude/src/web/filter-state-persistence.ts` | FilterStatePort.save()/load() with validation |
| `../bookstore-app-claude/tests/web/filter-state-persistence.test.ts` | Round-trip, category isolation, stale-value drop |
| `../bookstore-app-claude/tests/web/results-view.test.ts` | Hydration from persistence on construction |
| `../bookstore-app-claude/tests/acceptance/non-fiction-filters.test.ts` | End-to-end scenario |

### Scenario 9: Filtering works with sorting
| Artifact | Coverage |
|----------|----------|
| `../bookstore-app-claude/src/catalog/book.ts` | Book.price field |
| `../bookstore-app-claude/src/catalog/filter-catalog.ts` | SortOption type, getSortOptions(category) |
| `../bookstore-app-claude/src/search/query-builder.ts` | Filter -> Sort -> Paginate execution order |
| `../bookstore-app-claude/src/api/search-endpoint.ts` | ?sort= query parameter |
| `../bookstore-app-claude/src/web/search-filters-panel.ts` | selectSort() method |
| `../bookstore-app-claude/tests/search/query-builder.test.ts` | Sorting tests, stable-sort, execution order |
| `../bookstore-app-claude/tests/acceptance/non-fiction-filters.test.ts` | End-to-end scenario |

## Change Summary for EPMCDMETST-52015

### Initial Implementation (Filtering + Clear All + Persistence)
- Non-Fiction search filters with Fiction parity (6 scenarios)
- Clear All Filters functionality
- Filter state persistence across page refresh

### Delta: Sorting Integration
- **New Scenario**: "Filtering works with sorting"
- **Modified**: `Book` model extended with `price` field (DR-011)
- **Modified**: `filter-catalog.ts` - added `SortOption` type and `getSortOptions()`
- **Modified**: `query-builder.ts` - added sorting logic (Filter -> Sort -> Paginate per DR-013)
- **Modified**: `validate-filters.ts` - added sort parameter validation
- **Modified**: `seed-data.json` - added price values ($5-$50 range, includes duplicates for stable-sort testing)
- **Modified**: All affected components to support sort state in `SelectedFilters`

### Execution Order
Per approved architecture (DR-013): **Filter -> Sort -> Paginate**

