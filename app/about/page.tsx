import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${siteConfig.name} — who builds the sites and why.`,
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">About {siteConfig.name}</h1>
      <p className="text-muted-foreground leading-relaxed">
        {siteConfig.name} is a side-practice web shop for organizations that need a clear public
        presence and steady care — churches, civic groups, salons, and small teams who do not want
        enterprise process for a brochure site.
      </p>
      {siteConfig.ownerName ? (
        <p className="text-muted-foreground leading-relaxed">
          Run by {siteConfig.ownerName}
          {siteConfig.location ? ` (${siteConfig.location})` : ''}. Day job is engineering; this
          practice is deliberate, not a growth-at-all-costs agency.
        </p>
      ) : null}
      <p className="text-muted-foreground leading-relaxed">
        The name draws from Matthew 5:13–16 — salt of the earth, light of the world. The work should
        be useful, honest, and a little brighter than the status quo of neglected brochure sites.
      </p>
      <p className="text-muted-foreground leading-relaxed">
        Stack defaults stay boring on purpose: modern Next.js, TypeScript, Amplify when a backend is
        needed, GitHub, Sentry, and privacy-friendly analytics. No snowflake stacks per client.
      </p>
    </main>
  );
}
