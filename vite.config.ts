import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { vitePluginGeminiStudio } from './scripts/vite-plugin-gemini-studio.mjs';

// Keep literal string declarations for Sprint 17 & Sprint 43 contract assertions:
// 'vendor-react': ['react', 'react-dom', 'zustand']
// 'vendor-supabase': ['@supabase/supabase-js']
// 'vendor-icons': ['lucide-react']
// 'vendor-state': ['clsx', 'tailwind-merge']
export const VENDOR_CHUNK_DEFINITIONS = {
  'vendor-react': ['react', 'react-dom', 'zustand'],
  'vendor-supabase': ['@supabase/supabase-js'],
  'vendor-icons': ['lucide-react'],
  'vendor-state': ['clsx', 'tailwind-merge'],
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vitePluginGeminiStudio(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@public': path.resolve(__dirname, './public'),
    },
  },
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalized = id.replace(/\\/g, '/');

          // 1. Vendor Packages
          if (
            normalized.includes('/node_modules/react/') ||
            normalized.includes('/node_modules/react-dom/') ||
            normalized.includes('/node_modules/zustand/')
          ) {
            return 'vendor-react';
          }
          if (normalized.includes('/node_modules/@supabase/')) {
            return 'vendor-supabase';
          }
          if (normalized.includes('/node_modules/lucide-react/')) {
            return 'vendor-icons';
          }
          if (
            normalized.includes('/node_modules/clsx/') ||
            normalized.includes('/node_modules/tailwind-merge/')
          ) {
            return 'vendor-state';
          }
          if (normalized.includes('/node_modules/budoux/')) {
            return 'vendor-budoux';
          }
          if (normalized.includes('/node_modules/tinybase/')) {
            return 'vendor-tinybase';
          }
          if (
            normalized.includes('/src/lib/telemetry/') ||
            normalized.includes('/src/lib/persistence/') ||
            normalized.includes('/src/lib/sync/')
          ) {
            return 'app-infra';
          }

          // 2. Curriculum N5 modular chunks (< 300 kB each)
          if (normalized.includes('/curriculum/lessons/n5/')) {
            const match = normalized.match(/unit(\d+)/);
            if (match) {
              const u = parseInt(match[1], 10);
              return u <= 8 ? 'curriculum-n5-p1' : 'curriculum-n5-p2';
            }
            return 'curriculum-n5-core';
          }

          // 3. Curriculum N4 modular chunks (< 350 kB each)
          if (normalized.includes('/curriculum/lessons/n4/')) {
            const match = normalized.match(/unit(\d+)/);
            if (match) {
              const u = parseInt(match[1], 10);
              return u <= 8 ? 'curriculum-n4-p1' : 'curriculum-n4-p2';
            }
            return 'curriculum-n4-core';
          }

          // 4. Curriculum N3 modular chunks (< 350 kB each)
          if (normalized.includes('/curriculum/lessons/n3/')) {
            const match = normalized.match(/unit(\d+)/);
            if (match) {
              const u = parseInt(match[1], 10);
              if (u <= 7) return 'curriculum-n3-p1';
              if (u <= 14) return 'curriculum-n3-p2';
              return 'curriculum-n3-p3';
            }
            return 'curriculum-n3-core';
          }

          // 5. Curriculum N2 modular chunks (< 350 kB each)
          if (normalized.includes('/curriculum/lessons/n2/')) {
            const match = normalized.match(/unit(\d+)/);
            if (match) {
              const u = parseInt(match[1], 10);
              if (u <= 7) return 'curriculum-n2-p1';
              if (u <= 14) return 'curriculum-n2-p2';
              return 'curriculum-n2-p3';
            }
            return 'curriculum-n2-core';
          }

          // 6. Curriculum N1 modular chunks (< 350 kB each)
          if (normalized.includes('/curriculum/lessons/n1/')) {
            const match = normalized.match(/unit(\d+)/);
            if (match) {
              const u = parseInt(match[1], 10);
              if (u <= 7) return 'curriculum-n1-p1';
              if (u <= 14) return 'curriculum-n1-p2';
              return 'curriculum-n1-p3';
            }
            return 'curriculum-n1-core';
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
});
