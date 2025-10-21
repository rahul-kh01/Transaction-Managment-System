import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details but filter out DevTools profiler errors
    if (error?.name === 'DataCloneError' && error?.message?.includes('measure')) {
      // Suppress DataCloneError from React profiler
      console.warn('React DevTools profiler error suppressed (non-critical)');
      return;
    }
    
    // Log other errors
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && 
        this.state.error?.name !== 'DataCloneError') {
      // Don't show error UI for DataCloneError - just continue rendering
      return this.props.fallback || (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>Something went wrong.</h1>
          <p>Please refresh the page or contact support if the problem persists.</p>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

