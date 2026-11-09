import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';

export default function AdminDashboard() {
  const user = auth.getUser();

  if (!auth.isAdmin(user)) {
    return (
      <div className="py-12 text-center">
        <h1 className="text-2xl font-bold text-ink-900 mb-2">Access denied</h1>
        <p className="text-ink-600 mb-6">Only Shivani & Devendra can access the admin console.</p>
        <Link href="/dashboard">
          <Button variant="outline">Back to dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ink-900">Admin Console</h1>
          <p className="text-ink-600">Host classes, author content, and manage the batch.</p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Students" value="24" subtitle="+3 this week" />
        <StatCard title="Live classes" value="2" subtitle="This week" />
        <StatCard title="Roadmaps" value="6" subtitle="Authored" />
        <StatCard title="Challenges" value="12" subtitle="Active" />
      </div>

      {/* Admin actions */}
      <section>
        <h2 className="text-xl font-semibold text-ink-900 mb-4">Admin actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AdminActionCard
            title="Host a live class"
            description="Create a Jitsi-secured room and start teaching."
            href="#"
            icon="🎥"
          />
          <AdminActionCard
            title="Author content"
            description="Build roadmaps, modules, and lessons."
            href="#"
            icon="📝"
          />
          <AdminActionCard
            title="Set a challenge"
            description="Create daily/weekly/monthly challenges."
            href="#"
            icon="🏆"
          />
          <AdminActionCard
            title="Manage students"
            description="View batch progress and engagement."
            href="#"
            icon="👥"
          />
          <AdminActionCard
            title="Review submissions"
            description="Grade weekly & monthly challenge submissions."
            href="#"
            icon="✅"
          />
          <AdminActionCard
            title="Analytics"
            description="Signups, completion, churn."
            href="#"
            icon="📊"
          />
        </div>
      </section>

      <div className="border-t border-white/60 pt-8 mt-8">
        <p className="text-xs text-ink-400 uppercase tracking-wider">
          Admins: {user?.name} · Seeded admin access
        </p>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle }: { title: string; value: string | number; subtitle: string }) {
  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-ink-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-ink-900">{value}</div>
        <p className="text-sm text-ink-500 mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

function AdminActionCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  return (
    <Card className="p-5 hover:shadow-md transition-shadow">
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="font-semibold text-ink-900 mb-1">{title}</h3>
      <p className="text-sm text-ink-500 mb-4">{description}</p>
      <Link href={href}>
        <Button variant="outline" size="sm" className="w-full">
          Open
        </Button>
      </Link>
    </Card>
  );
}
