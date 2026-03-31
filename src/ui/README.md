# UI Layer (`src/ui`)

This directory contains a self-contained, presentational-only extraction of the app UI.

## Purpose

- Preserve original visual output (markup + class names + CSS values).
- Remove app/business dependencies (API, SWR, services, loaders, mutations).
- Keep components usable in isolation with safe defaults and mock data.

## Quick Start

- Preview all extracted states at [`/ui-preview`](../pages/ui-preview.tsx).
- Use [`src/ui/pages/index.tsx`](./pages/index.tsx) for the primary home UI.
- Use [`src/ui/pages/404.tsx`](./pages/404.tsx) and [`src/ui/pages/500.tsx`](./pages/500.tsx) for error screens.

## Directory Layout

- `assets/` copied visual assets.
- `components/` presentational UI components.
- `hooks/` UI-only hooks.
- `lib/` UI-only helper renderers (for example toast view).
- `mocks/` fallback values and mock data.
- `pages/` extracted page-level views.
- `stubs/` local replacements for removed dependencies.
- `styles/` copied global/module CSS.
- `tokens/` extracted design-token constants.
- `types.ts` shared UI types.

## Rendering States

Home view supports visual states via props:

- `default`
- `loading`
- `empty`
- `error`

Example:

```tsx
<HomeView state="loading" />
<HomeView state="empty" initialTasks={[]} />
```

## Component Contracts

- Components are designed to mount independently.
- Optional callbacks default to no-op handlers.
- Missing task-like data falls back to `fallbackTask`.
- Missing refs use `fallbackElementRef`.

Shared fallbacks live in [`mocks/fallbacks.ts`](./mocks/fallbacks.ts).

## Stubs and Mocks

- Translation stub: [`stubs/use-translation.ts`](./stubs/use-translation.ts)
- Task mock list: [`mocks/tasks.ts`](./mocks/tasks.ts)

These replace runtime dependencies and should remain lightweight.

## Styling Rules

- Do not rename CSS classes used by extracted components.
- Do not alter CSS values unless explicitly changing visuals.
- Keep `globals.css` variables and theme behavior intact.

## Naming Conventions

- Hooks and stubs use kebab-case file names.
- Component files follow existing structure and names.
- Prefer importing shared types/fallbacks over re-declaring them.

## Maintenance Guidelines

- Keep this layer presentational.
- If logic is needed for demos, use local state only.
- Add new mock states through props instead of service wiring.
- Prefer duplication over risky abstraction when preserving visuals.
