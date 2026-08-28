import { cn } from '@/lib/utils';

export function Ornament({ className }: { className?: string }) {
  return (
    <span className={cn('ornament', className)} aria-hidden>
      <span className="ornament-line" />
      <span className="ornament-dot" />
      <span className="ornament-line ornament-line-short" />
      <span className="ornament-dot" />
      <span className="ornament-line" />
    </span>
  );
}
