import React from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaSync } from 'react-icons/fa';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to analytics if available
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: false
      });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      const { fallback: CustomFallback, sectionName = 'section' } = this.props;
      
      // Use custom fallback if provided
      if (CustomFallback) {
        return <CustomFallback onRetry={this.handleRetry} error={this.state.error} />;
      }
      
      // Default fallback UI
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8 text-center"
          role="alert"
          aria-live="polite"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
              <FaExclamationTriangle className="text-red-600 dark:text-red-400 text-2xl" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                Oops! Something went wrong
              </h3>
              <p className="text-red-700 dark:text-red-300 mb-4">
                We encountered an error while loading this {sectionName}. Please try refreshing or contact support if the problem persists.
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={this.handleRetry}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-300"
              aria-label={`Retry loading ${sectionName}`}
            >
              <FaSync className="text-sm" />
              Try Again
            </motion.button>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left w-full max-w-2xl">
                <summary className="text-red-600 dark:text-red-400 cursor-pointer font-medium">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 p-4 bg-red-100 dark:bg-red-900/50 rounded text-xs text-red-800 dark:text-red-200 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 