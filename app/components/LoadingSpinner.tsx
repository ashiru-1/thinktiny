import { Brain, Sparkles } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin border-t-blue-600 dark:border-t-blue-400"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-pulse" />
        </div>
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Thinking...
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          Our AI is crafting explanations at different levels. This usually takes 10-30 seconds.
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-bounce" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Generating child, teen, and expert explanations
          </span>
        </div>
      </div>
    </div>
  );
} 