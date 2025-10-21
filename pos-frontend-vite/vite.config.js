import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      // React 19 support with automatic JSX runtime
      jsxRuntime: 'automatic',
      fastRefresh: true,
    }), 
    tailwindcss()
  ],
  // Optimize dependencies for React 19
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
    esbuildOptions: {
      jsx: 'automatic',
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: mode !== 'production', // Only generate sourcemaps in development
    // Optimize build to reduce memory issues
    chunkSizeWarningLimit: 1500, // Increased to accommodate large UI library bundles
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React libraries
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'react-vendor';
          }
          // Redux state management
          if (id.includes('node_modules/@reduxjs/toolkit') || id.includes('node_modules/react-redux')) {
            return 'redux-vendor';
          }
          // Radix UI components (split into separate chunk due to size)
          if (id.includes('node_modules/@radix-ui')) {
            return 'radix-vendor';
          }
          // Chart and visualization libraries
          if (id.includes('node_modules/recharts') || id.includes('node_modules/d3-')) {
            return 'chart-vendor';
          }
          // Form handling
          if (id.includes('node_modules/react-hook-form') || 
              id.includes('node_modules/formik') || 
              id.includes('node_modules/yup') || 
              id.includes('node_modules/zod')) {
            return 'form-vendor';
          }
          // Icons and utilities
          if (id.includes('node_modules/lucide-react')) {
            return 'icon-vendor';
          }
          // Date utilities
          if (id.includes('node_modules/date-fns') || id.includes('node_modules/react-day-picker')) {
            return 'date-vendor';
          }
          // Other node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },
}));
