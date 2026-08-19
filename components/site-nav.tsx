'use client';

import { usePathname } from 'next/navigation';
import { TransitionLink } from '@/components/transition-link';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

export function SiteNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex items-center gap-1 sm:gap-2', className)} aria-label="Main">
      {siteConfig.nav.map((l) => {
        const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
        return (
          <TransitionLink
            key={l.href}
            href={l.href}
            className={cn(
              'relative rounded-full px-3 py-1.5 text-sm transition-colors duration-200',
              active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
            aria-current={active ? 'page' : undefined}
          >
            {l.label}
            <span
              aria-hidden
              className={cn(
                'absolute inset-x-3 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300 ease-out',
                active ? 'scale-x-100' : 'scale-x-0',
              )}
            />
          </TransitionLink>
        );
      })}
    </nav>
  );
}
