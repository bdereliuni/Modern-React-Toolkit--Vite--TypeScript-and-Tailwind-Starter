import axios from 'axios';
import type { GenerationSettings } from '../components/SettingsDialog';

const API_KEY = import.meta.env.VITE_STABLE_DIFFUSION_API_KEY;
const API_URL = 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';

export async function generateImage(
  prompt: string,
  style?: string,
  settings?: GenerationSettings
): Promise<string> {
  try {
    let enhancedPrompt = prompt;
    if (style) {
      enhancedPrompt += `, ${style.toLowerCase()} style`;
    }

    const [width, height] = (settings?.size || '1024x1024').split('x').map(Number);

    const requestData = {
      text_prompts: [{ text: enhancedPrompt }],
      cfg_scale: settings?.cfgScale || 7,
      height,
      width,
      steps: settings?.steps || 30,
      samples: 1,
    };

    const response = await axios.post(
      API_URL,
      JSON.parse(JSON.stringify(requestData)), // Ensure data is serializable
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    if (!response.data?.artifacts?.[0]?.base64) {
      throw new Error('Invalid response from Stability AI API');
    }

    return `data:image/png;base64,${response.data.artifacts[0].base64}`;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API Error: ${error.response?.data?.message || error.message}`);
    }
    throw error;
  }
}