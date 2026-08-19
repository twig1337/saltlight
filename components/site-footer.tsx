import { TransitionLink } from '@/components/transition-link';
import { siteConfig } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="relative z-20 shrink-0 border-t border-[color-mix(in_srgb,var(--gold)_32%,var(--border))] bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="plate plate-tight">© {new Date().getFullYear()} {siteConfig.name}</p>
        <nav className="flex flex-wrap gap-x-2 gap-y-2" aria-label="Footer">
          {siteConfig.nav.map((l) => (
            <TransitionLink
              key={l.href}
              href={l.href}
              className="plate plate-tight transition-colors duration-200 hover:text-foreground"
            >
              {l.label}
            </TransitionLink>
          ))}
        </nav>
      </div>
    </footer>
  );
}
