'use client';

import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface TopicInputProps {
  onSubmit: (topic: string) => void;
  disabled?: boolean;
}

export default function TopicInput({ onSubmit, disabled = false }: TopicInputProps) {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !disabled) {
      onSubmit(topic.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Paste any complex topic here... (e.g., 'quantum physics', 'machine learning', 'climate change')"
            className="w-full p-6 pr-16 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors duration-200 min-h-[120px] max-h-[300px]"
            disabled={disabled}
          />
          <button
            type="submit"
            disabled={!topic.trim() || disabled}
            className="absolute bottom-4 right-4 p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl transition-all duration-200 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl disabled:shadow-none"
          >
            {disabled ? (
              <Sparkles className="w-5 h-5 animate-pulse" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            <span className="hidden sm:inline">Explain</span>
          </button>
        </div>
        
        <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 text-center">
          Press <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">⌘</kbd> + <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Enter</kbd> to submit
        </div>
      </form>
    </div>
  );
} 