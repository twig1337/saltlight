'use client';

import { usePathname } from 'next/navigation';
import { TransitionLink } from '@/components/transition-link';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

export function SiteNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex items-center gap-2 sm:gap-5', className)} aria-label="Main">
      {siteConfig.nav.map((l) => {
        const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
        return (
          <TransitionLink
            key={l.href}
            href={l.href}
            className={cn(
              'nav-link relative px-1.5 py-1 text-[1.15rem] leading-none transition-colors duration-200 sm:text-[1.25rem]',
              active ? 'text-background' : 'text-background/65 hover:text-background',
            )}
            aria-current={active ? 'page' : undefined}
          >
            {l.label}
            <span
              aria-hidden
              className={cn(
                'absolute inset-x-1.5 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300 ease-out',
                active ? 'scale-x-100' : 'scale-x-0',
              )}
            />
          </TransitionLink>
        );
      })}
    </nav>
  );
}
