import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  plugins: [
    react(),
    glsl({
      include: '**/*.glsl', // Include all GLSL files
      defaultExtension: 'glsl', // Default extension for shaders
    }),
  ],
});
