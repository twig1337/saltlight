import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Work',
  description: `Kinds of work ${siteConfig.name} takes on.`,
};

const kinds = [
  {
    title: 'Church and nonprofit',
    body: 'Public pages, events, and gentle content workflows. Charity pricing when the organization is established as a nonprofit.',
  },
  {
    title: 'Civic and district',
    body: 'About, meetings & minutes, officers, documents — with invite-only admin for clerks.',
  },
  {
    title: 'Local business',
    body: 'Brochure presence, contact paths, and optional freeze/care retainers so the site does not rot.',
  },
  {
    title: 'Private / invite-only apps',
    body: 'Richer auth and tools when the audience is members-only and SEO is intentionally quiet.',
  },
];

export default function WorkPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 space-y-8">
      <div className="space-y-3 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">Work</h1>
        <p className="text-muted-foreground">
          Client names stay private unless they ask to be listed. Here is the shape of work{' '}
          {siteConfig.name} is built for.
        </p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {kinds.map((k) => (
          <li key={k.title} className="rounded-lg border border-border bg-card p-5 space-y-2">
            <h2 className="font-semibold text-primary">{k.title}</h2>
            <p className="text-sm text-muted-foreground">{k.body}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
