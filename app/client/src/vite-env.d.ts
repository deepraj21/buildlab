/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_GEMINI_API_KEY: string;
  readonly VITE_GOOGLE_SEARCH_API: string;
  readonly VITE_SEARCH_ENGINE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}