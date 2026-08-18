import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/50">
      <div className="mx-auto max-w-5xl px-4 py-8 space-y-4 text-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium text-foreground">{siteConfig.name}</p>
          <nav className="flex flex-wrap gap-3" aria-label="Footer">
            {siteConfig.nav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="text-muted-foreground max-w-2xl">{siteConfig.tagline}</p>
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}
          {siteConfig.location ? ` · ${siteConfig.location}` : ''}
        </p>
      </div>
    </footer>
  );
}
