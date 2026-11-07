import { cn } from '@/lib/utils';
import { CodeSandbox, CodeChallengeCard } from '@/components/features/code-challenge-card';
import { CodeChallenge, DifficultyLevel } from '@/lib/types';

interface CodingSandboxProps {
  user: import('@/lib/types').UserProfile | null;
}

export function CodingSandboxPage({ user }: CodingSandboxProps) {
  const [challenges, setChallenges] = React.useState<CodeChallenge[]>([]);
  const [activeChallenge, setActiveChallenge] = React.useState<CodeChallenge | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<DifficultyLevel>('Easy');

  // Sample challenges data
  React.useEffect(() => {
    const sampleChallenges: CodeChallenge[] = [
      {
        id: '1',
        title: 'Web Form Validation',
        description: 'Validate user input on a form using HTML, CSS, and JavaScript',
        difficulty: 'Easy',
        language: 'html_css',
        starterCode: '<form>\n  <input type="email" placeholder="Enter email"/>\n  <button type="submit">Submit</button>\n</form>',
        testCases: [
          { input: '<form><input type="email" placeholder="Enter email"/><button type="submit">Submit</button></form>', expectedOutput: 'Form submitted successfully' },
        ],
      },
      {
        id: '2',
        title: 'Python Calculator',
        description: 'Build a simple calculator that can add, subtract, multiply, and divide',
        difficulty: 'Medium',
        language: 'python',
        starterCode: 'def calculator():\n    while True:\n        operation = input("Enter operation (+, -, *, /): ")\n        if operation == "exit":\n            break\n        num1 = float(input("Enter first number: "))\n        num2 = float(input("Enter second number: "))\n        if operation == "+":\n            print(f"Result: {num1 + num2}")\n        elif operation == "-":\n            print(f"Result: {num1 - num2}")\n        elif operation == "*":\n            print(f"Result: {num1 * num2}")\n        elif operation == "/":\n            if num2 != 0:\n                print(f"Result: {num1 / num2}")\n            else:\n                print("Cannot divide by zero")',
        testCases: [],
      },
      {
        id: '3',
        title: 'Sorting Algorithm',
        description: 'Implement a function that sorts an array of numbers',
        difficulty: 'Hard',
        language: 'javascript',
        starterCode: 'function sortArray(arr) {\n  // Write your sorting algorithm here\n  return arr;\n}',
        testCases: [
          { input: '[5, 2, 8, 1, 9]', expectedOutput: '[1, 2, 5, 8, 9]' },
        ],
      },
      {
        id: '4',
        title: 'Data Structure Practice',
        description: 'Implement a queue using two stacks',
        difficulty: 'Medium',
        language: 'python',
        starterCode: 'class Queue:\n    def __init__(self):\n        self.in_stack = []\n        self.out_stack = []\n\n    def enqueue(self, item):\n        self.in_stack.append(item)\n\n    def dequeue(self):\n        if not self.out_stack:\n            while self.in_stack:\n                self.out_stack.append(self.in_stack.pop())\n        return self.out_stack.pop() if self.out_stack else None',
        testCases: [],
      },
    ];

    setChallenges(sampleChallenges);
    setActiveChallenge(sampleChallenges[0]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Coding Challenges & Sandbox
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Interactive code challenges with difficulty levels and an interactive code editor
          </p>
        </div>

        {/* Difficulty Filters */}
        <div className="mb-6 flex gap-2">
          <Button
            variant={selectedDifficulty === 'Easy' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedDifficulty('Easy')}
          >
            Easy
          </Button>
          <Button
            variant={selectedDifficulty === 'Medium' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedDifficulty('Medium')}
          >
            Medium
          </Button>
          <Button
            variant={selectedDifficulty === 'Hard' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedDifficulty('Hard')}
          >
            Hard
          </Button>
        </div>

        {/* Challenge Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {challenges
            .filter((c) => c.difficulty === selectedDifficulty)
            .map((challenge) => (
              <CodeChallengeCard
                key={challenge.id}
                challenge={challenge}
                onStart={() => setActiveChallenge(challenge)}
              />
            ))}
        </div>

        {/* Code Sandbox Area */}
        {activeChallenge && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-600 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {activeChallenge.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{activeChallenge.description}</p>
              
              {/* Difficulty Badge */}
              <span className={cn(
                'px-2 py-1 rounded text-xs',
                {
                  Easy: 'bg-green-100 text-green-800',
                  Medium: 'bg-yellow-100 text-yellow-800',
                  Hard: 'bg-red-100 text-red-800',
                }[activeChallenge.difficulty as DifficultyLevel]
              )}>
                {activeChallenge.difficulty}
              </span>
            </div>

            {/* Code Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Code Editor ({activeChallenge.language})
              </label>
              <textarea
                defaultValue={activeChallenge.starterCode || ''}
                className="w-full h-[400px] rounded-md bg-gray-50 dark:bg-gray-900 p-4 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                rows={15}
                placeholder={`// ${activeChallenge.title}\n// Start coding here...`}
              />
            </div>

            {/* Run Button */}
            <div className="flex justify-end">
              <Button variant="primary" size="sm">
                Run Code
              </Button>
            </div>

            {/* Test Results */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Test Results</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                All test cases passing!
              </p>
            </div>
          </div>
        )}

        {/* Recommended Challenges */}
        {user && (
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-600">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Recommended for You
            </h2>
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
    </div>
  );
}