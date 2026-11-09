import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';

export default function AIChatbot() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    const userMsg = { role: 'user', content: message };
    setMessages(prev => [...prev, userMsg]);
    setMessage('');

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const aiResponses = [
      "That's a great question! Let me help you with that.",
      "Based on your current progress, I'd recommend focusing on...",
      "Have you tried approaching this from a different angle?",
      "Great progress! Keep up the good work.",
    ];
    
    const randomIndex = Math.floor(Math.random() * aiResponses.length);
    const aiMsg = { role: 'assistant', content: aiResponses[randomIndex] };
    setMessages(prev => [...prev, aiMsg]);
  };

  return (
    <div className="bg-card border-border p-6 rounded-xl max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-white mb-4">AI Tutor</h2>
      
      <div className="h-96 bg-ink-900/50 rounded-xl overflow-y-auto mb-4 p-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-3 flex {msg.role === 'user' ? 'justify-end' : 'justify-start'}">
            <div className={`px-3 py-2 rounded-md max-w-70 ${msg.role === 'user' ? 'bg-brand-600 text-white' : 'bg-ink-900 text-white'}`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask AI tutor about Python, Math, or anything..."
          className="flex-1 rounded-lg bg-ink-900 border border-border text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <Button onClick={sendMessage} disabled={!message.trim()}>
          Send
        </Button>
      </div>
    </div>
  );
}