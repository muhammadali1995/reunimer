# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**absolute-altitude** — an Astro 6 website. Currently at the starter template stage.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build locally

## Tech Stack

- **Astro 6** (SSG by default)
- **TypeScript** (strict mode, extends `astro/tsconfigs/strict`)
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
