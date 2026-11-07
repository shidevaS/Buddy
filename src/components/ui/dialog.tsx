import { cn } from '@/lib/utils';

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}

const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(({ className, open, onOpenChange, modal = true, ...props }, ref) => {
  return (
    <div
      className={cn('modal', className)}
      open={open}
      onOpenChange={onOpenChange}
      {...props}
    />
  );
});

Dialog.displayName = 'Dialog';

export { Dialog };
export type { DialogProps };