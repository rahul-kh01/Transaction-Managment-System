import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      jsxRuntime: "automatic",
      fastRefresh: true,
      babel: {
        plugins: [
          ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
        ],
      },
    }),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Remove explicit React aliases to prevent conflicts
    },
  },

  define: {
    "process.env.NODE_ENV": JSON.stringify(mode),
    global: "globalThis",
  },

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "react-router",
      "react-redux",
      "@reduxjs/toolkit",
      "recharts",
      "react-icons",
      "react-icons/fi",
      "react-icons/ai",
      "react-icons/bi",
      "react-icons/bs",
      "react-icons/cg",
      "react-icons/ci",
      "react-icons/di",
      "react-icons/fc",
      "react-icons/fa",
      "react-icons/gi",
      "react-icons/go",
      "react-icons/gr",
      "react-icons/hi",
      "react-icons/hi2",
      "react-icons/im",
      "react-icons/io",
      "react-icons/io5",
      "react-icons/lia",
      "react-icons/lu",
      "react-icons/md",
      "react-icons/pi",
      "react-icons/ri",
      "react-icons/rx",
      "react-icons/si",
      "react-icons/sl",
      "react-icons/tb",
      "react-icons/tfi",
      "react-icons/ti",
      "react-icons/vsc",
      "react-icons/wi",
      "axios",
      "clsx",
      "tailwind-merge",
      "class-variance-authority",
      "sonner",
      "next-themes",
      "date-fns",
      "formik",
      "yup",
      "zod",
      "@hookform/resolvers",
      "react-hook-form",
      "react-day-picker",
      "embla-carousel-react",
      "cmdk",
      "vaul",
      "input-otp",
      "@react-pdf/renderer",
      "react-resizable-panels",
    ],
    exclude: [
      "@radix-ui/react-accordion",
      "@radix-ui/react-alert-dialog",
      "@radix-ui/react-aspect-ratio",
      "@radix-ui/react-avatar",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-collapsible",
      "@radix-ui/react-context-menu",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-hover-card",
      "@radix-ui/react-label",
      "@radix-ui/react-menubar",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-progress",
      "@radix-ui/react-radio-group",
      "@radix-ui/react-scroll-area",
      "@radix-ui/react-select",
      "@radix-ui/react-separator",
      "@radix-ui/react-slider",
      "@radix-ui/react-slot",
      "@radix-ui/react-switch",
      "@radix-ui/react-tabs",
      "@radix-ui/react-toast",
      "@radix-ui/react-toggle",
      "@radix-ui/react-toggle-group",
      "@radix-ui/react-tooltip",
    ],
    esbuildOptions: {
      jsx: "automatic",
      target: "es2020",
      define: {
        global: "globalThis",
      },
    },
  },

  build: {
    outDir: "dist",
    sourcemap: true,
    minify: "esbuild",
    target: "es2020",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // React core - keep React and React-DOM together
          "react-core": ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
          
          // Router
          "router": ["react-router"],
          
          // Redux
          "redux-vendor": ["@reduxjs/toolkit", "react-redux"],
          
          // Charts
          "charts-vendor": ["recharts"],
          
          // Icons
          "icons-vendor": ["react-icons"],
          
          // Radix UI - group all Radix components
          "radix-vendor": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-aspect-ratio",
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-collapsible",
            "@radix-ui/react-context-menu",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-hover-card",
            "@radix-ui/react-label",
            "@radix-ui/react-menubar",
            "@radix-ui/react-navigation-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-progress",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slider",
            "@radix-ui/react-slot",
            "@radix-ui/react-switch",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
            "@radix-ui/react-toggle",
            "@radix-ui/react-toggle-group",
            "@radix-ui/react-tooltip",
          ],
          
          // Forms
          "forms-vendor": [
            "formik",
            "react-hook-form",
            "@hookform/resolvers",
            "yup",
            "zod",
            "input-otp",
          ],
          
          // Utilities
          "utils-vendor": [
            "axios",
            "clsx",
            "tailwind-merge",
            "class-variance-authority",
            "date-fns",
            "sonner",
            "next-themes",
            "vaul",
            "cmdk",
            "embla-carousel-react",
            "react-day-picker",
            "react-resizable-panels",
            "@react-pdf/renderer",
          ],
        },
      },
    },
  },

  ssr: {
    noExternal: [
      "recharts",
      "react-icons",
      "@radix-ui/react-accordion",
      "@radix-ui/react-alert-dialog",
      "@radix-ui/react-aspect-ratio",
      "@radix-ui/react-avatar",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-collapsible",
      "@radix-ui/react-context-menu",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-hover-card",
      "@radix-ui/react-label",
      "@radix-ui/react-menubar",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-progress",
      "@radix-ui/react-radio-group",
      "@radix-ui/react-scroll-area",
      "@radix-ui/react-select",
      "@radix-ui/react-separator",
      "@radix-ui/react-slider",
      "@radix-ui/react-slot",
      "@radix-ui/react-switch",
      "@radix-ui/react-tabs",
      "@radix-ui/react-toast",
      "@radix-ui/react-toggle",
      "@radix-ui/react-toggle-group",
      "@radix-ui/react-tooltip",
    ],
  },

  server: {
    port: 3000,
    host: true,
    open: true,
  },

  preview: {
    port: 4173,
    host: true,
    open: true,
  },
}));
