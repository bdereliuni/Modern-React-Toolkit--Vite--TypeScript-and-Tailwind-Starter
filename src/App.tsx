import React, { useState } from 'react';
import { ImageCard } from './components/ImageCard';
import { PromptInput } from './components/PromptInput';
import { Header } from './components/Header';
import { SettingsDialog, type GenerationSettings } from './components/SettingsDialog';
import { Image as ImageIcon } from 'lucide-react';
import { generateImage } from './services/api';
import type { GeneratedImage } from './types/image';

const DEFAULT_SETTINGS: GenerationSettings = {
  steps: 30,
  cfgScale: 7,
  size: '1024x1024',
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleGenerate = async (prompt: string, style?: string) => {
    setIsLoading(true);
    try {
      const imageUrl = await generateImage(
        prompt,
        style,
        JSON.parse(JSON.stringify(settings)) // Ensure settings are serializable
      );
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: imageUrl,
        prompt,
        timestamp: Date.now(),
        style,
        settings: JSON.parse(JSON.stringify(settings)), // Ensure settings are serializable
      };
      setImages(prev => [newImage, ...prev]);
    } catch (error) {
      console.error('Failed to generate image:', error);
      alert(error instanceof Error ? error.message : 'Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'generated-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header onOpenSettings={() => setIsSettingsOpen(true)} />
      
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-12 flex justify-center">
          <PromptInput onGenerate={handleGenerate} isLoading={isLoading} />
        </div>

        {images.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image) => (
              <ImageCard
                key={image.id}
                image={image}
                onDownload={() => handleDownload(image.url)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-700 py-12">
            <ImageIcon className="mb-4 h-12 w-12 text-gray-600" />
            <p className="text-gray-400">No images generated yet. Start by entering a prompt above!</p>
          </div>
        )}
      </main>

      <SettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={setSettings}
      />
    </div>
  );
}

export default App;