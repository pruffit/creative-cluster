import { useI18n } from '@shared/lib/hooks/useI18n';
import { Button } from '@shared/ui';
import { Badge } from '@shared/ui';

export const HeroSection = () => {
  const { t } = useI18n();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-amber-500/5" />

      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6 max-w-4xl mx-auto">
          <Badge variant="default">Samara, Russia</Badge>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text leading-tight">
            {t.hero.title}
          </h1>

          <p className="text-xl sm:text-2xl text-text-secondary max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button size="lg" variant="primary">
              {t.hero.cta}
            </Button>
            <Button size="lg" variant="secondary">
              {t.hero.learnMore}
            </Button>
          </div>

          <div className="pt-16">
            <div className="w-6 h-10 border-2 border-text-secondary rounded-full mx-auto flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-text-secondary rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};