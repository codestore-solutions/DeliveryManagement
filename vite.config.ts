import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = dotenv.config({
    path: `.env.${mode}`
  }).parsed;

  // Check if dotenv file was found and parsed
  if (!env) {
    throw new Error(`Failed to load ${mode} environment variables.`);
  }

  // Use the environment variables in your app
  const apiUrl = env.REACT_APP_API_BASE_URL_DELIVERY_AGENT;
  const apiUrl2 = env.REACT_APP_API_BASE_URL_ORDER_PROCESS;
  const apiUrl3 = env.REACT_APP_API_BASE_URL_FEEDBACK;
  return {
    plugins: [react()],
    define: {
      'process.env': {
        REACT_APP_API_BASE_URL_DELIVERY_AGENT: apiUrl,
        REACT_APP_API_BASE_URL_ORDER_PROCESS: apiUrl2,
        REACT_APP_API_BASE_URL_FEEDBACK: apiUrl3
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    assetsInclude: ['**/*.json', '**/*.woff', '**/*.woff2'],
    server: {
      watch: {
        ignored: ['web.config'],
      },
    },
  };
});
