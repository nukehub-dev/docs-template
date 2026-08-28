---
title: Getting Started
sidebar:
  order: 0
---

# Getting Started

This tutorial walks you through using the Docs Template for a new project.

## Create a new repo from the template

1. Visit the template repository on GitHub.
2. Click **Use this template** and choose a name for your new repo.
3. Clone the new repo locally.

## Configure the site

Open `src/data/site.ts` and update the values.

### Site metadata

```ts
export const SITE = {
  name: "Your Project",
  logoText: "Your Project",
  description: "A short description of your project.",
  site: "https://your-org.github.io",
  base: "/your-repo",
  github: "https://github.com/your-org/your-repo",
  editBranch: "main",
  editPath: "docs/",
};
```

### Repository base path

The `base` value must match your repository name for GitHub Pages deployments.
If you deploy to a custom domain instead of GitHub Pages, you can set `base` to `"/"`.

## Add documentation

Create Markdown or MDX files in the `docs/` directory at the repo root.

### Folder structure

```text
docs/
├── README.md
├── tutorials/
│   └── getting-started.md
└── reference/
    └── index.md
```

### Sync before building

Run `npm run sync-docs` to copy `docs/` into the site before building.
This keeps user-facing docs separate from the site implementation.

## Preview locally

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:4321/docs-template/`.
