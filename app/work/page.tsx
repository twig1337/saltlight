import type { Metadata } from 'next';
import { TransitionLink } from '@/components/transition-link';

export const metadata: Metadata = {
  title: 'Work',
  description: 'What SaltLight builds.',
};

const kinds = [
  {
    title: 'Build for your needs',
      body: 'A simple homepage, or a complex interactive e-commerce site — I\'ve got you covered.',
  },
  {
    title: 'Managed without middlemen',
    body: 'Administer your content, documents, or members. All without a heavy CMS bill.',
  },
  {
    title: 'Maintained without worry',
    body: 'Hosting, updates, security, uptime (and everything else). I make sure the site runs so you don\'t have to think about it.',
  },
];

export default function WorkPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-20 sm:px-8 sm:py-28">
      <h1 className="font-display text-4xl tracking-tight text-ink sm:text-5xl reveal">Work</h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground reveal reveal-d1">
        The shape of the work is simple:
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
