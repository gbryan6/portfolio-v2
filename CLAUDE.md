# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Next.js dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint (`next/core-web-vitals`)

There is no test runner configured in this project.

## Architecture

Personal portfolio built with **Next.js 14 App Router**, **TypeScript**, and **styled-components**. The UI mimics a VS Code editor (file tree, tabs, code panes, typewriter effect). Content is in Portuguese.

**When touching UI (tokens, theme, or any component under `src/components/`), read `docs/design-system.md` first** — it documents the design tokens, how to consume them, the transient-props (`$`) convention, and the component checklist.

### Routing

- `src/app/layout.tsx` — root layout: loads the Fira Code Google font as a CSS variable and wraps everything in `<Providers>`.
- `src/app/(main)/layout.tsx` — shared chrome (`Header`, `Footer`) for all pages.
- `src/app/(main)/(routes)/` — the actual pages: `page.tsx` (home), `about-me/`, `projects/`, `contact-me/`.
- Every page component is a Client Component (`'use client'`) because styled-components and the context hooks require the client.

### Providers (`src/hooks/Providers.tsx`)

Nesting order matters: `StyledComponentsRegistry` → `GlobalStyles` → `ThemeSwitcherProvider` → `TabsProvider`.

- `src/app/lib/registry.tsx` — `StyledComponentsRegistry` handles SSR style injection via `useServerInsertedHTML`. Required for styled-components to work with the App Router; keep it as the outermost provider.
- `next.config.js` enables the `styledComponents` SWC compiler option — needed for the registry to collect styles.

### Theming

- `src/styles/theme.ts` — `dark` and `light` theme objects (colors + typography scale). Dark is the default.
- `src/hooks/Theme.tsx` — `ThemeSwitcherProvider` / `useTheme()`. Persists the selected theme to `localStorage` under the key `theme` (stores the whole serialized theme object, not just the name) and rehydrates on mount.
- `src/app/types/styled.d.ts` — the `Theme` type; also augments styled-components' `DefaultTheme`. Update this when adding a color or typography token, then add the value to **both** `dark` and `light` in `theme.ts`.
- `src/styles/GlobalStyles.ts` — global reset, `html { font-size: 62.5% }` (so `1rem` = 10px), and the `.slide-in` animation.

### Tabs system (`src/hooks/Tabs.tsx`)

`TabsProvider` / `useTabs()` is a global editor-tab model shared across pages. Holds the open `tabs[]`, the `activeInfo` toggle (`'dev' | 'hobbies'`), and `addTab` / `removeTab` / `setActiveTab`. The `about-me` page drives this: `SideNav` opens tabs from `_data.tsx`, `TabBar` renders them, `TabContentEditor` renders the active tab's `content` as numbered code lines.

### Components — Atomic Design

`src/components/{atoms,molecules,organisms}/`. Each component is a folder with `index.tsx` + `styles.ts` (co-located styled-components). Each level has a barrel `index.ts(x)`, but the barrels are incomplete — many components are imported by direct path (e.g. `@/components/molecules/SideBox`). Import from the barrel when the component is exported there, otherwise use the full path.

- `atoms/Text` — the primary typography primitive. Props `tag` (any intrinsic element), `font` (typography-scale key), `color` (theme-color key). Prefer this over raw styled text.

### Page-level styles

`src/styles/pages/` — one file per page (`home.ts`, `aboutMe.ts`, `projects.ts`, `layout.ts`) exporting `Container` / `Content` styled-components.

### Other

- `src/hooks/useTypewriter.tsx` — char-by-char typewriter hook (`text`, `time`, `delay`); used heavily on the home page to stagger animated lines.
- Path alias `@/*` → `src/*`.
- Per-page static data lives in a co-located `_data.tsx` (underscore-prefixed so the App Router ignores it as a route).
