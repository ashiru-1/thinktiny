'use client';

import { useState } from 'react';
import { Brain, Sparkles, BookOpen, GraduationCap, Lightbulb } from 'lucide-react';
import TopicInput from './components/TopicInput';
import ExplanationDisplay from './components/ExplanationDisplay';
import LoadingSpinner from './components/LoadingSpinner';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [explanations, setExplanations] = useState<{
    child: string;
    teen: string;
    expert: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTopicSubmit = async (inputTopic: string) => {
    if (!inputTopic.trim()) return;
    
    setIsLoading(true);
    setError('');
    setTopic(inputTopic);

    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: inputTopic }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate explanations');
      }

      const data = await response.json();
      setExplanations(data);
    } catch (err) {
      setError('Failed to generate explanations. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ThinkTiny
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Paste any complex topic and get explanations at different levels: 
            <span className="font-semibold text-blue-600 dark:text-blue-400"> 5-year-old</span>, 
            <span className="font-semibold text-purple-600 dark:text-purple-400"> 15-year-old</span>, and 
            <span className="font-semibold text-indigo-600 dark:text-indigo-400"> expert</span>.
          </p>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto">
          <TopicInput onSubmit={handleTopicSubmit} disabled={isLoading} />
          
          {isLoading && (
            <div className="mt-8">
              <LoadingSpinner />
            </div>
          )}

          {error && (
            <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {explanations && !isLoading && (
            <div className="mt-8">
              <ExplanationDisplay 
                topic={topic} 
                explanations={explanations} 
              />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400">
          <p className="text-sm">
            Powered by AI • Built for learning • 
            <span className="ml-1">Highlight differences side-by-side like a learning timeline</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
