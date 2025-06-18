'use client';

import { useState } from 'react';
import { Baby, GraduationCap, Brain, Copy, Check, ArrowRight, Lightbulb } from 'lucide-react';

interface ExplanationDisplayProps {
  topic: string;
  explanations: {
    child: string;
    teen: string;
    expert: string;
  };
}

export default function ExplanationDisplay({ topic, explanations }: ExplanationDisplayProps) {
  const [copiedLevel, setCopiedLevel] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'timeline' | 'side-by-side'>('timeline');

  const copyToClipboard = async (text: string, level: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLevel(level);
      setTimeout(() => setCopiedLevel(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const levels = [
    {
      key: 'child',
      title: '5-Year-Old Level',
      icon: Baby,
      color: 'blue',
      explanation: explanations.child,
      description: 'Simple, fun, and easy to understand'
    },
    {
      key: 'teen',
      title: '15-Year-Old Level',
      icon: GraduationCap,
      color: 'purple',
      explanation: explanations.teen,
      description: 'More detailed with examples'
    },
    {
      key: 'expert',
      title: 'Expert Level',
      icon: Brain,
      color: 'indigo',
      explanation: explanations.expert,
      description: 'Comprehensive and technical'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
      purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-200',
      indigo: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 text-indigo-800 dark:text-indigo-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600 dark:text-blue-400',
      purple: 'text-purple-600 dark:text-purple-400',
      indigo: 'text-indigo-600 dark:text-indigo-400'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Topic Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {topic}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Explained at three different levels
        </p>
      </div>

      {/* View Toggle */}
      <div className="flex justify-center">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setActiveView('timeline')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeView === 'timeline'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            Timeline View
          </button>
          <button
            onClick={() => setActiveView('side-by-side')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeView === 'side-by-side'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            Side-by-Side
          </button>
        </div>
      </div>

      {activeView === 'timeline' ? (
        /* Timeline View */
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-indigo-400"></div>
          
          <div className="space-y-8">
            {levels.map((level, index) => {
              const IconComponent = level.icon;
              return (
                <div key={level.key} className="relative flex items-start gap-6">
                  {/* Timeline Dot */}
                  <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full ${getColorClasses(level.color)} flex items-center justify-center border-2`}>
                    <IconComponent className={`w-8 h-8 ${getIconColor(level.color)}`} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                          {level.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {level.description}
                        </p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(level.explanation, level.key)}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        title="Copy explanation"
                      >
                        {copiedLevel === level.key ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {level.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Side-by-Side View */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {levels.map((level) => {
            const IconComponent = level.icon;
            return (
              <div key={level.key} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getColorClasses(level.color)}`}>
                      <IconComponent className={`w-6 h-6 ${getIconColor(level.color)}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-gray-100">
                        {level.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {level.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(level.explanation, level.key)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    title="Copy explanation"
                  >
                    {copiedLevel === level.key ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="prose prose-sm prose-gray dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                    {level.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Key Differences Highlight */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Key Differences
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <strong className="text-blue-700 dark:text-blue-300">Child Level:</strong>
              <p className="text-gray-600 dark:text-gray-400">Uses simple words, analogies, and avoids complex concepts</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <strong className="text-purple-700 dark:text-purple-300">Teen Level:</strong>
              <p className="text-gray-600 dark:text-gray-400">Includes more details, examples, and some technical terms</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <strong className="text-indigo-700 dark:text-indigo-300">Expert Level:</strong>
              <p className="text-gray-600 dark:text-gray-400">Comprehensive coverage with technical terminology and depth</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 