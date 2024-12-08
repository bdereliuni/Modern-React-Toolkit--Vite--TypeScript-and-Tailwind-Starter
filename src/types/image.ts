export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
  style?: string;
  settings?: {
    steps: number;
    cfgScale: number;
    size: string;
  };
}