import { Button } from '@shared/ui';

export const YogaHero = () => {
  const scrollToSchedule = () => {
    document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSubscriptions = () => {
    document.getElementById('subscriptions')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-500/10 via-background to-emerald-500/5">
      <div className="absolute top-20 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 bg-green-500/10 text-green-700 dark:text-green-400 rounded-full text-sm font-medium mb-4">
            🧘‍♀️ Йога-студия
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text leading-tight">
            Путь к гармонии
            <br />
            <span className="text-gradient bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              тела и разума
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-text-secondary max-w-2xl mx-auto">
            Практикуйте йогу с опытными инструкторами в уютной атмосфере нашей студии
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button size="lg" variant="primary" onClick={scrollToSchedule}>
              Посмотреть расписание
            </Button>
            <Button size="lg" variant="secondary" onClick={scrollToSubscriptions}>
              Выбрать абонемент
            </Button>
          </div>

          <div className="pt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-text mb-2">10+</div>
              <div className="text-sm text-text-secondary">Классов в неделю</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-text mb-2">2</div>
              <div className="text-sm text-text-secondary">Опытных инструктора</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-text mb-2">500+</div>
              <div className="text-sm text-text-secondary">Довольных учеников</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
