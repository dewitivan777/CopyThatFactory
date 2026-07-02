# Copy That

Marketing agency website — brand, ads, copywriting, admin, and bespoke web builds, packaged around outcomes. Built with the Next.js App Router, TypeScript, and Tailwind CSS v4.

## Tech stack

- **[Next.js 15](https://nextjs.org/)** (App Router) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** — design tokens live in [`src/app/globals.css`](src/app/globals.css)
- **react-hook-form** + **zod** — contact form with shared client/server validation
- **lucide-react** — icons

## Getting started

```bash
npm install
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check without emitting |

## Project structure

```
src/
├── app/                      # App Router routes
│   ├── layout.tsx            # Root layout: fonts, header, footer, metadata
│   ├── page.tsx              # Home page (incl. "How we help" overview)
│   ├── globals.css           # Tailwind import + design tokens
│   ├── capabilities/
│   │   ├── page.tsx          # Capabilities index — the core offering
│   │   └── [slug]/page.tsx   # Dynamic capability detail (static-generated)
│   ├── contact/page.tsx      # Contact page (reads ?interest= to preselect)
│   ├── api/contact/route.ts  # Contact form submission handler
│   ├── sitemap.ts            # Generated sitemap.xml
│   ├── robots.ts             # Generated robots.txt
│   └── not-found.tsx         # 404 page
├── components/
│   ├── layout/               # Header, Footer, Logo
│   ├── ui/                   # Reusable primitives (Button, Container, …)
│   ├── home/                 # Home-page sections (Hero, Process, …)
│   └── contact/ContactForm.tsx
├── data/                     # Content as typed data (packages, capabilities…)
├── lib/                      # Validation schema + small utilities
└── types/                    # Shared TypeScript types
```

### Content model

Capabilities, "how we help" situations, and process steps are defined as typed
data in [`src/data`](src/data). **Capabilities are the offering** — each has a
static-generated detail page derived via `generateStaticParams`, so adding one
is a data-only change (its page, nav, sitemap, and footer links all follow).

There are **no packages or fixed bundles**. The
[`situations`](src/data/situations.ts) data powers the homepage "How we help"
overview — illustrative framing of common problems and the capabilities we'd
draw on — but every engagement is scoped and quoted to the customer's own
requirements rather than sold as a product.

## Contact form

The form posts to [`/api/contact`](src/app/api/contact/route.ts). Validation is
shared between client and server through the zod schema in
[`src/lib/validation.ts`](src/lib/validation.ts), and a hidden honeypot field
filters out bots.

### Email delivery

Email is sent via [Resend](https://resend.com) when configured. Copy
`.env.example` to `.env.local` and fill in:

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=hello@copythatfactory.co.za
CONTACT_FROM_EMAIL=website@copythatfactory.co.za   # domain verified in Resend
```

Until those are set, submissions are validated and logged to the server console
(and the user still sees a success state), so the form is safe to demo without
any provider account. Swapping Resend for another provider only touches the
`fetch` call in the API route.
