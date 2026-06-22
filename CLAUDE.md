# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Personal Website

Personal portfolio and frontend learning project.

## Stack
- Next.js 16 + TypeScript (App Router)
- Tailwind CSS v4
- Deployed on Vercel
- Version control: GitHub

## Developer Background
CS degree, .NET internship. Learning frontend properly through this project.
Explain *why*, not just *what*. Teach as we go.

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run lint` — lint check
- `npm run start` — serve production build locally

There are no tests configured yet.

## Architecture

**Routing** — Uses Next.js App Router. All routes live under `app/`. Each folder with a `page.tsx` becomes a route. `app/layout.tsx` is the root layout wrapping every page.

**Tailwind v4** — Uses the new `@import "tailwindcss"` syntax in `globals.css` (no `tailwind.config.js`). Theme customization happens via `@theme inline` CSS blocks in `globals.css`, not a JS config file. This is different from Tailwind v3 tutorials online.

**Fonts** — Geist Sans and Geist Mono loaded via `next/font/google` in `layout.tsx`, exposed as CSS variables (`--font-geist-sans`, `--font-mono`), and applied as Tailwind theme tokens.

**CSS variables** — `--background` (`#ababab`) and `--foreground` (`#171717`) defined in `:root`. No dark mode — the moodboard phase locked the palette to a single light-grey theme.

**Path alias** — `@/*` maps to the repo root (e.g. `import Foo from "@/components/Foo"`).

**TypeScript** — Strict mode enabled. `moduleResolution: "bundler"` is Next.js's modern resolver.

**Blog (MDX)** — Posts are `.mdx` files in `content/blog/` (outside the route tree, so they aren't treated as pages). `lib/posts.ts` reads that folder and parses YAML frontmatter (`title`, `date`, `summary`) with `gray-matter`. `app/blog/page.tsx` is the index; `app/blog/[slug]/page.tsx` is the dynamic route that renders one post via `next-mdx-remote/rsc` and statically generates every post through `generateStaticParams` (`dynamicParams = false`, so unknown slugs 404). Post content is styled with the `@tailwindcss/typography` `prose` classes (enabled via `@plugin "@tailwindcss/typography";` in `globals.css`), with `prose-*` overrides tuned for the grey theme. **To add a post:** drop a new `.mdx` file with frontmatter into `content/blog/` — no code changes needed.

## Build Phases (in order)
1. ✅ Next.js project setup → live on Vercel
2. ✅ Homepage + moodboard/category pages (static, Tailwind UI)
3. ✅ MDX blog with dynamic routes
4. Music — SoundCloud embed, custom player as stretch goal ← CURRENT
5. Backend — contact form (Resend), GitHub API, optional Upstash counter
6. Polish — Framer Motion, custom domain, SEO basics

## gstack

Use the `/browse` skill from gstack for all web browsing. Never use `mcp__claude-in-chrome__*` tools directly.

Available gstack skills: `/office-hours`, `/plan-ceo-review`, `/plan-eng-review`, `/plan-design-review`, `/design-consultation`, `/design-shotgun`, `/design-html`, `/review`, `/ship`, `/land-and-deploy`, `/canary`, `/benchmark`, `/browse`, `/connect-chrome`, `/qa`, `/qa-only`, `/design-review`, `/setup-browser-cookies`, `/setup-deploy`, `/setup-gbrain`, `/retro`, `/investigate`, `/document-release`, `/document-generate`, `/codex`, `/cso`, `/autoplan`, `/plan-devex-review`, `/devex-review`, `/careful`, `/freeze`, `/guard`, `/unfreeze`, `/gstack-upgrade`, `/learn`

## Ground Rules
- Always state which phase we're working on
- Remind me to commit and push after every working feature
- Don't jump ahead until current phase is working and deployed
- Flag anything that will cause problems in later phases
- Prefer explaining over just doing
