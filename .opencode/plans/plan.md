# Plan: Monorepo Restructure

**Status: plan only - NOT implemented.**

LATEST UPDATE: shelving this restructure plan (unimplemented still) in favor of Firebase-hosted sites like Three.js Journey challenges (e.g. "leis-lab-{name}.web.app") to avoid diverging & accumulating project dependencies (e.g. "three"). May return to this depending on iframe approach success.

## Goal

Convert the repo into a pnpm-workspace monorepo:

- `apps/web` holds the Astro blog (moved from repo root). Blog output remains the `dist` root.
- `apps/experiments/*` holds experiment projects. Each outputs to `dist/experiments/<slug>/`.
- Experiments start as plain placeholder HTML files (no Vite build pipeline yet). Fleshed out later, beginning with the Three.js "Elemental" project.

## Key mechanics

- Astro copies `apps/web/public/**` to `dist/**` on build.
- Static experiment pages live at `apps/web/public/experiments/<slug>/index.html`.
- Resulting URL: `/experiments/<slug>`. Also served by `astro dev` locally.
- `dist/` stays at repo root, so `firebase.json` (`public: "dist"`) is unchanged.

## Target structure

```
/                                    repo root
├── package.json                     root orchestration scripts + firebase-tools
├── pnpm-workspace.yaml              packages: ["apps/web", "apps/experiments/*"]
├── firebase.json                    unchanged (public: "dist", "**" SPA rewrite)
├── apps/
│   ├── web/                         Astro blog (moved from repo root)
│   │   ├── src/                     astro pages, content, components, lib, styles
│   │   ├── public/
│   │   │   └── experiments/<slug>/index.html   staged static output
│   │   └── astro.config.mjs         outDir -> repo root dist
│   └── experiments/
│       ├── <slug>/                  source for each experiment (placeholder for now)
│       └── ...                      future Three.js projects
├── dist/                            repo-root build output
│   ├── index.html, _astro, sitemap  blog at dist root
│   └── experiments/<slug>/index.html
```

Note: `.gitignore` should ignore built experiment output so only source HTML is tracked.

## Steps

1. **Workspace setup**
   - Update `pnpm-workspace.yaml` packages to `["apps/web", "apps/experiments/*"]`.
   - Run `pnpm install`.

2. **Move blog into apps/web**
   - `git mv` blog files (src, public, astro.config.mjs, tsconfig.json, tailwind.config.cjs, package.json, env.d.ts, .astro) into `apps/web/`.
   - Set `astro.config.mjs` `outDir` to repo-root `dist`.

3. **Experiment placeholder**
   - Create `apps/experiments/<slug>/index.html` as source placeholder (simple heading, note that content is coming).
   - Stage it as `apps/web/public/experiments/<slug>/index.html` so Astro copies it to `dist/experiments/<slug>/`.

4. **Experiments index page and nav**
   - Add `src/pages/experiments/index.astro` listing experiments from a small static array of `{ slug, name, description }`, linking to `/experiments/<slug>`.
   - Add an "Experiments" link to the site nav in `SiteShell.astro`.

5. **Root scripts**
   - `dev` -> `pnpm --filter apps/web dev`
   - `build` -> `pnpm --filter apps/web build`
   - `deploy` -> `firebase deploy --only hosting`
   - `clean` -> remove `dist`.

6. **CI**
   - `.github/workflows/deploy.yml` keeps `pnpm install && pnpm build && firebase deploy`; no change needed.

## Firewall note

- Requests to `/experiments/<slug>` resolve to the static file before the `**` SPA rewrite, so routing keeps working with no firebase.json change.

## Open questions

1. Legacy `public/simulation` (prebuilt 8.6M experiment currently at `/simulation`):
   - Leave in place at `/simulation`, or move under `/experiments/simulation` (requires rewriting its absolute asset URLs)?
2. Confirm the first placeholder experiment slug (suggestion: `elemental`).
