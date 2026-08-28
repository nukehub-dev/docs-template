# Local Development

How to set up the Docs Template for local development.

## Requirements

- Node.js 22 or later
- npm 10 or later

## Install dependencies

```bash
npm install
```

## Sync and serve

```bash
npm run dev
```

This runs `npm run sync-docs` first, then starts the Astro dev server.

## Available scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Sync docs and start the dev server. |
| `npm run build` | Sync docs and build the static site. |
| `npm run preview` | Preview the built site. |
| `npm run check` | Run Astro type checks. |
| `npm run lint` | Run ESLint. |
| `npm run format` | Format files with Prettier. |
| `npm run format:check` | Check formatting without changing files. |

## Project structure

```text
src/
├── components/    # React and Astro components
├── content/       # Synced docs content
├── data/          # Site, nav, and footer configuration
├── lib/           # Utilities and theme logic
├── pages/         # Astro routing
└── styles/        # Global CSS and Tailwind theme tokens
```
