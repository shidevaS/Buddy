import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';
import { auth } from '@/lib/auth';
import { UserProfile } from '@/lib/types';

export default function HomePage() {
  const user = auth.getUser();

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 to-violet-900 py-12 px-4">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Hero Section with AI Badge */}
        <section className="mb-12">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tracking">
              OmniLearn India
            </h1>
            <p className="text-xl text-indigo-300 mb-8 max-w-2xl mx-auto">
              India's most comprehensive learning platform for K-12 students, 
              aspiring coders, and AI enthusiasts.
            </p>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/20 rounded-full text-indigo-300 text-sm">
              🤖 AI-Powered Learning
            </span>
            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-center mt-6">
              {user ? (
                <>
                  <Button variant="primary" size="lg">
                    Welcome back, {user.name}!
                  </Button>
                  <Button variant="outline" size="lg" onClick={auth.logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="primary" size="lg">Get Started Free</Button>
                  <Button variant="outline" size="lg">View Courses</Button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* AI Features Showcase */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">AI Features</h2>
            <p className="text-indigo-300 max-w-2xl mx-auto">
              Experience personalized learning with our artificial intelligence assistant
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AiFeatureCard
              icon="🧠"
              title="AI Tutoring"
              description="Get personalized help with any subject, step-by-step explanations, and adaptive practice"
            />
            <AiFeatureCard
              icon="📝"
              title="AI Quizzes"
              description="Adaptive quizzes that learn your weak points and generate targeted practice"
            />
            <AiFeatureCard
              icon="💡"
              title="Smart Recommendations"
              description="AI analyzes your progress and suggests the perfect next topic"
            />
          </div>
        </section>

        {/* Live Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-6">
            <p className="text-3xl font-bold text-indigo-400 mb-1">2M+</p>
            <p className="text-indigo-300">Students Enrolled</p>
          </Card>
          <Card className="text-center p-6">
            <p className="text-3xl font-bold text-indigo-400 mb-1">50K+</p>
            <p className="text-indigo-300">Active Courses</p>
          </Card>
          <Card className="text-center p-6">
            <p className="text-3xl font-bold text-indigo-400 mb-1">4.9</p>
            <p className="text-indigo-300">Rating</p>
          </Card>
        </section>

        {/* Features Highlights */}
        <section className="grid grid-cols-1 gap-6 mb-12">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-indigo-100 mb-2">India School Curriculum</h3>
            <p className="text-indigo-200 text-sm">Classes 1st to 10th with NCERT alignment</p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-indigo-100 mb-2">Coding Challenges</h3>
            <p className="text-indigo-200 text-sm">Interactive sandbox with Monaco editor</p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-indigo-100 mb-2">Daily Quizzes</h3>
            <p className="text-indigo-200 text-sm">Gamified learning with streak tracker</p>
          </Card>
        </section>

        {/* Testimonials */}
        <section className="mt-12 pt-12 border-t border-indigo-600/30">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">What Learners Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-indigo-900/30 rounded-xl border border-indigo-600/30">
              <p className="text-indigo-200 mb-4">
                "Best platform for Indian curriculum! The chapter notes are incredibly helpful."
              </p>
              <div className="flex items-center gap-3">
                <img
                              src="/placeholder.svg?height=40&width=40&text=AA"
                  alt="Ananya"
                  className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                />
                <div>
                  <p className="font-medium text-indigo-100">Ananya Singh</p>
                  <p className="text-indigo-300 text-xs">Class 9</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-indigo-900/30 rounded-xl border border-indigo-600/30">
              <p className="text-indigo-200 mb-4">
                "The coding challenges keep me engaged daily! The sandbox is amazing."
              </p>
              <div className="flex items-center gap-3">
                <img
                                src="/placeholder.svg?height=40&width=40&text=RJ"
                  alt="Rohit"
                  className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                />
                <div>
                  <p className="font-medium text-indigo-100">Rohit Patel</p>
                  <p className="text-indigo-300 text-xs">Python Student</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-indigo-900/30 rounded-xl border border-indigo-600/30">
              <p className="text-indigo-200 mb-4">
                "Daily quizzes improved my speed! Leaderboard motivates me to do better."
              </p>
              <div className="flex items-center gap-3">
                <img
                                src="/placeholder.svg?height=40&width=40&text=PM"
                  alt="Priya"
                  className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                />
                <div>
                  <p className="font-medium text-indigo-100">Priya Sharma</p>
                  <p className="text-indigo-300 text-xs">Class 7</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

interface AiFeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function AiFeatureCard({ icon, title, description }: AiFeatureCardProps) {
  return (
    <div className="bg-indigo-900/30 border border-indigo-600/30 rounded-xl p-6 hover:shadow-2xl transition-shadow">
      <p className="text-3xl mb-3">{icon}</p>
      <h3 className="font-medium text-indigo-100 mb-2">{title}</h3>
      <p className="text-indigo-200 text-sm">{description}</p>
    </div>
  );
}