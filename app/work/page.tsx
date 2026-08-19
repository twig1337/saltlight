import type { Metadata } from 'next';
import { TransitionLink } from '@/components/transition-link';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Work',
  description: `What ${siteConfig.name} builds.`,
};

const kinds = [
  {
    title: 'Public sites',
    body: 'Fast pages, clear writing, contact paths, and hosting that stays boring on purpose.',
  },
  {
    title: 'Sites with tools',
    body: 'The public face plus quiet admin for content, documents, or members — without a heavy CMS bill.',
  },
  {
    title: 'Ongoing care',
    body: 'Updates, dependency hygiene, uptime eyes, and honest scope when something needs to change.',
  },
];

export default function WorkPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-20 sm:px-8 sm:py-28">
      <h1 className="font-display text-4xl tracking-tight text-ink sm:text-5xl reveal">Work</h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground reveal reveal-d1">
        Client names stay private unless they ask to be listed. The shape of the work is simple.
      </p>

      <ul className="mt-16 space-y-0 divide-y divide-border/80 border-y border-border/80">
        {kinds.map((k, i) => (
          <li key={k.title} className={`py-8 reveal reveal-d${Math.min(i + 2, 5)}`}>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">{k.title}</h2>
            <p className="mt-3 max-w-xl text-[1.05rem] leading-relaxed text-muted-foreground">
              {k.body}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-14 reveal reveal-d5">
        <TransitionLink href="/contact" className="nav-link-lg nav-link-lg-accent">
          Start a project
        </TransitionLink>
      </p>
    </main>
  );
}
