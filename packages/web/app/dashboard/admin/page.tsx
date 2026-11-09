import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Card } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function AdminDashboard() {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return (
      <div className="py-12 bg-gradient-obsidian text-center">
        <h1 className="text-2xl font-bold text-white mb-2">Access denied</h1>
        <p className="text-ink-300/70 mb-6">Only Shivani & Devendra can access the admin console.</p>
        <Link href="/dashboard">
          <Button variant="outline" className="text-white">Back to dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-obsidian min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Console</h1>
          <p className="text-ink-300/70">
            Host classes, author content, and manage the batch.
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-ink-400">Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">24</div>
              <p className="text-ink-400/70 mt-1">+3 this week</p>
            </CardContent>
          </Card>

          <Card className="p-6 bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-ink-400">Live classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">2</div>
              <p className="text-ink-400/70 mt-1">This week</p>
            </CardContent>
          </Card>

          <Card className="p-6 bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-ink-400">Roadmaps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">6</div>
              <p className="text-ink-400/70 mt-1">Authored</p>
            </CardContent>
          </Card>

          <Card className="p-6 bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-ink-400">Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">12</div>
              <p className="text-ink-400/70 mt-1">Active</p>
            </CardContent>
          </Card>
        </div>

        {/* Admin actions */}
        <section className="rounded-2xl bg-card border-border p-8">
          <h2 className="text-xl font-semibold text-white mb-4">Admin actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-4 bg-card border-border hover:bg-card/80 transition-colors">
              <div className="text-2xl mb-3">🎥</div>
              <h3 className="font-semibold text-white mb-1">Host a live class</h3>
              <p className="text-ink-300/70 mb-4">
                Create a Jitsi-secured room and start teaching.
              </p>
              <Link href="#">
                <Button variant="outline" size="sm" className="w-full">
                  Open
                </Button>
              </Link>
            </Card>

            <Card className="p-4 bg-card border-border hover:bg-card/80 transition-colors">
              <div className="text-2xl mb-3">📝</div>
              <h3 className="font-semibold text-white">Author content</h3>
              <p className="text-ink-300/70 mb-4">
                Build roadmaps, modules, and lessons.
              </p>
              <Link href="#">
                <Button variant="outline" size="sm" className="w-full">
                  Open
                </Button>
              </Link>
            </Card>

            <Card className="p-4 bg-card border-border hover:bg-card/80 transition-colors">
              <div className="text-2xl mb-3">🏆</div>
              <h3 className="font-semibold text-white">Set a challenge</h3>
              <p className="text-ink-300/70 mb-4">
                Create daily/weekly/monthly challenges.
              </p>
              <Link href="#">
                <Button variant="outline" size="sm" className="w-full">
                  Open
                </Button>
              </Link>
            </Card>

            <Card className="p-4 bg-card border-border hover:bg-card/80 transition-colors">
              <div className="text-2xl mb-3">👥</div>
              <h3 className="font-semibold text-white">Manage students</h3>
              <p className="text-ink-300/70 mb-4">
                View batch progress and engagement.
              </p>
              <Link href="#">
                <Button variant="outline" size="sm" className="w-full">
                  Open
                </Button>
              </Link>
            </Card>

            <Card className="p-4 bg-card border-border hover:bg-card/80 transition-colors">
              <div className="text-2xl mb-3">📊</div>
              <h3 className="font-semibold text-white">Analytics</h3>
              <p className="text-ink-300/70 mb-4">
                Signups, completion, churn.
              </p>
              <Link href="#">
                <Button variant="outline" size="sm" className="w-full">
                  Open
                </Button>
              </Link>
            </Card>
          </div>
        </section>

        <div className="mt-8 text-center">
          <p className="text-xs text-ink-400 uppercase tracking-wider">
            Admins: {user?.name} · Seeded admin access
          </p>
        </div>
      </div>
    </div>
  );
}