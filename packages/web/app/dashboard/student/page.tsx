import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';

export default function StudentDashboard() {
  const user = auth.getUser();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ink-900">Welcome back, {user?.name}</h1>
          <p className="text-ink-600">Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/login">
            <Button variant="outline">Profile</Button>
          </Link>
        </div>
      </div>

      {/* Today's snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Today's class" value="10:00 AM" subtitle="Mathematics · Grade 9" />
        <StatCard title="Today's challenge" value="Daily Quiz" subtitle="5 XP · Streak: 3 days" />
        <StatCard title="Progress" value="42%" subtitle="Roadmap completion" />
      </div>

      {/* Continue learning */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-ink-900">Continue learning</h2>
          <Link href="#" className="text-sm text-brand-600 hover:underline">
            View all roadmaps →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <RoadmapCard
            title="Mathematics · Grade 9"
            pillar="Subjects"
            progress={60}
            nextLesson="Quadratic Equations"
          />
          <RoadmapCard
            title="Introduction to Python"
            pillar="Innovation"
            progress={30}
            nextLesson="Variables & Data Types"
          />
          <RoadmapCard
            title="Science · Grade 9"
            pillar="Subjects"
            progress={15}
            nextLesson="Motion & Force"
          />
        </div>
      </section>

      {/* Today's challenge */}
      <section className="rounded-2xl border border-brand-200 bg-brand-50 p-6">
        <h2 className="text-xl font-bold text-ink-900 mb-2">Today's Challenge</h2>
        <p className="text-ink-600 mb-4">Complete the daily quiz to keep your streak alive.</p>
        <Button className="w-full">Start Challenge</Button>
      </section>
    </div>
  );
}

function StatCard({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
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

function RoadmapCard({
  title,
  pillar,
  progress,
  nextLesson,
}: {
  title: string;
  pillar: string;
  progress: number;
  nextLesson: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">{pillar}</span>
        <span className="text-xs font-medium text-ink-500">{progress}%</span>
      </div>
      <h3 className="font-semibold text-ink-900 mb-2">{title}</h3>
      <div className="w-full bg-ink-100 rounded-full h-1.5 mb-3 overflow-hidden">
        <div className="h-full bg-brand-600" style={{ width: `${progress}%` }} />
      </div>
      <p className="text-sm text-ink-500 mb-3">Next: {nextLesson}</p>
      <Button variant="outline" size="sm" className="w-full">
        Continue
      </Button>
    </Card>
  );
}
