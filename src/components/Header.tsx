import { Sparkles, Settings2 } from 'lucide-react';
import { Button } from './Button';

interface HeaderProps {
  onOpenSettings: () => void;
}

export function Header({ onOpenSettings }: HeaderProps) {
  return (
    <div className="relative border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-purple-500" />
            <div>
              <h1 className="text-2xl font-bold">AI Image Generator</h1>
              <p className="text-sm text-gray-400">Powered by Stable Diffusion XL</p>
            </div>
          </div>
          <Button variant="outline" onClick={onOpenSettings}>
            <Settings2 className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
}