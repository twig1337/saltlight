import type { Metadata } from 'next';
import { TransitionLink } from '@/components/transition-link';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${siteConfig.name}.`,
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-20 sm:px-8 sm:py-28">
      <h1 className="font-display text-4xl tracking-tight text-ink sm:text-5xl reveal">About</h1>

      <div className="mt-10 max-w-xl space-y-6 text-[1.1rem] leading-relaxed text-muted-foreground">
        <p className="reveal reveal-d1">
          {siteConfig.name} is a small practice for people who need a clear website and steady care —
          without enterprise process for a simple job.
        </p>
        {siteConfig.ownerName ? (
          <p className="reveal reveal-d2">
            Run by {siteConfig.ownerName}. Day job is engineering. This work is deliberate, not a
            growth-at-all-costs agency.
          </p>
        ) : null}
        <p className="reveal reveal-d3">
          The name draws from Matthew 5:13–16 — salt of the earth, light of the world. The work
          should be useful, honest, and a little brighter than neglected brochure sites.
        </p>
        <p className="reveal reveal-d4">
          Stack defaults stay boring on purpose: modern Next.js, TypeScript, solid hosting, and
          privacy-friendly analytics. No snowflake stack per project.
        </p>
      </div>

      <p className="mt-14 reveal reveal-d5">
        <TransitionLink href="/contact" className="nav-link-lg nav-link-lg-accent">
          Get in touch
        </TransitionLink>
      </p>
    </main>
  );
}
