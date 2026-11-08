'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { auth } from '@/lib/auth';

type Homework = {
  id: string; title: string; subject: string; grade: string;
  description: string; dueDate: string; status: string;
  assignedBy: string; totalMarks?: number; marks?: number;
};
type Quiz = { id: string; title: string; subject: string; grade: string;
  description: string; questionCount: number; timeLimit: number;
  xpReward: number; status: string; scheduledAt?: string };
type Competition = { id: string; title: string; type: string; subject: string;
  grade: string; description: string; startDate: string; endDate: string;
  prize: string; registeredCount: number };
type Hackathon = { id: string; title: string; theme: string; description: string;
  startDate: string; endDate: string; mode: string; prize: string;
  registeredCount: number; status: string };
type LiveCourse = { id: string; title: string; instructor: string; subject: string;
  grade: string; description: string; schedule: string; duration: string;
  price: string; status: string; studentsEnrolled: number };
type CodingQuestion = { id: string; title: string; language: string;
  difficulty: string; description: string; starterCode: string;
  testCases: { input: string; expectedOutput: string }[]; xpReward: number };
type Subject = { id: string; name: string; code: string; grade: string;
  chapters: number; color: string; description: string };

export default function StudentWorkspace() {
  const router = useRouter();
  const user = auth.getUser();
  const [mounted, setMounted] = React.useState(false);

  const [homework, setHomework] = React.useState<Homework[]>([]);
  const [quizzes, setQuizzes] = React.useState<Quiz[]>([]);
  const [competitions, setCompetitions] = React.useState<Competition[]>([]);
  const [hackathons, setHackathons] = React.useState<Hackathon[]>([]);
  const [liveCourses, setLiveCourses] = React.useState<LiveCourse[]>([]);
  const [codingQuestions, setCodingQuestions] = React.useState<CodingQuestion[]>([]);
  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const grade = user?.grade || '10';
      const [hRes, qRes, cRes, hkRes, lcRes, cqRes, sRes] = await Promise.all([
        fetch(`/api/homework?studentId=${user?.id}`),
        fetch('/api/quizzes'),
        fetch('/api/competitions'),
        fetch('/api/hackathons'),
        fetch('/api/live-courses'),
        fetch('/api/coding-questions'),
        fetch(`/api/subjects?grade=${grade}`),
      ]);
      setHomework((await hRes.json()).homework || []);
      setQuizzes((await qRes.json()).quizzes || []);
      setCompetitions((await cRes.json()).competitions || []);
      setHackathons((await hkRes.json()).hackathons || []);
      setLiveCourses((await lcRes.json()).liveCourses || []);
      setCodingQuestions((await cqRes.json()).codingQuestions || []);
      setSubjects((await sRes.json()).subjects || []);
    } catch (e) {
      console.error('Failed to load workspace data', e);
    } finally {
      setLoading(false);
    }
  }

  if (!mounted) return null;
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8 w-full max-w-md">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Welcome to Student Workspace</h2>
          <p className="text-gray-500 mb-6">Please sign in to continue.</p>
          <Button onClick={() => router.push('/auth/login')} className="w-full">
            Sign In
          </Button>
        </Card>
      </div>
    );
  }

  const pendingHomework = homework.filter((h) => h.status === 'pending');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
              OL
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">OmniLearn<span className="text-indigo-600">India</span></span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              {user.role.toUpperCase()} Workspace
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.grade} • {user.school}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <Button variant="ghost" size="sm" onClick={() => { auth.logout(); router.push('/auth/login'); }}>
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-indigo-100 text-sm uppercase tracking-wider font-semibold mb-1">
                Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, {user.name}
              </p>
              <h1 className="text-3xl font-bold mb-2">Student Workspace</h1>
              <p className="text-indigo-200 text-sm">
                Manage homework, quizzes, competitions, hackathons & subjects — all in one place.
              </p>
            </div>
            <div className="flex gap-3">
              <Badge variant="default" className="bg-white/20 backdrop-blur text-white border-white/30 px-3 py-1">
                {user.totalXp || 0} XP
              </Badge>
              <Badge variant="default" className="bg-white/20 backdrop-blur text-white border-white/30 px-3 py-1">
                Level {user.level || 1}
              </Badge>
              <Badge variant="default" className="bg-white/20 backdrop-blur text-white border-white/30 px-3 py-1">
                {user.streak || 0} day streak
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Pending Homework" value={pendingHomework.length} icon="📝" color="bg-rose-500" />
          <StatCard title="Live Quizzes" value={quizzes.filter((q) => q.status === 'live').length} icon="🧠" color="bg-amber-500" />
          <StatCard title="Hackathons" value={hackathons.filter((h) => h.status === 'live').length} icon="🚀" color="bg-violet-500" />
          <StatCard title="Live Courses" value={liveCourses.filter((c) => c.status === 'live').length} icon="📚" color="bg-green-500" />
        </div>

        <Tabs defaultValue="homework" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 border-b p-1 bg-white rounded-xl shadow-sm">
            <TabsTrigger value="homework" className="flex flex-col items-center gap-1 p-3 text-sm">
              📝 Homework
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="flex flex-col items-center gap-1 p-3 text-sm">
              🧠 Quizzes
            </TabsTrigger>
            <TabsTrigger value="competitions" className="flex flex-col items-center gap-1 p-3 text-sm">
              🏆 Competitions
            </TabsTrigger>
            <TabsTrigger value="hackathons" className="flex flex-col items-center gap-1 p-3 text-sm">
              🚀 Hackathons
            </TabsTrigger>
            <TabsTrigger value="subjects" className="flex flex-col items-center gap-1 p-3 text-sm">
              📚 Subjects
            </TabsTrigger>
            <TabsTrigger value="live-courses" className="flex flex-col items-center gap-1 p-3 text-sm">
              🎓 Live Courses
            </TabsTrigger>
            <TabsTrigger value="coding" className="flex flex-col items-center gap-1 p-3 text-sm">
              💻 Coding Questions
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex flex-col items-center gap-1 p-3 text-sm">
              🔔 Daily Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="homework" className="mt-6 space-y-3">
            {loading ? (
              <div className="animate-pulse h-48 bg-gray-200 rounded-xl" />
            ) : pendingHomework.length === 0 ? (
              <Card className="p-8 text-center text-gray-500">No pending homework. You're all caught up! ✅</Card>
            ) : (
              homework.map((h) => (
                <Card key={h.id} className="p-4 flex items-center justify-between border-l-4 border-l-rose-500/50">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{h.title}</h3>
                    <p className="text-sm text-gray-500">{h.description}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                      <span>{h.subject}</span>
                      <span>•</span>
                      <span>Due {h.dueDate}</span>
                      <span>•</span>
                      <span>{h.assignedBy}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-rose-600 border-rose-200 bg-rose-50">
                      {h.status.charAt(0).toUpperCase() + h.status.slice(1)}
                    </Badge>
                    <Button size="sm" variant="ghost">View</Button>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="quizzes" className="mt-6 space-y-3">
            {quizzes.map((q) => (
              <Card key={q.id} className="p-4 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{q.title}</h3>
                  <p className="text-sm text-gray-500">{q.description}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                    <span>{q.subject}</span>
                    <span>•</span>
                    <span>{q.questionCount} questions</span>
                    <span>•</span>
                    <span>{q.timeLimit} min</span>
                    <span>•</span>
                    <span>+{q.xpReward} XP</span>
                  </div>
                </div>
                <Badge variant={q.status === 'live' ? 'default' : 'secondary'} className="capitalize">
                  {q.status}
                </Badge>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="competitions" className="mt-6 space-y-3">
            {competitions.map((c) => (
              <Card key={c.id} className="p-4 flex items-center justify-between border-l-4 border-l-amber-500/50">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{c.title}</h3>
                  <p className="text-sm text-gray-500">{c.description}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                    <span>{c.subject}</span>
                    <span>•</span>
                    <span>{c.startDate} → {c.endDate}</span>
                    <span>•</span>
                    <span>{c.registeredCount} registered</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{c.prize}</p>
                  <Button size="sm">Register</Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="hackathons" className="mt-6 space-y-3">
            {hackathons.map((h) => (
              <Card key={h.id} className="p-4 flex items-center justify-between border-l-4 border-l-violet-500/50">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{h.title}</h3>
                  <p className="text-sm text-gray-500">{h.description}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                    <span>Theme: {h.theme}</span>
                    <span>•</span>
                    <span>{h.mode}</span>
                    <span>•</span>
                    <span>{h.startDate} → {h.endDate}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{h.prize}</p>
                  <Button size="sm">Join</Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="subjects" className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {subjects.map((s) => (
              <Card key={s.id} className="p-4 text-center cursor-pointer hover:shadow-md transition-shadow group">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 ${s.color} text-white group-hover:scale-110 transition-transform`}>
                  {s.chapters}
                </div>
                <h3 className="font-medium text-gray-900 text-sm">{s.name}</h3>
                <p className="text-xs text-gray-500">{s.chapters} chapters</p>
                <p className="text-[10px] text-gray-400 mt-1">{s.code}</p>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="live-courses" className="mt-6 space-y-3">
            {liveCourses.map((c) => (
              <Card key={c.id} className="p-4 flex items-center justify-between border-l-4 border-l-green-500/50">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{c.title}</h3>
                  <p className="text-sm text-gray-500">{c.description}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                    <span>{c.instructor}</span>
                    <span>•</span>
                    <span>{c.schedule}</span>
                    <span>•</span>
                    <span>{c.duration}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{c.price}</p>
                  <p className="text-xs text-gray-500">{c.studentsEnrolled} enrolled</p>
                  <Button size="sm">Enroll</Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="coding" className="mt-6 space-y-3">
            {codingQuestions.map((cq) => (
              <Card key={cq.id} className="p-4 flex items-center justify-between border-l-4 border-l-blue-500/50">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{cq.title}</h3>
                  <p className="text-sm text-gray-500">{cq.description}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                    <span>{cq.language}</span>
                    <span>•</span>
                    <span>{cq.difficulty}</span>
                    <span>•</span>
                    <span>+{cq.xpReward} XP</span>
                  </div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => router.push(`/coding?q=${cq.id}`)}>
                  Solve
                </Button>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="alerts" className="mt-6 space-y-4">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <h3 className="font-bold text-blue-900 mb-2">🔔 Daily Quiz Alerts</h3>
              <p className="text-blue-700 text-sm mb-3">
                You'll receive daily reminders for live quizzes and upcoming hackathons.
              </p>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">Enable Push Notifications</Button>
                <Button size="sm">Subscribe to Email</Button>
              </div>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
              <h3 className="font-bold text-indigo-900 mb-2">📅 Upcoming Schedule</h3>
              <ul className="text-sm text-indigo-700 space-y-2">
                {[
                  'Mon 6:00 PM — Class 10 Math Live Course',
                  'Tue 5:00 PM — Python for Beginners',
                  'Wed 6:00 PM — Daily Math Quiz',
                  'Fri 7:00 PM — Weekly Hackathon Review',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: number; icon: string; color: string }) {
  return (
    <Card className="p-4 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center text-white text-xl`}>
        {icon}
      </div>
    </Card>
  );
}


