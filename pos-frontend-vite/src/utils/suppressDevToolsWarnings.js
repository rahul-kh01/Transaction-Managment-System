/**
 * Suppress React DevTools warnings and profiler errors
 * This prevents DataCloneError and other DevTools-related console spam
 */
export function suppressDevToolsWarnings() {
  if (import.meta.env.DEV) {
    // Patch the DevTools hook to disable profiling without breaking React Refresh
    try {
      if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
        
        // Disable profiling support to prevent DataCloneError
        if (hook.supportsProfiling !== undefined) {
          hook.supportsProfiling = false;
        }
        
        // Wrap the onCommitFiberRoot to catch errors
        if (hook.onCommitFiberRoot) {
          const originalOnCommitFiberRoot = hook.onCommitFiberRoot;
          hook.onCommitFiberRoot = function(...args) {
            try {
              return originalOnCommitFiberRoot.apply(this, args);
            } catch (err) {
              if (err?.name === 'DataCloneError') {
                // Silently ignore DataCloneError
                return;
              }
              throw err;
            }
          };
        }
      }
    } catch (err) {
      // Ignore errors in patching DevTools hook
      console.warn('Could not patch DevTools hook:', err);
    }

    // Suppress the "Download React DevTools" message
    const originalConsoleLog = console.log;
    const originalConsoleWarn = console.warn;
    const originalConsoleError = console.error;

    console.log = (...args) => {
      const message = args[0];
      if (
        typeof message === 'string' &&
        (message.includes('Download the React DevTools') ||
         message.includes('react-devtools') ||
         message.includes('React DevTools'))
      ) {
        return; // Suppress this message
      }
      originalConsoleLog.apply(console, args);
    };

    console.warn = (...args) => {
      const message = args[0];
      if (
        typeof message === 'string' &&
        (message.includes('Download the React DevTools') ||
         message.includes('react-devtools') ||
         message.includes('React DevTools') ||
         message.includes('installed version of React DevTools'))
      ) {
        return; // Suppress this warning
      }
      originalConsoleWarn.apply(console, args);
    };

    console.error = (...args) => {
      const error = args[0];
      
      // Suppress DataCloneError from Performance API
      if (
        error instanceof Error &&
        error.name === 'DataCloneError' &&
        error.message?.includes('measure')
      ) {
        return; // Suppress this error
      }
      
      // Suppress error messages that mention DataCloneError
      if (
        typeof error === 'string' &&
        (error.includes('DataCloneError') ||
         error.includes('React DevTools') ||
         error.includes('injectIntoGlobalHook'))
      ) {
        return; // Suppress this error
      }
      
      originalConsoleError.apply(console, args);
    };

    // Override performance.measure to catch DataCloneError
    if (window.performance && window.performance.measure) {
      const originalMeasure = window.performance.measure;
      window.performance.measure = function(...args) {
        try {
          return originalMeasure.apply(this, args);
        } catch (err) {
          if (err?.name === 'DataCloneError') {
            // Silently ignore DataCloneError from performance.measure
            return undefined;
          }
          throw err;
        }
      };
    }

    // Handle uncaught errors
    window.addEventListener('error', (event) => {
      if (
        event.error?.name === 'DataCloneError' ||
        event.error?.message?.includes('measure') ||
        event.error?.message?.includes('injectIntoGlobalHook') ||
        event.message?.includes('React DevTools')
      ) {
        event.preventDefault();
        return false;
      }
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      if (
        event.reason?.name === 'DataCloneError' ||
        event.reason?.message?.includes('measure')
      ) {
        event.preventDefault();
        return false;
      }
    });
  }
}

