import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import globleState from "./Redux Toolkit/globleState.js";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import ErrorBoundary from "@/components/ErrorBoundary";
import { suppressDevToolsWarnings } from "@/utils/suppressDevToolsWarnings";

// Suppress DevTools warnings and profiler errors
suppressDevToolsWarnings();

createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <BrowserRouter>
      <Provider store={globleState}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <App />
          <Toaster />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </ErrorBoundary>
);
