import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../utils/cn';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GenerationSettings;
  onSave: (settings: GenerationSettings) => void;
}

export interface GenerationSettings {
  steps: number;
  cfgScale: number;
  size: string;
}

const SIZES = ['512x512', '768x768', '1024x1024'];

export function SettingsDialog({ isOpen, onClose, settings, onSave }: SettingsDialogProps) {
  const [localSettings, setLocalSettings] = useState(settings);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Generation Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              Steps: {localSettings.steps}
            </label>
            <input
              type="range"
              min="20"
              max="50"
              value={localSettings.steps}
              onChange={(e) => setLocalSettings({ ...localSettings, steps: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              CFG Scale: {localSettings.cfgScale}
            </label>
            <input
              type="range"
              min="1"
              max="20"
              step="0.5"
              value={localSettings.cfgScale}
              onChange={(e) => setLocalSettings({ ...localSettings, cfgScale: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">Image Size</label>
            <div className="grid grid-cols-3 gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setLocalSettings({ ...localSettings, size })}
                  className={cn(
                    'rounded-md border border-gray-700 px-3 py-2 text-sm transition-colors',
                    localSettings.size === size
                      ? 'border-purple-500 bg-purple-500/10 text-purple-500'
                      : 'hover:border-gray-600'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                onSave(localSettings);
                onClose();
              }}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}