import { cn } from '@/lib/utils';

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: 'default' | 'outline';
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(({ className, defaultValue, value, onValueChange, variant = 'default', ...props }, ref) => {
  return (
    <div
      className={cn('w-full', className)}
      {...props}
      ref={ref}
    />
  );
});

Tabs.displayName = 'Tabs';

export { Tabs };
export type { TabsProps };