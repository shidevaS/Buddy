import { cn } from '@/lib/utils';
import { UserProfile } from '@/lib/types';

interface CodeChallengeCardProps {
  challenge: CodeChallenge;
  onStart: () => void;
}

export function CodeChallengeCard({ challenge, onStart }: CodeChallengeCardProps) {
  const difficultyClass = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800',
  };

  return (
    <div className="group bg-white rounded-lg p-6 border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{challenge.title}</h3>
          <p className="text-sm text-gray-500">{challenge.description}</p>
        </div>
        <span className={cn('px-2 py-1 rounded text-xs', difficultyClass[challenge.difficulty])}>
          {challenge.difficulty}
        </span>
      </div>
      
      <div className="mt-4">
        <Button variant="outline" size="sm" onClick={onStart}>
          Solve Challenge
        </Button>
      </div>
    </div>
  );
}

interface CodingSandboxProps {
  user: UserProfile | null;
  onCodeChange: (code: string) => void;
  onRun: () => void;
}

export function CodingSandbox({ user, onCodeChange, onRun }: CodingSandboxProps) {
  const [code, setCode] = React.useState(''); // Will be replaced with Monaco
  const [output, setOutput] = React.useState<string | null>(null);
  const [language, setLanguage] = React.useState<'python' | 'javascript' | 'typescript' | 'html_css'>('javascript');

  return (
    <div className="space-y-6">
      {/* Language Selector */}
      <div className="flex gap-2 mb-6">
        <Button 
          variant={language === 'javascript' ? 'primary' : 'outline'} 
          size="sm" 
          onClick={() => setLanguage('javascript')}
        >
          JavaScript
        </Button>
        <Button 
          variant={language === 'python' ? 'primary' : 'outline'} 
          size="sm" 
          onClick={() => setLanguage('python')}
        >
          Python
        </Button>
        <Button 
          variant={language === 'typescript' ? 'primary' : 'outline'} 
          size="sm" 
          onClick={() => setLanguage('typescript')}
        >
          TypeScript
        </Button>
        <Button 
          variant={language === 'html_css' ? 'primary' : 'outline'} 
          size="sm" 
          onClick={() => setLanguage('html_css')}
        >
          HTML/CSS
        </Button>
      </div>

      {/* Code Editor Area */}
      <div className="bg-gray-50 rounded-lg p-6 min-h-[300px]">
        <textarea
          value={code || ''}
          onChange={(e) => onCodeChange(e.target.value)}
          placeholder={language === 'html_css' 
            ? '<!DOCTYPE html>\n<html>\n<head>\n  <title>OmniLearn Challenge</title>\n</head>\n<body>\n  <!-- Your code here>\n</body>\n</html>'
            : language === 'python'
            ? '# Write your Python code here\nprint("Hello, OmniLearn!")'
            : '// Write your code here'}
          className="w-full h-full rounded-md bg-white p-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
          rows={10}
        />
      </div>

      {/* Run Button and Output */}
      <div className="flex gap-3">
        <Button variant="primary" size="sm" onClick={onRun}>
          {output ? 'Ran Successfully' : 'Run'}
        </Button>
        {output && (
          <div className="w-64 h-24 bg-gray-100 rounded-md p-4 mt-3 overflow-auto">
            <pre className="text-xs text-gray-700">{output}</pre>
          </div>
        )}
      </div>

      {/* Challenge Suggestions */}
      {user && (
        <div className="pt-6 border-t border-gray-200">
          <h3 className="font-medium text-gray-900 mb-3">Recommended Challenges</h3>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3].map((id) => (
              <Button 
                key={id} 
                variant="outline" 
                size="sm" 
                onClick={() => console.log(`Start challenge ${id}`)}
              >
                Challenge {id}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}