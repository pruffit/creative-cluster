import { Award, Instagram, MessageCircle } from 'lucide-react';
import { Card } from '@shared/ui';
import type { YogaInstructor } from '@shared/api/yoga.api';

interface YogaInstructorsProps {
  instructors: YogaInstructor[];
}

export const YogaInstructors = ({ instructors }: YogaInstructorsProps) => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-text mb-4">Наши инструкторы</h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Опытные преподаватели с международными сертификатами
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {instructors.map(instructor => (
            <Card key={instructor.id}>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-shrink-0">
                  {instructor.avatar ? (
                    <img
                      src={instructor.avatar}
                      alt={instructor.name}
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center text-white text-4xl font-bold">
                      {instructor.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-text mb-2">{instructor.name}</h3>

                  <div className="flex items-center text-sm text-text-secondary mb-3">
                    <Award size={16} className="mr-2" />
                    <span>Опыт {instructor.experience} лет</span>
                  </div>

                  <p className="text-sm text-text-secondary mb-4">{instructor.bio}</p>

                  {instructor.specializations.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-text mb-2">Специализация:</h4>
                      <div className="flex flex-wrap gap-2">
                        {instructor.specializations.map((spec, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-surface-hover rounded-full text-xs text-text"
                          >
                            {spec.style}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {instructor.certifications.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-text mb-2">Сертификаты:</h4>
                      <ul className="text-xs text-text-secondary space-y-1">
                        {instructor.certifications.map((cert, index) => (
                          <li key={index}>• {cert}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(instructor.instagram || instructor.telegram) && (
                    <div className="flex gap-3">
                      {instructor.instagram && (
                        <a
                          href={`https://instagram.com/${instructor.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-surface-hover hover:bg-border transition-colors text-text-secondary hover:text-text"
                          aria-label="Instagram"
                        >
                          <Instagram size={18} />
                        </a>
                      )}
                      {instructor.telegram && (

                          <a
                            href={`https://t.me/${instructor.telegram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-surface-hover hover:bg-border transition-colors text-text-secondary hover:text-text"
                            aria-label="Telegram"
                          >
                          <MessageCircle size={18} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};