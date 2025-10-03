import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@shared/ui';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-text mb-2">
            Страница не найдена
          </h2>
          <p className="text-text-secondary">
            К сожалению, запрашиваемая страница не существует или была перемещена.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2"
          >
            <Home size={20} />
            На главную
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Назад
          </Button>
        </div>
      </div>
    </div>
  );
};