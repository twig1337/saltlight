import Image from 'next/image';
import { TransitionLink } from '@/components/transition-link';
import { SiteNav } from '@/components/site-nav';
import { siteConfig } from '@/lib/site';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-[color-mix(in_srgb,var(--background)_78%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-6 px-6 py-5 sm:px-8">
        <TransitionLink
          href="/"
          className="group inline-flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={`${siteConfig.name} home`}
        >
          <Image
            src="/logo.png"
            alt={siteConfig.name}
            width={168}
            height={36}
            priority
            unoptimized
            className="h-7 w-auto transition-opacity duration-200 group-hover:opacity-80 sm:h-8"
          />
        </TransitionLink>
        <SiteNav />
      </div>
    </header>
  );
}
