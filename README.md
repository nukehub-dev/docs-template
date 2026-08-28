# Docs Template

A NukeHub-first documentation template built with **plain Astro + React + Tailwind CSS v4** and the shared `@nukehub/docs-kit` package. Every pixel of the header, footer, sidebar, search, and theme is custom and reusable.

## What this template is

This repository is the **reference consumer** of [`@nukehub/docs-kit`](https://github.com/nukehub-dev/nukehub-docs-kit). It shows how to build a NukeHub documentation site from a thin layer of project-specific files while the shared components, layouts, shortcodes, and integrations live in the kit and update automatically via `npm update @nukehub/docs-kit`.

The content workflow stays the same:

- Write docs in Markdown/MDX under `docs/` in the repo root.
- Run `npm run sync-docs` to copy and clean them into `src/content/docs/`.
- Build a static site ready for GitHub Pages.

## How to use this template for a new project

1. Click **Use this template** on GitHub and create a new repository.
2. Clone the new repository.
3. Install dependencies:

   ```bash
   npm install
   ```

   The kit is installed automatically as a dependency.

4. Update project identity in `src/data/site.ts`:

   ```ts
   import { Logo, type SiteConfig } from "@nukehub/docs-kit";

   export const SITE: SiteConfig = {
     name: "Your Project",
     logoText: "Your Project",
     description: "A short description.",
     site: "https://your-org.github.io",
     base: "/your-repo",
     github: "https://github.com/your-org/your-repo",
     editBranch: "main",
     editPath: "docs/",
     logo: Logo,
   };
   ```

   The `base` value must match your GitHub repository name.

5. Customize `src/data/nav.ts` and `src/data/footer.ts`.
6. Add your own documentation under `docs/` in the repo root.
7. Run `npm run dev` to preview locally.
8. Push to `main`; the GitHub Actions workflow in `.github/workflows/deploy.yml` publishes to Pages.

## Customizing identity, nav, and footer

| File                 | Purpose                                           |
| -------------------- | ------------------------------------------------- |
| `src/data/site.ts`   | Site name, description, `base` path, GitHub URLs. |
| `src/data/nav.ts`    | Header navigation items.                          |
| `src/data/footer.ts` | Footer link columns.                              |

Update these three files to rebrand the site. The kit provides the shared `Logo`, `GitHubIcon`, and type definitions so your data stays small and focused.

### `src/data/site.ts`

```ts
import { Logo, type SiteConfig } from "@nukehub/docs-kit";

export const SITE: SiteConfig = {
  name: "Your Project",
  logoText: "Your Project",
  description: "A short description.",
  site: "https://your-org.github.io",
  base: "/your-repo",
  github: "https://github.com/your-org/your-repo",
  editBranch: "main",
  editPath: "docs/",
  logo: Logo,
};
```

- `site` + `base` must match your GitHub Pages URL.
- `editBranch` and `editPath` build the "Edit this page" links.
- `logo` accepts the kit's `Logo` component or your own.

### `src/data/nav.ts`

```ts
import { Home, BookOpen } from "lucide-react";
import { GitHubIcon, type NavItem } from "@nukehub/docs-kit";

export const navItems: NavItem[] = [
  { title: "Home", icon: Home, url: "./" },
  { title: "Docs", icon: BookOpen, url: "./tutorials/getting-started/" },
  {
    title: "GitHub",
    icon: GitHubIcon,
    url: "https://github.com/your-org/your-repo",
    newpage: true,
  },
];
```

Use `lucide-react` icons or the kit's `GitHubIcon`. Set `newpage: true` to open the link in a new tab.

### `src/data/footer.ts`

```ts
import type { FooterColumn, FooterLink } from "@nukehub/docs-kit";

export const footerColumns: FooterColumn[] = [
  {
    title: "Project",
    links: [
      {
        title: "License",
        url: "https://github.com/your-org/your-repo/blob/main/LICENSE",
        newpage: true,
      },
    ],
  },
];

export const footerLegal: FooterLink[] = [];
```

## Installing and updating the kit

The kit is declared as a normal npm dependency:

```bash
npm install @nukehub/docs-kit
```

To pull in the latest kit updates:

```bash
npm update @nukehub/docs-kit
```

After updating, run `npm run build` to verify your site still compiles. The kit follows semver; breaking changes bump the major version.

## Adding documentation

Create files under `docs/`:

```text
docs/
├── README.md          # Becomes the home page
├── tutorials/
│   └── getting-started.md
├── reference/
│   └── index.md
├── development/
│   └── local-dev.md
└── architecture/
    └── overview.md
```

Each page supports this frontmatter:

```yaml
---
title: Page Title
description: A short description.
sidebar:
  label: Short label
  order: 1
draft: false
---
```

The root `README.md` is renamed to `index.md` automatically, and internal `.md` links are rewritten to clean trailing-slash routes. This is handled by the `nukehub-sync-docs` CLI from `@nukehub/docs-kit`.

## How `nukehub-sync-docs` works

`npm run sync-docs` runs:

```bash
nukehub-sync-docs --src ./docs --dst ./src/content/docs --repo-root . --github-file-base https://github.com/nukehub-dev/docs-template/blob/main
```

It:

1. Copies every `.md`/`.mdx` file from `docs/` into `src/content/docs/`.
2. Injects frontmatter if a file is missing it.
3. Rewrites internal `.md` links to trailing-slash routes.
4. Copies `CHANGELOG.md` from the repo root (if present).
5. Renames `docs/README.md` to `src/content/docs/index.md`.

You usually do not run this manually — `npm run dev` and `npm run build` call it automatically via `predev`/`prebuild`.

## Kit integration in `astro.config.mjs`

The template wires the kit's `markdownNegotiation` integration so every built HTML page gets a Markdown sibling:

```mjs
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { SITE } from "./src/data/site.ts";
import markdownNegotiation from "@nukehub/docs-kit/integrations/markdown-negotiation";

export default defineConfig({
  site: SITE.site,
  base: SITE.base,
  output: "static",
  integrations: [react(), mdx(), sitemap(), markdownNegotiation()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

Do not remove `markdownNegotiation()` unless you do not want Markdown siblings.

## Available kit exports

Import from the package root for shared types, icons, and helpers:

```ts
import {
  Logo,
  GitHubIcon,
  type SiteConfig,
  type NavItem,
  type FooterColumn,
} from "@nukehub/docs-kit";
```

Import layouts directly from their subpaths (Astro `.astro` files cannot be re-exported from a `.ts` index):

```astro
---
import DocLayout from "@nukehub/docs-kit/components/layout/DocLayout.astro";
import BaseLayout from "@nukehub/docs-kit/components/layout/BaseLayout.astro";
import NotFound from "@nukehub/docs-kit/components/docs/NotFound.astro";
---
```

Import the build integration from its subpath:

```ts
import markdownNegotiation from "@nukehub/docs-kit/integrations/markdown-negotiation";
```

## UI Showcase

The template ships with a sample `docs/ui-showcase.mdx` page that demonstrates every UI primitive from `@nukehub/docs-kit`. It is a regular docs page, so it gets the header, sidebar, footer, and table of contents like every other page. Delete or replace it when you use this template for a real project.

## Customizing MDX shortcodes

The kit registers these shortcodes in `DocLayout` automatically:

`Callout`, `Tabs`, `TabItem`, `FileTree`, `Mermaid`, `Steps`, `Step`, `YouTube`, `Odysee`, `ImageFigure`, `DataTable`.

To add a project-specific shortcode, edit `src/pages/[...slug].astro` and pass a `components` prop to `DocLayout`:

```astro
---
import DocLayout from "@nukehub/docs-kit/components/layout/DocLayout.astro";
import MyCustomComponent from "../components/MyCustomComponent.astro";
---

<DocLayout
  doc={doc}
  headings={headings}
  allDocs={allDocs}
  site={SITE}
  navItems={navItems}
  footerColumns={footerColumns}
  footerLegal={footerLegal}
  components={{ MyCustomComponent }}
/>
```

Then use it in any `.mdx` file:

```mdx
<MyCustomComponent />
```

## Development scripts

| Script                 | Purpose                              |
| ---------------------- | ------------------------------------ |
| `npm run dev`          | Sync docs and start the dev server.  |
| `npm run build`        | Sync docs and build the static site. |
| `npm run preview`      | Preview the built site.              |
| `npm run check`        | Run Astro type checks.               |
| `npm run lint`         | Run ESLint.                          |
| `npm run format`       | Format files with Prettier.          |
| `npm run format:check` | Check formatting without writing.    |

## MDX shortcodes

Pages written as `.mdx` can use these components without importing them:

```mdx
<Callout type="tip" title="Tip">
  Run `npm run sync-docs` before building to refresh content. The script is provided by
  `@nukehub/docs-kit`.
</Callout>

<Tabs defaultValue="npm">
  <TabItem value="npm" label="npm">
    npm install
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
    pnpm install
  </TabItem>
</Tabs>

<FileTree items={[{ name: "docs", children: [{ name: "README.md" }] }]} />

<Mermaid chart={`flowchart LR; A --> B`} />

<Steps>
  <Step>Do this first.</Step>
  <Step>Then do this.</Step>
</Steps>

<YouTube id="dQw4w9WgXcQ" title="Getting started" />

<ImageFigure src="/docs-template/screenshot.png" alt="Screenshot" caption="Docs template" />

<DataTable
  columns={[{ key: "name", header: "Name" }]}
  data={[{ name: "U-235" }]}
  sortable
  searchable
/>
```

Supported types for `<Callout>`: `info`, `note`, `warning`, `tip`, `success`, `danger`.

Code blocks in Markdown and MDX automatically get a copy button.

## Project structure

This repo owns only the thin project layer. All shared UI, layouts, shortcodes, theme, and build tooling live in the `@nukehub/docs-kit` package.

```text
.
├── astro.config.mjs       # Astro + kit integration config
├── docs/                  # Your Markdown/MDX documentation
│   ├── README.md          # Becomes the home page
│   └── ...
├── public/                # Static assets (favicon, worker script)
├── src/
│   ├── content/           # Synced docs content (generated, gitignored)
│   ├── content.config.ts  # Astro content collection schema
│   ├── data/              # site.ts, nav.ts, footer.ts (project-specific)
│   ├── env.d.ts           # Astro client types
│   └── pages/             # Routing pages that pass data into kit layouts
└── package.json           # Declares @nukehub/docs-kit as a dependency
```

Do not add copies of kit components or styles to `src/`. Update the kit via `npm update @nukehub/docs-kit` instead.

## Troubleshooting

- **Kit changes not appearing**: run `npm update @nukehub/docs-kit` and then `npm run build`.
- **Stale content**: run `npm run sync-docs` manually or delete `src/content/docs/` and rebuild.
- **`base` path mismatch**: the `base` value in `src/data/site.ts` must match your GitHub repository name (e.g., `/your-repo`).
- **404 on refresh**: GitHub Pages is configured for static hosting; ensure Pages source is set to **GitHub Actions**.

## Deployment

The included `.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main`. Make sure the repository Pages source is set to **GitHub Actions**.

## Markdown content negotiation

Every built HTML page also gets a Markdown sibling. For example, `/tutorials/getting-started/` has a matching `/tutorials/getting-started/index.md`.

- Direct `.md` URLs serve the Markdown file.
- `public/_worker.js` enables `Accept: text/markdown` content negotiation on hosts that support Cloudflare Pages advanced-mode Workers.
- GitHub Pages serves the generated `.md` files statically, but cannot negotiate by `Accept` header.

## Design notes

- The theme engine stores the preference in `localStorage` under `docs-theme` and applies it via `data-theme` on `<html>`. Accent color is stored under `docs-accent` and applied via `data-accent`; the favicon and `<meta name="theme-color">` follow the resolved theme and accent.
- `public/favicon.svg` is the no-JS fallback. When JavaScript runs, the kit replaces it with a data-URI SVG colored from the current `--primary` CSS variable.
- The command palette indexes doc titles, descriptions, and categories; open it with **Cmd/Ctrl+K**.
- Right-click anywhere to open a custom context menu with search, copy, and navigation.
- The sidebar is generated from the synced docs file tree.
- A scroll-progress bar appears at the top of doc pages.
- Code blocks get an automatic copy button.

## License

BSD-2-Clause — see the `LICENSE` file.
