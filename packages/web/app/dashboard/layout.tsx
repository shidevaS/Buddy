import { redirect } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gradient-obsidian">
      <nav className="border-b border-border bg-card p-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">Tuiton</span>
              <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">dashboard</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-ink-200 hidden sm:block">
                {user.name} ({user.role})
              </span>
              <button
                onClick={() => auth.logout()}
                className="flex items-center gap-2 text-sm font-medium text-ink-200 hover:text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}