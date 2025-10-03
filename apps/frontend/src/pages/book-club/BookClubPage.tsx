import { useI18n } from '@shared/lib/hooks/useI18n';

export const BookClubPage = () => {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-text mb-4">{t.nav.bookClub}</h1>
        <p className="text-xl text-text-secondary">{t.directions.bookClub.description}</p>
        <div className="mt-8 p-8 bg-surface rounded-xl border border-border">
          <p className="text-text-secondary">Страница в разработке...</p>
        </div>
      </div>
    </div>
  );
};
