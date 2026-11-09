import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';

export default function HomePage() {
  const user = auth.getUser();

  return (
    <main className="min-h-screen bg-gradient-to-b from-ink-950 to-ink-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <section className="mb-16 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold tracking-wider uppercase mb-6">
            🎓 Tuition meets the AI studio
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
            Learn school subjects <br />
            <span className="text-brand-400">and build real skills.</span>
          </h1>
          <p className="text-xl text-ink-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            CBSE-aligned subjects for grades 6–12 plus an innovation track — coding,
            prompt engineering, AI tools, app-building, and cyber basics. Live classes
            hosted by Shivani & Devendra, with on-demand content and daily challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <>
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
                <Button variant="outline" size="lg" onClick={() => auth.logout()}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/login">Get Started Free</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
              </>
            )}
          </div>
        </section>

        {/* Two pillars */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <CardPillar
            title="Subjects"
            subtitle="Grades 6–12 · CBSE/NCERT aligned"
            description="Mathematics, Science, English, Hindi, Social Science & Computer Science. Structured roadmaps, chapter lessons, quizzes and homework."
            icon="📚"
          />
          <CardPillar
            title="Innovation"
            subtitle="Coding → DSA · AI · App-building · Cyber basics"
            description="Prompt engineering, AI tools, ML fundamentals, app-building and security basics. Build a portfolio that proves what you can build."
            icon="💻"
          />
        </section>

        {/* How it works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">How it works</h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <li className="p-6 rounded-xl border border-white/10 bg-white/5">
              <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-xl mb-4">1</div>
              <h3 className="font-semibold text-white mb-2">Join a batch</h3>
              <p className="text-ink-300 text-sm">One cohort, two admins — Shivani & Devendra host it all.</p>
            </li>
            <li className="p-6 rounded-xl border border-white/10 bg-white/5">
              <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-xl mb-4">2</div>
              <h3 className="font-semibold text-white mb-2">Attend live classes</h3>
              <p className="text-ink-300 text-sm">Jitsi-secured rooms, auto-attendance, live chat & Q&amp;A.</p>
            </li>
            <li className="p-6 rounded-xl border border-white/10 bg-white/5">
              <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-xl mb-4">3</div>
              <h3 className="font-semibold text-white mb-2">Earn XP & badges</h3>
              <p className="text-ink-300 text-sm">Daily challenges, weekly reviews, monthly capstones — your skill tree grows.</p>
            </li>
          </ol>
        </section>

        {/* CTA */}
        <section className="rounded-2xl p-10 md:p-16 bg-brand-600 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start learning?</h2>
          <p className="text-brand-100 mb-8 max-w-lg mx-auto">Create your account and join today's live class.</p>
          {user ? (
            <Button variant="ghost" size="lg" asChild>
              <Link href="/dashboard">Open Dashboard</Link>
            </Button>
          ) : (
            <Button variant="outline" size="lg" asChild>
              <Link href="/login">Sign up free</Link>
            </Button>
          )}
        </section>
      </div>
    </main>
  );
}

function CardPillar({
  title,
  subtitle,
  description,
  icon,
}: {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-8">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-brand-400 text-sm font-semibold mb-4">{subtitle}</p>
      <p className="text-ink-300 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
