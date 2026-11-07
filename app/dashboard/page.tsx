import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';
import { Tabs } from '@/components/ui';
import { auth } from '@/lib/auth';
import { UserProfile } from '@/lib/types';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      {/* India School Curriculum Hub */}
      <Card className="mb-6 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">India School Curriculum</h2>
        <p className="text-gray-500 mb-4">
          Classes 1st to 10th with NCERT alignment and chapter notes
        </p>
        
        {/* Grade selector */}
        <div className="mb-4">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((grade) => (
              <Button
                key={grade}
                variant={grade === 9 ? 'primary' : 'outline'}
                size="sm"
                onClick={() => console.log(`Grade ${grade} selected`)}
              >
                {grade}st
                {grade === 1 ? '' : grade === 2 ? 'nd' : grade === 3 ? 'rd' : 'th'}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Subjects */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Button variant="outline" size="sm">Math</Button>
          <Button variant="outline" size="sm">Science</Button>
          <Button variant="outline" size="sm">Social Science</Button>
          <Button variant="outline" size="sm">English</Button>
        </div>
        
        {/* Chapter notes and worksheets */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm">Chapter 1 Notes</Button>
          <Button variant="outline" size="sm">Chapter 2 Notes</Button>
          <Button variant="outline" size="sm">Practice Worksheet 1</Button>
          <Button variant="outline" size="sm">Practice Worksheet 2</Button>
        </div>
      </Card>
      
      {/* Advanced Tech, AI & ML School */}
      <Card className="mb-6 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Advanced Tech & AI/ML School</h2>
        <p className="text-gray-500 mb-6">
          Tracks for Python Programming, Machine Learning fundamentals, and Web Development
        </p>
        
        {/* Track cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-medium text-gray-900 mb-2">Python Programming</h3>
            <p className="text-gray-500 text-sm">From basics to advanced projects</p>
            <Button variant="outline" size="sm">Start Learning</Button>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-medium text-gray-900 mb-2">Machine Learning</h3>
            <p className="text-gray-500 text-sm">Fundamentals and real-world projects</p>
            <Button variant="outline" size="sm">Start Learning</Button>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-medium text-gray-900 mb-2">Web Development</h3>
            <p className="text-gray-500 text-sm">Modern web technologies and frameworks</p>
            <Button variant="outline" size="sm">Start Learning</Button>
          </Card>
        </div>
      </Card>
      
      {/* Coding Challenges & Sandbox */}
      <Card className="mb-6 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Coding Challenges & Sandbox</h2>
        <p className="text-gray-500 mb-6">
          Interactive code challenge cards with difficulty tags and code runner
        </p>
        
        {/* Difficulty tags */}
        <div className="flex gap-2 mb-4">
          <Button variant="default" size="sm">Easy</Button>
          <Button variant="default" size="sm" className="bg-yellow-500 text-yellow-900">Medium</Button>
          <Button variant="default" size="sm" className="bg-red-500 text-white">Hard</Button>
        </div>
        
        {/* Challenge cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="font-medium text-gray-900">Web Form Validation</h3>
            <p className="text-gray-500 text-sm">HTML/CSS/JavaScript</p>
            <div className="mt-3">
              <Button variant="outline" size="xs">Solve</Button>
            </div>
          </Card>
          <Card className="p-4">
            <h3 className="font-medium text-gray-900">Python Script</h3>
            <p className="text-gray-500 text-sm">Automation script</p>
            <div className="mt-3">
              <Button variant="outline" size="xs">Solve</Button>
            </div>
          </Card>
        </div>
      </Card>
      
      {/* Daily Quiz & Streak Tracker */}
      <Card className="mb-6 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Daily Quiz & Streak Tracker</h2>
        <p className="text-gray-500 mb-6">
          Gamified daily quiz with instant scoring, XP gains, and leaderboard
        </p>
        
        {/* Quiz card */}
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Daily Quiz</p>
              <p className="text-xs text-gray-500">10 questions</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">85</span>
              <span className="text-xs text-gray-400">XP</span>
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
            <div 
              className="h-full rounded-full bg-primary transition-width"
              style={{ width: '70%' }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">70% complete</p>
        </div>
        
        {/* Leaderboard */}
        <div className="mt-6">
          <h3 className="font-medium text-gray-900 mb-3">Leaderboard</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>1. Ananya</span>
              <span>250 XP</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>2. Rohit</span>
              <span>230 XP</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>3. Priya</span>
              <span>210 XP</span>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Live Tuition Classes */}
      <Card className="mb-6 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Live Tuition Classes</h2>
        <p className="text-gray-500 mb-6">
          Live room list with video placeholder links
        </p>
        
        {/* Live rooms */}
        <div className="grid grid-cols-1 gap-3">
          {[1, 2, 3, 4, 5].map((id) => (
            <div key={id} className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Class {id}</p>
                  <p className="text-xs text-gray-500">Mathematics</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Join class {id}"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 0 1 1 1h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-16a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm10-1L7 15l5 3 5-3-5-3z" />
                  </svg>
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Link: /live/[classId]</p>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Certification Hub */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Certification Hub</h2>
        <p className="text-gray-500 mb-6">
          View earned certificates and download mock completion badges
        </p>
        
        {/* Certification cards */}
        <div className="grid grid-cols-1 gap-4">
          <Card className="p-4 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3 20 -2 -8 2 -8 3 20-3 -2-3 20-2 -8 2 -8 3 -2-3 20-2 -8 2 -8 3 -2z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900">Python Programming</h3>
            <p className="text-xs text-gray-500 mb-2">Course Completion</p>
            <Button variant="outline" size="sm">Download Badge</Button>
          </Card>
          <Card className="p-4 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-green-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9 2-.9c.04 0 .08 0 .12 0C7.4 10 9 11.1 9 12s1.4 2 3.5 3.5.75.63.75.88c0 .25 0 .5-.01.75l2 2c-.16.75-1.07 1.35-2.25 1.05V15c0-1.1-.9-2-2-2s-2 .9-2 2v.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5h.5c1.1 0 2-.9 2-2s-.9-2-2-2v-.5c0-.08 0-.16.01-.25l2-2c.75-.75.16-1.75-.75-2.25S11 5 9.5 4.5 7 5.5 7 6.5c0-1.1.9-2 2-2s2 .9 2 2v.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5h5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-5zM9 9c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S9.83 9 9 9z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900">Machine Learning</h3>
            <p className="text-xs text-gray-500 mb-2">Course Completion</p>
            <Button variant="outline" size="sm">Download Badge</Button>
          </Card>
          <Card className="p-4 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 21c-1.32 0-2.4-1.08-2.4-2.4V5.69l2.77-1.56 2.05.96c.52.24.75.78.75 1.39 0 1.23-1.09 2.33-2.4 2.33m7.51-12.99c.03-.3 .05-.61.05-.92 0-.6-.27-1.02-.75-1.22l-1.57-1.04.83-2.91c.2-1.06.2-2.2.2-3.33 0-.51-.08-.86-.2-1.13l-.82.73c-.66-.08-1.27-.3-1.69-.75-.43-.45-.66-.99-.66-1.53 0-1.06.55-1.95 1.46-2.38l1.58-.78c.59-.3 1.26-.5 2.08-.5s1.49.2 2.08.5l1.58.78c.91.45 1.46 1.33 1.46 2.38 0 1.06-.55 1.95-1.46 2.38l-.82.72c.18.36.33.7.48 1.04l1.68.85c-.06 1.36-1.08 2.56-2.67 3.35l.74 1.16c.39-.93.6-2.03.6-3.25 0-2.16-1.6-3.96-3.8-3.96m4.96 16.89h-2.5v-5.35c0-1.27.67-2.16 1.5-2.53.83-.37 1.5-.76 1.5-1.29V6.25c0-1.01-.53-1.63-1.27-1.68-.74-.05-1.28.08-1.65.33l-.56.32c-.06-.27-.1-.55-.1-.84v-.65c-.03-.6-.3-1.08-.85-1.27l-.55-.3-.56.3c-.06.27-.1.55-.1.84v.65c-.37.23-.7.47-.85.53l-.56-.3c-.06-.27-.1-.55-.1-.84v-.55c0-.28.03-.55.08-.83l.56-.3c.06-.27.1-.55.1-.84v-.35c0-.31.08-.52.1-.77l.53-.32c.03-.17.05-.35.05-.55 0-.66-.2-1.27-.58-1.63l-.45-.27c-.15-.08-.3-.17-.46-.26l-.5-.3c-.28-.13-.5-.27-.68-.4l-.5.3c-.28.13-.5.27-.68.4l-.5-.3c-.28.13-.5.27-.68.4l-.48-.3c-.2.15-.38.3-.57.53l-.38-.2c-.1-.1-.18-.2-.26-.3l.43-2.56c.03-.26.02-.53-.02-.8l-.43-2.56a5.968 5.968 0 0 0-.73-.08l-.43 2.56c-.05.26-.08.53-.08.8v.35c0 .29.03.53.08.77l.53.32c.03.17.05.35.05.55 0 .66.2 1.27.58 1.63l.45.27c.15.08.3.17.46.26l.5.3c.28.13.5.27.68.4l.5-.3c.28-.13.5-.27.68-.4l.48.3c.2-.15.38-.3.57-.53l.38.2c.1.1.18.2.26.3l-.43-2.56c-.03-.26-.02-.53.02-.8l.43-2.56z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900">Web Development</h3>
            <p className="text-xs text-gray-500 mb-2">Course Completion</p>
            <Button variant="outline" size="sm">Download Badge</Button>
          </Card>
        </div>
      </Card>
    </div>
  );
}