# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**reunimer** — an Astro 6 website.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build locally

## Tech Stack

- **Astro 6** (SSG by default)
- **TypeScript** (strict mode, extends `astro/tsconfigs/strict`)
- **Tailwind CSS** — all styling must use Tailwind utility classes; no custom CSS unless absolutely unavoidable
- **Node >= 22.12.0**

## Architecture

- `src/pages/` — File-based routing (each `.astro` file = a route)
- `src/layouts/` — Page layouts using Astro's `<slot />` pattern
- `src/components/` — Reusable Astro components
- `src/assets/` — Processed static assets (images, SVGs)
- `public/` — Unprocessed static files served at root

## Git

- Remote: `muhammadali1995/reunimer` on GitHub
- Main branch: `main`
- Use `/switch-gh` to toggle between `Toshpulatov95` and `muhammadali1995` GitHub accounts

## Development Rules

### Styling
- **Always use Tailwind CSS** for all styling — no inline styles, no custom CSS files unless truly necessary
- Follow the theming and design patterns already established in the codebase (colors, spacing, typography, etc.)
- Check existing components for Tailwind class patterns before writing new ones

### Components
- **Reuse existing components** — always check `src/components/` before creating anything new
- **Make components reusable** — extract props for anything that varies, avoid hardcoding content
- Follow the same component structure and naming conventions used in the existing codebase
- Keep components focused and single-purpose

### Best Practices
- Never assume — if something is unclear, ask before implementing
- Prefer editing existing files over creating new ones
- Keep solutions minimal; don't add features or abstractions beyond what is asked

### Figma-to-Code Workflow
- When given a Figma page URL, implement the desktop design **pixel-perfectly** matching the Figma design
- Use `get_design_context` with the Figma MCP tool to extract design details, layout, spacing, colors, and assets
- For mobile/responsive design, apply good judgment based on the established design patterns in the app — do not ask for a separate mobile Figma file
- Match fonts, colors, spacing, and component structure exactly as shown in Figma for desktop
- Map Figma design tokens (colors, spacing) to the project's existing Tailwind config or CSS variables
