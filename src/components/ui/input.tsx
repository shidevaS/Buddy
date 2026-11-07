import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'outline' | 'underlined';
  size?: 'default' | 'sm' | 'lg';
  type?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, variant = 'default', size = 'default', type = 'text', ...props }, ref) => {
  let variants = {
    default: 'bg-background border border-input rounded-md px-3 py-2 placeholder-muted focus:ring-2 focus:ring-ring focus:ring-input disabled:opacity-50 disabled:pointer-events-none',
    outline: 'border-2 border-border rounded-md px-3 py-2 placeholder-muted focus:ring-2 focus:ring-ring focus:ring-input disabled:opacity-50 disabled:pointer-events-none',
    underlined: 'border-b-2 border-border rounded-none px-0 py-2 placeholder-muted focus:ring-2 focus:ring-ring focus:ring-input w-full disabled:opacity-50 disabled:pointer-events-none',
  };

  let sizes = {
    default: 'text-sm',
    sm: 'text-xs',
    lg: 'text-base',
  };

  return (
    <input
      className={cn('block w-full', variants[variant], sizes[size], className)}
      type={type}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
export type { InputProps };