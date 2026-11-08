import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
  pill?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant = 'default', pill = false, ...props }, ref) => {
  let variants = {
    default: 'inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium',
    secondary: 'inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium',
    outline: 'inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-medium',
    destructive: 'inline-flex items-center rounded-full bg-destructive text-destructive-foreground px-2.5 py-0.5 text-xs font-medium',
  };

  let baseClasses = 'inline-flex items-center rounded-full';

  return (
    <span
        className={cn(baseClasses, pill ? 'p-0.5' : undefined, variants[variant], className)}
      ref={ref}
      {...props}
    />
  );
});

Badge.displayName = 'Badge';

export { Badge };