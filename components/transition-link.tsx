'use client';

import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { flushSync } from 'react-dom';
import type { ComponentProps, MouseEvent } from 'react';

type Props = ComponentProps<typeof NextLink>;

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function TransitionLink({ href, onClick, replace, ...props }: Props) {
  const router = useRouter();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const url = typeof href === 'string' ? href : href.pathname;
    if (!url || url.startsWith('http') || url.startsWith('mailto:')) return;

    e.preventDefault();

    const navigate = () => {
      if (replace) router.replace(url);
      else router.push(url);
    };

    if (!document.startViewTransition || prefersReducedMotion()) {
      navigate();
      return;
    }

    document.startViewTransition(() => {
      flushSync(() => {
        navigate();
      });
    });
  }

  return <NextLink href={href} onClick={handleClick} {...props} />;
}
