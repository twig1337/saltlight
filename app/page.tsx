import Link from 'next/link';
import { siteConfig } from '@/lib/site';

const offerings = [
  {
    title: 'Brochure sites',
    body: 'Fast public pages with contact forms, baseline SEO, and hosting that stays boring on purpose.',
  },
  {
    title: 'Brochure + admin',
    body: 'Invite-only clerk tools for meetings, documents, and content — without a heavy CMS bill.',
  },
  {
    title: 'Ongoing care',
    body: 'Monthly retainers for updates, dependency hygiene, uptime eyes, and honest scope boundaries.',
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="border-b border-border bg-gradient-to-b from-primary/[0.06] to-background">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20 space-y-6">
          <p className="text-sm font-medium tracking-wide text-accent-foreground/80 uppercase">
            {siteConfig.name}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary max-w-3xl">
            {siteConfig.tagline}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{siteConfig.description}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Start a conversation
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              See the kind of work
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 space-y-8">
        <h2 className="text-2xl font-semibold tracking-tight">What I build</h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {offerings.map((o) => (
            <li
              key={o.title}
              className="rounded-lg border border-border bg-card p-5 shadow-sm space-y-2"
            >
              <h3 className="font-semibold text-primary">{o.title}</h3>
              <p className="text-sm text-muted-foreground">{o.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-5xl px-4 py-12 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">How engagement works</h2>
          <ul className="grid gap-3 sm:grid-cols-2 text-sm text-muted-foreground list-disc pl-5">
            <li>Clear written scope before build work starts</li>
            <li>Time-and-materials or fixed packages — your choice</li>
            <li>Rates typically ~20–25% under common SMB web pricing</li>
            <li>Charity and friends-and-family bands when that fits</li>
            <li>No surprise CMS invoices for a five-page site</li>
            <li>You own the domain and the code path</li>
          </ul>
          <p className="text-sm text-muted-foreground pt-2">
            Exact dollars live on the proposal, not on a public rate card.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Ready when you are</h2>
        <p className="text-muted-foreground max-w-2xl">
          Tell me what you need the site to do. I will answer with a short plan, a band, and a next
          step — not a 40-page deck.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Contact {siteConfig.name}
        </Link>
      </section>
    </main>
  );
}
