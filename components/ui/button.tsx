import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants: Record<string, string> = {
      default: 'btn-primary disabled:opacity-50 disabled:pointer-events-none',
      outline: 'btn-secondary disabled:opacity-50 disabled:pointer-events-none',
      ghost:
        'inline-flex items-center justify-center rounded-sm px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-[color-mix(in_srgb,var(--gold)_10%,transparent)] hover:text-foreground transition-colors disabled:opacity-50',
    };
    return (
      <button ref={ref} className={cn(variants[variant], className)} {...props} />
    );
  },
);
Button.displayName = 'Button';
