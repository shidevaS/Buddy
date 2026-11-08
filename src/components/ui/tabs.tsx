import * as React from 'react';
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

interface TabsListProps extends React.HTMLAttributes<HTMLUListElement> {}
const TabsList = React.forwardRef<HTMLUListElement, TabsListProps>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    role="tablist"
    className={cn('-mb-px', className)}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

interface TabsTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
}
const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(({ className, value, ...props }, ref) => (
  <button
    ref={ref}
    role="tab"
    aria-selected={false}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = 'TabsTrigger';

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}
const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(({ className, value, ...props }, ref) => (
  <div
    ref={ref}
    role="tabpanel"
    hidden
    className={cn('focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', className)}
    {...props}
  />
));
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };