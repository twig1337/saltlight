import Image from 'next/image';
import { TransitionLink } from '@/components/transition-link';
import { SiteNav } from '@/components/site-nav';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/40 bg-ink text-background">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-6 px-6 py-4 sm:px-8">
        <TransitionLink
          href="/"
          className="group inline-flex items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          aria-label="SaltLight home"
        >
          <Image
            src="/saltlight-icon.png"
            alt=""
            width={378}
            height={677}
            priority
            unoptimized
            className="h-9 w-auto transition-opacity duration-200 group-hover:opacity-80 sm:h-10"
          />
          <Image
            src="/saltlight-wordmark.png"
            alt="SaltLight"
            width={683}
            height={215}
            priority
            unoptimized
            className="h-6 w-auto transition-opacity duration-200 group-hover:opacity-80 sm:h-7"
          />
        </TransitionLink>
        <SiteNav />
      </div>
    </header>
  );
}
