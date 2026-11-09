/**
 * @tuiton/web hooks/use-toast
 * Simple toast notification hook for Phase 1.
 * Shivani & Devendra.
 *
 * Usage:
 *   const { toast } = useToast();
 *   toast({ title: 'Success', description: 'Operation completed', variant: 'default' });
 *   toast({ title: 'Error', description: 'Something went wrong', variant: 'destructive' });
 */

import { useState } from 'react';

type ToastVariant = 'default' | 'destructive';

interface ToastOptions {
  title: string;
  description: string;
  variant?: ToastVariant;
  duration?: number;
}

const [toasts, setToasts] = useState<ToastOptions[]>([]);

const addToast = ({
  title,
  description,
  variant = 'default',
  duration = 5000,
}: ToastOptions) => {
  const id = Math.random().toString(36).slice(2);
  setToasts((prev) => [...prev, { id, title, description, variant, startTime: Date.now(), duration }]);
  // Auto-remove after duration
  setTimeout(() => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, duration);
};

export function useToast() {
  return {
    toasts,
    toast: addToast,
    dismiss: (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id)),
  };
}