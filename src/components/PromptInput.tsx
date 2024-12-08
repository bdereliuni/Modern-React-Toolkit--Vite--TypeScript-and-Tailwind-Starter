import { useState } from 'react';
import { Button } from './Button';
import { Wand2, Sparkles } from 'lucide-react';
import { cn } from '../utils/cn';

const STYLE_PRESETS = [
  'Photorealistic',
  'Digital Art',
  'Anime',
  'Oil Painting',
  'Watercolor',
  'Sketch',
];

interface PromptInputProps {
  onGenerate: (prompt: string, style?: string) => void;
  isLoading: boolean;
}

export function PromptInput({ onGenerate, isLoading }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt, selectedStyle);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="prompt" className="text-sm font-medium text-gray-200">
            Enter your prompt
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A mystical forest at twilight with glowing mushrooms and fireflies..."
            className="h-32 rounded-lg bg-gray-800/50 p-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-200">Style Presets</label>
          <div className="flex flex-wrap gap-2">
            {STYLE_PRESETS.map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => setSelectedStyle(style === selectedStyle ? undefined : style)}
                className={cn(
                  'flex items-center gap-1 rounded-full border px-3 py-1 text-sm transition-colors',
                  style === selectedStyle
                    ? 'border-purple-500 bg-purple-500/10 text-purple-500'
                    : 'border-gray-700 hover:border-gray-600'
                )}
              >
                {style === selectedStyle && <Sparkles className="h-3 w-3" />}
                {style}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button type="submit" isLoading={isLoading} className="w-full">
        <Wand2 className="mr-2 h-4 w-4" />
        Generate Image
      </Button>
    </form>
  );
}