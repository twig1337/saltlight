import type { Metadata } from 'next';
import { TransitionLink } from '@/components/transition-link';

export const metadata: Metadata = {
  title: 'About',
  description: 'About SaltLight.',
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-20 sm:px-8 sm:py-28">
      <h1 className="font-display text-4xl tracking-tight text-ink sm:text-5xl reveal">About</h1>

      <div className="mt-10 max-w-xl space-y-6 text-[1.1rem] leading-relaxed text-muted-foreground">
        <p className="reveal reveal-d1">
          SaltLight is a small practice for people who need a clear website and steady care —
          without enterprise process.
        </p>
        <p className="reveal reveal-d2">
          I’m Thomas Ellsworth. I do this work one-on-one alongside my day job as a software architect. No team,
          no agency overhead — just straightforward help for small businesses, charities, and local organizations that
          want a website that actually works and doesn’t become a headache.
        </p>
        <p className="reveal reveal-d3">
          SaltLight comes from Matthew 5:13-16 — “salt of the earth, light of the world.” The goal is simple: useful,
          honest sites that are a little brighter and more reliable than the neglected brochure pages a lot of
          organizations end up with.
        </p>
      </div>

      <p className="mt-14 reveal reveal-d4">
        <TransitionLink href="/contact" className="nav-link-lg nav-link-lg-accent">
          Get in touch
        </TransitionLink>
      </p>
    </main>
  );
}
