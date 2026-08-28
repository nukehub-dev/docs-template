# Reference

This section is for detailed reference material.

## Content frontmatter

Each doc page supports the following frontmatter fields:

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Required. Page title used in the sidebar and heading. |
| `description` | string | Optional. Used in search results and meta tags. |
| `sidebar.label` | string | Optional. Override the sidebar label. |
| `sidebar.order` | number | Optional. Control ordering within a section. |
| `draft` | boolean | Optional. Draft pages are excluded from the build. |

## Sidebar grouping

Pages are grouped by their top-level directory under `docs/`:

- `tutorials/`
- `reference/`
- `development/`
- `architecture/`
- `plan/`
- `examples/`

The root `README.md` becomes the home page.
