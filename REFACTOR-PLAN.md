# Refactor: Simple.css → Pico.css

**Status:** Implementation in progress — all code changes done, build verification pending.

## Steps

1. **Deps:** `pnpm remove simpledotcss` + `pnpm add @picocss/pico` ✅
2. **SiteShell.astro:** `import 'simpledotcss/simple.min.css'` → `import '@picocss/pico/css/pico.classless.min.css'` ✅
3. **global.css:** Rewritten with Pico CSS var overrides for light/dark themes, backwards-compat vars (`--bg`, `--particle`, `--text`), link styles, heading sizes, `article[data-tpl]` un-card override, view-transition. ✅
4. **ThemeToggle.astro:** Removed JS style injection, added `sessionStorage` persistence, simplified toggle logic. ✅
5. **public/themeToggle.js:** Added `data-theme` attr on load to prevent FOUC. ✅
6. **.npmrc:** Created with `onlyBuiltDependencies` for esbuild/protobufjs/re2/sharp (required for build). ✅
7. **Verify:** `pnpm build` — **PENDING** (user requested no further changes beyond current state)
