import { Component, ReactNode } from 'react';
import { Button } from '@shared/ui';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="mb-8">
              <div className="text-6xl mb-4">💥</div>
              <h1 className="text-3xl font-bold text-text mb-2">
                Что-то пошло не так
              </h1>
              <p className="text-text-secondary mb-4">
                Произошла непредвиденная ошибка. Мы уже работаем над её исправлением.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-4 text-left">
                  <summary className="cursor-pointer text-sm text-text-secondary hover:text-text">
                    Детали ошибки
                  </summary>
                  <pre className="mt-2 p-4 bg-surface rounded-lg text-xs overflow-auto">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
            </div>
            <Button
              variant="primary"
              onClick={() => window.location.href = '/'}
            >
              Вернуться на главную
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}