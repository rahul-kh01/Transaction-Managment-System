// Comprehensive error handling utilities
export class ErrorHandler {
  static logError(error, errorInfo = {}) {
    console.error('Error caught:', error);
    console.error('Error info:', errorInfo);
    
    // Log to external service in production
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production') {
      // Add your error reporting service here
      // Example: Sentry.captureException(error, { extra: errorInfo });
    }
  }

  static handleAsyncError(error) {
    console.error('Async error:', error);
    return {
      error: true,
      message: error.message || 'An unexpected error occurred',
      stack: error.stack,
    };
  }

  static handlePromiseRejection(event) {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
  }

  static setupGlobalErrorHandlers() {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', this.handlePromiseRejection);
    
    // Handle global errors
    window.addEventListener('error', (event) => {
      this.logError(event.error, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    });
  }
}

// React error boundary helper
export const withErrorBoundary = (Component, fallback = null) => {
  return class extends window.React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
      ErrorHandler.logError(error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return fallback || <div>Something went wrong.</div>;
      }

      return <Component {...this.props} />;
    }
  };
};

// Development error overlay
export const ErrorOverlay = ({ error, resetError }) => {
  if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '20px',
      zIndex: 9999,
      overflow: 'auto',
    }}>
      <h2>Development Error</h2>
      <pre style={{ whiteSpace: 'pre-wrap' }}>
        {error?.toString()}
      </pre>
      <button onClick={resetError} style={{ marginTop: '10px' }}>
        Dismiss
      </button>
    </div>
  );
};
