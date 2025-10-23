import React from 'react';
import { ErrorHandler } from '@/utils/errorHandler';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { 
      hasError: true, 
      error,
      errorId: Date.now().toString()
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details but filter out DevTools profiler errors
    if (error?.name === 'DataCloneError' && error?.message?.includes('measure')) {
      // Suppress DataCloneError from React profiler
      console.warn('React DevTools profiler error suppressed (non-critical)');
      return;
    }
    
    this.setState({
      errorInfo: errorInfo,
    });
    
    // Enhanced error logging
    ErrorHandler.logError(error, {
      ...errorInfo,
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError && 
        this.state.error?.name !== 'DataCloneError') {
      // Don't show error UI for DataCloneError - just continue rendering
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="max-w-md w-full bg-card shadow-lg rounded-lg p-6 border">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-destructive/10 rounded-full">
              <svg
                className="w-6 h-6 text-destructive"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-medium text-foreground">
                Something went wrong
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We're sorry, but something unexpected happened. Please try
                refreshing the page or contact support if the issue persists.
              </p>
              
              {this.state.errorId && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Error ID: {this.state.errorId}
                </p>
              )}
              
              <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={this.handleReset}
                  className="inline-flex items-center px-4 py-2 border border-input bg-background text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  Try Again
                </button>
                <button
                  onClick={this.handleReload}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  Refresh Page
                </button>
              </div>
              
              {typeof process !== 'undefined' && process.env?.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-4 text-left">
                  <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                    Error Details (Development)
                  </summary>
                  <div className="mt-2 text-xs text-destructive bg-destructive/10 p-3 rounded border overflow-auto max-h-40">
                    <div className="font-semibold mb-2">Error:</div>
                    <pre className="whitespace-pre-wrap">{this.state.error.toString()}</pre>
                    
                    {this.state.errorInfo && (
                      <>
                        <div className="font-semibold mb-2 mt-3">Component Stack:</div>
                        <pre className="whitespace-pre-wrap text-xs">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </>
                    )}
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

