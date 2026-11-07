import { cn } from '@/lib/utils';
import { AiTutorCard } from '@/components/features/ai-tutor-card';
import { UserProfile } from '@/lib/types';

interface AiTutoringPageProps {
  user: UserProfile | null;
}

export function AiTutoringPage({ user }: AiTutoringPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI Powered Tutoring
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Get personalized help with any subject, step-by-step explanations, and adaptive practice
          </p>
        </div>

        {/* AI Tutoring Interface */}
        <AiTutorCard user={user} onStartSession={() => console.log('Start AI session')} />

        {/* AI Chat Interface */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
          <div className="h-96 overflow-y-auto space-y-4">
            {/* Chat Messages */}
            {[
              { role: 'assistant', message: 'Hello! I\'m your AI tutoring assistant. What subject would you like help with today?', isGenerated: true },
              { role: 'user', message: 'I need help with quadratic equations', isGenerated: false },
              { role: 'assistant', message: 'Great! Let me explain quadratic equations step by step...', isGenerated: true },
            ].map((turn, index) => (
              <div key={index} className={cn(
                'flex',
                turn.role === 'user' ? 'justify-end' : 'justify-start',
              )}>
                <div className={cn(
                  'max-w-70 px-4 py-2 rounded-lg',
                  'bg-indigo-50 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100',
                  turn.role === 'user' ? 'rounded-tl-lg' : 'rounded-tr-lg',
                  turn.role === 'user' ? 'ml-auto' : 'mr-auto',
                )}>
                  <p className="text-sm">{turn.message}</p>
                  {turn.isGenerated && (
                    <p className="text-xs text-indigo-500 mt-1">AI Generated</p>
                  )}
                </div>
              </div>
            ))}

            {/* Input Area */}
            <div className="flex gap-2">
              <textarea
                placeholder="Type your question or concept here..."
                className="flex-1 px-4 py-2 rounded-md bg-gray-50 dark:bg-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                rows={2}
              />
              <Button variant="primary" size="sm">Send to AI</Button>
            </div>
          </div>
        </div>

        {/* Quick Topics */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Button variant="outline" size="sm">Quadratic Equations</Button>
          <Button variant="outline" size="sm">Linear Equations</Button>
          <Button variant="outline" size="sm">Calculus Basics</Button>
          <Button variant="outline" size="sm">Geometry</Button>
          <Button variant="outline" size="sm">Physics Problems</Button>
          <Button variant="outline" size="sm">Chemistry Basics</Button>
          <Button variant="outline" size="sm">English Grammar</Button>
          <Button variant="outline" size="sm">History Timeline</Button>
        </div>

      </div>
    </div>
  );
}