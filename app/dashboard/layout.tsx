'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';
import { Tabs } from '@/components/ui';
import { auth } from '@/lib/auth';
import * as React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.getUser();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-border bg-card px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v2.234c-3.338.726-4.033-1.416-4.033-1.416s-1.097-1.943-1.097-2.287-.007-1.545 0-1.545s1.097-1.943 1.097-2.287c0-.37-.03-.72-.03-1.128v-2.234a12.02 12.02 0 0 0-.593-2.51c-.451-.779-.905-1.444-1.397-1.823-1-1.195.177-2.195.763-2.762-.417.695-1.024.378-1.37.763-.568.178-1.09.55-1.417.874l2.24 2.24c.979.979.979 2.57 0 3.549-.995.995-2.598.995-3.598 0-.998-.995-1.998-1.998-1.998-2.01 0-1.998.998-3.598l-2.238-2.238a8.016 8.016 0 0 0-.717-1.357L3.067 7.838a8.052 8.052 0 0 0 .586 1.488c0 .388.154.768.41.993l2.308 2.31 2.266-2.266a7.987 7.987 0 0 1 1.069-1.037c.369-.369.369-1.016 0-1.385zM12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-gray-900">OmniLearn</span>
          </div>

          <div className="flex items-center gap-4">
            {mounted && user ? (
              <>
                <span className="text-sm text-gray-600">
                  Welcome, {user.name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    auth.logout();
                    window.location.href = '/auth/login';
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  window.location.href = '/auth/login';
                }}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4">
        {children}
      </main>
    </div>
  );
}