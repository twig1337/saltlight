import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-card/90 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight text-foreground">
          <span className="text-primary">{siteConfig.name}</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-3 text-sm" aria-label="Main">
          {siteConfig.nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
