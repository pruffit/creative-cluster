import { useNavigate } from 'react-router-dom';
import { Activity, Coffee, BookOpen, LucideIcon } from 'lucide-react';
import { useI18n } from '@shared/lib/hooks/useI18n';
import { Card } from '@shared/ui';

interface DirectionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
}

const DirectionCard = ({ icon: Icon, title, description, color, onClick }: DirectionCardProps) => {
  return (
    <Card hover onClick={onClick}>
      <div
        className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
      >
        <Icon size={28} className="text-white" />
      </div>
      <h3 className="text-xl font-semibold text-text mb-2">{title}</h3>
      <p className="text-text-secondary">{description}</p>
      <div className="mt-4 flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform">
        <span className="text-sm">→</span>
      </div>
    </Card>
  );
};

export const DirectionsSection = () => {
  const { t } = useI18n();
  const navigate = useNavigate();

  const directions = [
    {
      icon: Activity,
      title: t.directions.yoga.title,
      description: t.directions.yoga.description,
      color: 'bg-gradient-to-br from-green-500 to-emerald-600',
      path: '/yoga',
    },
    {
      icon: Coffee,
      title: t.directions.tea.title,
      description: t.directions.tea.description,
      color: 'bg-gradient-to-br from-amber-500 to-orange-600',
      path: '/tea',
    },
    {
      icon: BookOpen,
      title: t.directions.bookClub.title,
      description: t.directions.bookClub.description,
      color: 'bg-gradient-to-br from-purple-500 to-pink-600',
      path: '/book-club',
    },
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-text mb-4">{t.directions.title}</h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">{t.directions.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {directions.map((direction, index) => (
            <DirectionCard
              key={index}
              icon={direction.icon}
              title={direction.title}
              description={direction.description}
              color={direction.color}
              onClick={() => navigate(direction.path)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
