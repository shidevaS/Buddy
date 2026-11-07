import { cn } from '@/lib/utils';
import { UserProfile } from '@/lib/types';

interface AiTutorCardProps {
  user: UserProfile | null;
  onStartSession: () => void;
}

export function AiTutorCard({ user, onStartSession }: AiTutorCardProps) {
  return (
    <div className="space-y-4">
      {/* AI Tutoring Header */}
      <div className="p-6 bg-gradient-to-b from-indigo-50 to-violet-100 rounded-2xl border border-indigo-200">
        <h2 className="text-xl font-bold text-indigo-800">
          AI Powered Tutoring Assistant
        </h2>
        <p className="text-sm text-indigo-600">
          Personalized learning support with real-time explanations and quiz generation
        </p>
      </div>

      {/* User Status */}
      {user ? (
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <img
                          src={user.image ?? '/placeholder.svg?height=40&width=40&text={user.name.substring(0,1)}'}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-primary"
            />
            <div>
              <p className="font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">Student</p>
            </div>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          size="lg"
          onClick={onStartSession}
          className="w-full justify-center">
          Start AI Tutoring Session
        </Button>
      )}

      {/* AI Features Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <FeatureCard
          icon="🤖"
          title="Personalized Learning"
          description="AI analyzes your strengths and weaknesses to recommend tailored content"
          color="indigo"
        />
        <FeatureCard
          icon="📝"
          title="AI-Generated Quizzes"
          description="Adaptive quizzes with instant explanations and performance tracking"
                  color="violet"
        />
        <FeatureCard
          icon="💡"
          title="Step-by-Step Help"
          description="Get hints and explanations for any concept or problem"
                  color="purple"
        />
      </div>

      {/* Quick Action Buttons */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="font-medium text-gray-900 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm">Ask AI Question</Button>
          <Button variant="outline" size="sm">Generate Quiz</Button>
          <Button variant="outline" size="sm">Get Study Plan</Button>
          <Button variant="outline" size="sm">Track Progress</Button>
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  color: 'indigo' | 'violet' | 'purple' | 'blue' | 'green';
}

function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  const colorMap: Record<string, string> = {
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    violet: 'bg-violet-50 text-violet-600 border-violet-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
  };

  return (
    <div className={cn(colorMap, 'rounded-lg p-4 hover:shadow-lg transition-shadow')}>
      <p className="text-3xl">{icon}</p>
      <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  );
}