/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STABLE_DIFFUSION_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}