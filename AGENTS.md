# Nuke Agent Doc (NAD): docs-template

## Purpose

Reusable documentation site template for NukeHub projects. It is a **NukeHub-first** Astro + React + Tailwind v4 site, designed to be forked or used as a GitHub template for project documentation.

## Ownership

This root `AGENTS.md` owns the NAD hierarchy, project-wide workflow rules, cross-domain standards, and the template structure itself. Domain-specific guidance lives in child `AGENTS.md` files listed in the Child NAD Index.

## NAD Core Contract

- `AGENTS.md` files are binding work contracts for their subtrees.
- Work products, source materials, instructions, records, assets, and durable docs must stay understandable from the nearest applicable `AGENTS.md` plus every parent `AGENTS.md` above it.

### Read Before Editing

1. Read this root `AGENTS.md`.
2. Identify every file or folder you expect to touch.
3. Walk from the repository root to each target path.
4. Read every `AGENTS.md` found along each route.
5. If a parent `AGENTS.md` lists a child `AGENTS.md` whose scope contains the path, read that child and continue from there.
6. Use the nearest `AGENTS.md` as the local contract and parent docs for repo-wide rules.
7. If docs conflict, the closer doc controls local work details, but no child doc may weaken NAD.

### Update After Editing

Every meaningful change requires a NAD pass before the task is done.

Update the closest owning `AGENTS.md` when a change affects:

- purpose, scope, ownership, or responsibilities
- durable structure, contracts, workflows, or operating rules
- required inputs, outputs, permissions, constraints, side effects, or artifacts
- user preferences about behavior, communication, process, organization, or quality
- `AGENTS.md` creation, deletion, move, rename, or index contents

Update parent docs when parent-level structure, ownership, workflow, or child index changes. Update child docs when parent changes alter local rules. Remove stale or contradictory text immediately. Small edits that do not change behavior or contracts may leave docs unchanged, but the NAD pass still must happen.

Update `README.md` when a change alters user-visible behavior — features, public API (shortcodes, config files), file formats, install/dev workflows, or deployment steps.

## Hierarchy

- Root `AGENTS.md` is the NAD rail: project-wide instructions, global preferences, durable workflow rules, and the top-level Child NAD Index.
- Child `AGENTS.md` files own domain-specific instructions and their own Child NAD Index.
- Each parent explains what its direct children cover and what stays owned by the parent.
- The closer a doc is to the work, the more specific and practical it must be.

## Child Doc Shape

Create a child `AGENTS.md` when a folder becomes a durable boundary with its own purpose, rules, responsibilities, workflow, materials, or quality standards.

Default section order:

- Purpose
- Ownership
- Local Contracts
- Work Guidance
- Verification
- Child NAD Index

## Style

- Keep docs concise, current, and operational.
- Document stable contracts, not diary entries.
- Put broad rules in parent docs and concrete details in child docs.
- Prefer direct bullets with explicit names.
- Do not duplicate rules across many files unless each scope needs a local version.
- Delete stale notes instead of explaining history.
- Trim obvious statements, repeated rules, misplaced detail, and warnings for risks that no longer exist.

## Closeout

1. Re-check changed paths against the NAD chain.
2. Update the nearest owning docs and any affected parents or children.
3. Refresh every affected Child NAD Index.
4. Remove stale or contradictory text.
5. Run existing verification when relevant.
6. Report any docs intentionally left unchanged and why.

## User Preferences

When the user requests a durable behavior change, record it here or in the relevant child `AGENTS.md`.

---

## docs-template Project Guidance

## Required tooling

Install once before making changes:

- **Node.js** 22 LTS (CI pins this version).
- **npm** (comes with Node).

## Before committing

Run these from the repo root. They are the canonical "did I break anything" checks — the same checks run in `.github/workflows/ci.yml` on every pull request and push to `main`:

```bash
npm install
npm run lint            # eslint . — zero errors required
npm run format:check    # prettier check on src/**, root configs, scripts, and YAML
npm run check           # astro typecheck
npm run build           # sync docs + astro build
```

Notes:

- `npm run lint` must end with `0 errors`.
- `npm run build` must produce a static `dist/` with no errors.
- Routes like `/<base>/` and `/<base>/tutorials/getting-started/` must render.
- `npm run dev` syncs docs and starts the Astro dev server on `http://localhost:4321/<base>`.

## Architecture pointer

High-level layout:

- `astro.config.mjs` — Astro config and integrations. The kit uses relative imports internally; this template adds a TypeScript `@/*` alias pointing at `src/*` for local imports.
- `src/content.config.ts` — Astro content collection schema for `docs`.
- `src/content/` — synced docs content (generated by `nukehub-sync-docs`, gitignored at this level).
- `src/data/` — `site.ts`, `nav.ts`, `footer.ts` (project-specific identity).
- `src/pages/` — `[...slug].astro` and `404.astro` import layouts from `@nukehub/docs-kit` and pass project data as props.
- `@nukehub/docs-kit` (npm package) — shared UI, layouts, shortcodes, theme CSS, sync script, and markdown-negotiation integration.
- `public/_worker.js` — Cloudflare Pages advanced-mode Worker for `Accept: text/markdown` content negotiation.
- `.github/workflows/ci.yml` — PR/push CI: format check, lint, typecheck, build.
- `.github/workflows/deploy.yml` — builds and deploys to GitHub Pages on pushes to `main`.

