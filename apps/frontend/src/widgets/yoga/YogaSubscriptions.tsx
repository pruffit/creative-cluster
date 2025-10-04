import { Check, Star } from 'lucide-react';
import { Card } from '@shared/ui';
import type { Subscription } from '@shared/api/yoga.api';

interface YogaSubscriptionsProps {
  subscriptions: Subscription[];
}

export const YogaSubscriptions = ({ subscriptions }: YogaSubscriptionsProps) => {
  return (
    <section className="py-16 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-text mb-4">Абонементы</h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Выберите подходящий тариф и начните регулярную практику
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {subscriptions.map(subscription => {
            const pricePerClass = Math.round(Number(subscription.price) / subscription.classesCount);

            return (
              <Card
                key={subscription.id}
                className={`relative ${subscription.isPopular ? 'ring-2 ring-primary shadow-lg' : ''}`}
              >
                {subscription.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star size={14} fill="currentColor" />
                      Популярный
                    </div>
                  </div>
                )}

                <div className="text-center mb-6 pt-2">
                  <h3 className="text-2xl font-bold text-text mb-2">{subscription.name}</h3>
                  <p className="text-sm text-text-secondary mb-4">{subscription.description}</p>

                  <div className="mb-2">
                    <span className="text-4xl font-bold text-text">{Number(subscription.price)}</span>
                    <span className="text-text-secondary"> ₽</span>
                  </div>

                  {subscription.discount && (
                    <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                      Экономия {subscription.discount}%
                    </div>
                  )}

                  <div className="text-sm text-text-secondary mt-2">
                    {pricePerClass} ₽ за занятие
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {subscription.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <Check size={18} className="text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    subscription.isPopular
                      ? 'bg-primary hover:bg-primary-dark text-white'
                      : 'bg-surface-hover hover:bg-border text-text'
                  }`}
                >
                  Выбрать
                </button>
              </Card>
            );
          })}
        </div>

        <p className="text-center text-sm text-text-secondary mt-8 max-w-2xl mx-auto">
          * Абонементы не сгорают. Можно заморозить на время болезни или отпуска. Подробности у
          администратора.
        </p>
      </div>
    </section>
  );
};