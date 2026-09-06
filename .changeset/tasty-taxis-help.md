---
"urql-devtools": major
---

Big refactor landed:

- Jest → Vitest for tests
- styled-components → vanilla-extract for styling (all .css.ts now)
- Manifest V3 migration for the extension
- Added prettier + flat ESLint config
- Service worker keepalive + extension context invalidation fixes
- New build scripts, removed webpack configs (using tsup)
- Better connection handling & context-based routing
- CI workflows updated
