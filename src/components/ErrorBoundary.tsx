import React from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-surface flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-surface-container-lowest rounded-3xl shadow-2xl p-12 text-center border border-outline-variant/10">
            <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-8 text-error">
              <AlertTriangle size={40} />
            </div>
            <h1 className="text-3xl font-serif font-bold text-on-surface mb-4">Something went wrong</h1>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              An unexpected error occurred. We've been notified and are looking into it.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => window.location.reload()}
                className="w-full py-4 bg-primary text-white rounded-full font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary-container transition-all"
              >
                <RefreshCcw size={18} />
                Reload Application
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="w-full py-4 bg-surface-container-high text-on-surface rounded-full font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-all"
              >
                <Home size={18} />
                Return Home
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 p-4 bg-surface-container-low rounded-xl text-left overflow-auto max-h-40">
                <p className="text-xs font-mono text-error">{this.state.error?.toString()}</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
