import { cn } from '@/lib/utils';

export interface CardProps {
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, variant = 'default', ...props }, ref) => {
  let variants = {
    default: 'rounded-md bg-card p-6',
    elevated: 'rounded-md bg-card shadow-sm hover:shadow-md transition-shadow',
    outlined: 'rounded-md border border-border p-6',
  };

  return (
    <div
      className={cn('flex flex-col gap-2', variants[variant], className)}
      ref={ref}
      {...props}
    />
  );
});

Card.displayName = 'Card';

export { Card };
export type { CardProps };