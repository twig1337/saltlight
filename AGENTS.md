# AGENTS.md

## Project

- **Client:** SaltLight
- **Tier:** B  (L | B | A)
- **Profile:** brochure
- **Domain:** saltlight.dev
- **SEO posture:** baseline  (private | baseline | growth)
- **Band:** general  (general | ff | charity)

## Stack

Next.js App Router + TypeScript + Tailwind. No Amplify Gen 2 backend (contact via SES API route).
Hosting: Amplify Hosting (WEB_COMPUTE). CI: GitHub Actions. Errors: Sentry (optional until DSN set). Analytics: Umami.

## AWS

```bash
aws --profile personal <cmd>
```

## Commands

```bash
npm run dev
npm run build
npm run lint
npm test
npm run doctor
```

## Routes

| Path | Purpose |
|---|---|
| `/` | Home |
| `/work` | Work kinds |
| `/about` | About |
| `/contact` | Contact form |
| `/api/contact` | SES contact POST |

## Non-negotiables

- No secrets in git
- No dollar amounts on public pages (soft under-market wording OK)
- BRIEF for >2h work under `docs/features/`
- Practice rules: site-os `AGENTS.md` / `PRICING.md`
