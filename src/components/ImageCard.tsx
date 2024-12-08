import { Download, Clock, Wand2 } from 'lucide-react';
import { Button } from './Button';
import type { GeneratedImage } from '../types/image';

interface ImageCardProps {
  image: GeneratedImage;
  onDownload: () => void;
}

export function ImageCard({ image, onDownload }: ImageCardProps) {
  const formattedDate = new Date(image.timestamp).toLocaleString();

  return (
    <div className="group overflow-hidden rounded-lg bg-gray-800/50 shadow-lg transition-transform hover:scale-[1.02]">
      <div className="relative aspect-square">
        <img
          src={image.url}
          alt={image.prompt}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div className="space-y-4 p-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-300">{image.prompt}</p>
          {image.style && (
            <div className="flex items-center gap-1 text-xs text-purple-500">
              <Wand2 className="h-3 w-3" />
              {image.style}
            </div>
          )}
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="h-3 w-3" />
            {formattedDate}
          </div>
        </div>
        <Button onClick={onDownload} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
    </div>
  );
}