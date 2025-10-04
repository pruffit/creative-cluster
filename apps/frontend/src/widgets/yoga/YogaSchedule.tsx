import { Clock, Users, TrendingUp } from 'lucide-react';
import { Card, Badge } from '@shared/ui';
import type { YogaClass } from '@shared/api/yoga.api';

interface YogaScheduleProps {
  schedule: YogaClass[];
}

const dayNames: Record<string, string> = {
  MONDAY: 'Понедельник',
  TUESDAY: 'Вторник',
  WEDNESDAY: 'Среда',
  THURSDAY: 'Четверг',
  FRIDAY: 'Пятница',
  SATURDAY: 'Суббота',
  SUNDAY: 'Воскресенье',
};

const levelColors: Record<string, 'default' | 'success' | 'warning'> = {
  BEGINNER: 'success',
  INTERMEDIATE: 'warning',
  ADVANCED: 'warning',
  ALL: 'default',
};

const levelNames: Record<string, string> = {
  BEGINNER: 'Начинающие',
  INTERMEDIATE: 'Средний',
  ADVANCED: 'Продвинутый',
  ALL: 'Все уровни',
};

export const YogaSchedule = ({ schedule }: YogaScheduleProps) => {

  const scheduleByDay = schedule.reduce(
    (acc, yogaClass) => {
      if (!acc[yogaClass.dayOfWeek]) {
        acc[yogaClass.dayOfWeek] = [];
      }
      acc[yogaClass.dayOfWeek]?.push(yogaClass);
      return acc;
    },
    {} as Record<string, YogaClass[]>
  );

  const daysOrder = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  const sortedDays = daysOrder.filter(day => scheduleByDay[day]);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-text mb-4">Расписание занятий</h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Выберите удобное время для практики
          </p>
        </div>

        <div className="space-y-8">
          {sortedDays.map(day => (
            <div key={day}>
              <h3 className="text-2xl font-semibold text-text mb-4">{dayNames[day]}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scheduleByDay[day]?.map(yogaClass => {
                  const isFull = yogaClass.currentParticipants >= yogaClass.maxParticipants;
                  const spotsLeft = yogaClass.maxParticipants - yogaClass.currentParticipants;

                  return (
                    <Card key={yogaClass.id} hover className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-text mb-1">
                            {yogaClass.title}
                          </h4>
                          <p className="text-sm text-text-secondary">{yogaClass.instructor.name}</p>
                        </div>
                        <Badge variant={levelColors[yogaClass.level]}>
                          {levelNames[yogaClass.level]}
                        </Badge>
                      </div>

                      <p className="text-sm text-text-secondary mb-4">{yogaClass.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-text-secondary">
                          <Clock size={16} className="mr-2" />
                          <span>
                            {yogaClass.startTime} • {yogaClass.duration} мин
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-text-secondary">
                          <Users size={16} className="mr-2" />
                          <span>
                            {yogaClass.currentParticipants} / {yogaClass.maxParticipants} человек
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-text-secondary">
                          <TrendingUp size={16} className="mr-2" />
                          <span>{Number(yogaClass.price)} ₽</span>
                        </div>
                      </div>

                      {!isFull && spotsLeft <= 3 && (
                        <p className="text-xs text-amber-600 dark:text-amber-400 mb-3">
                          Осталось {spotsLeft} {spotsLeft === 1 ? 'место' : 'места'}
                        </p>
                      )}

                      <button
                        disabled={isFull}
                        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                          isFull
                            ? 'bg-surface-hover text-text-tertiary cursor-not-allowed'
                            : 'bg-primary hover:bg-primary-dark text-white'
                        }`}
                      >
                        {isFull ? 'Мест нет' : 'Записаться'}
                      </button>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};