## Local Contracts

- **Config-driven identity**: all project-specific values live in `src/data/site.ts`, `src/data/nav.ts`, and `src/data/footer.ts`.
- **Docs live in `docs/`**: the `nukehub-sync-docs` CLI (from `@nukehub/docs-kit`) copies `./docs/` into `src/content/docs/`, rewrites `.md` links, injects frontmatter, copies `CHANGELOG.md`, and renames `docs/README.md` → `src/content/docs/index.md`.
- **Sample docs are placeholders**: the `docs/` directory inside this repo exists only for standalone preview. Real projects replace these files.
- **MDX shortcodes**: `Callout`, `Tabs`, `TabItem`, `FileTree`, `Mermaid`, `Steps`, `Step`, `YouTube`, `Odysee`, `ImageFigure`, and `DataTable` are available in `.mdx` files and mapped in the kit's `DocLayout`. `Plotly` and `Model3D` are also enabled in this template via the `mdxComponents` prop; they require the optional peer dependencies `plotly.js-dist-min` and `three`.
- **Code copy buttons**: every `<pre>` block inside `.prose` automatically gets a copy button via the inline script in the kit's `BaseLayout`.
- **Custom context menu**: `GlobalContextMenu` is mounted in the kit's `BaseLayout` and provides search, copy, back-to-top, and nav links. It relies on `framer-motion` and the `.bubble` utility in the kit's `global.css`.
- **Theme engine**: stores the preference in `localStorage` under `docs-theme` and applies it via `data-theme` on `<html>`. The default is dark. Accent color is stored under `docs-accent` and applied via `data-accent`; the favicon and `<meta name="theme-color">` are regenerated to match the resolved theme and accent.
- **Kit updates**: shared code lives in the `@nukehub/docs-kit` package. Bump the kit version in `package.json` or run `npm update @nukehub/docs-kit` to pull in updates. For local development against a checked-out kit, temporarily point the dependency to `file:../nukehub-docs-kit` and run `npm install`.

## Work Guidance

- Keep the template generic; do not hardcode project-specific content beyond sample docs.
- Match the existing component style: functional React components, `cn()` for classes, `lucide-react` icons.
- Use `data-theme` for theming. The storage key is `docs-theme` and the default is dark.
- When adding a new top-level docs section, the sidebar order is derived from file-system order and frontmatter `sidebar.order`. Use `sidebar.order` in your Markdown frontmatter to override ordering.
- Internal Markdown links must never contain `.md` in the rendered output; `sync-docs.mjs` handles this.
- Markdown siblings are generated for every page. The `markdown-negotiation` integration converts each page's rendered article to Markdown and writes it next to the HTML. Do not add a client-side redirect for `.md` URLs — the static files (and the Cloudflare Worker where applicable) handle them.
- Do not commit build outputs (`dist/`, `.astro/`) or dependencies (`node_modules/`). Use the provided `.gitignore`.
- Keep React islands lightweight. Heavy dependencies (for example, `mermaid`) should be dynamically imported inside client components and rendered with `client:visible` or `client:load` only when needed.

## Deployment

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main` that touches docs, source, scripts, public assets, or workflow files. The repository Pages source must be set to **GitHub Actions**.

The `base` value in `src/data/site.ts` must match the GitHub repository name for GitHub Pages deployments.

## Common pitfalls

- **All pages route through the kit's `BaseLayout.astro`.** A head/SEO or global UI change there affects every site that consumes the kit; change it in `@nukehub/docs-kit`, not in this repo.
- **React islands run on the client.** Any direct use of `document` or `window` outside `useEffect` (or without a mounted guard) will fail SSR. Use `client:only="react"` or the `mounted` pattern from `GlassContextMenu` if a component must never render on the server.
- **Do not edit generated files.** `dist/`, `.astro/`, `src/content/docs/`, and `node_modules/.vite/` are regenerated. Change source only.
- **MDX shortcodes must be passed to `<Content />` in the kit's `DocLayout.astro`.** Adding a new shortcode requires both a component in `@nukehub/docs-kit` and an entry in the kit's `components` prop. Opt-in shortcodes such as `Plotly` and `Model3D` are passed through the `mdxComponents` prop instead of being registered by default.
- **Sync docs before verifying.** `npm run build` and `npm run dev` run `sync-docs` automatically, but running `astro build` directly will use stale `src/content/docs/`.
- **Kit changes must be installed to take effect.** After editing `@nukehub/docs-kit` locally, run `npm install` (or `npm update @nukehub/docs-kit` for a published version) in this repo to see the changes.

## Child NAD Index

No children yet. Create a child `AGENTS.md` if the template grows a durable sub-boundary (for example, a separate `packages/` workspace or a custom integration folder).
