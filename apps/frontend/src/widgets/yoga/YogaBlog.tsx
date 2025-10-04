import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card } from '@shared/ui';
import type { BlogPost } from '@shared/api/yoga.api';

interface YogaBlogProps {
  posts: BlogPost[];
}

const categoryNames: Record<string, string> = {
  PRACTICE: 'Практика',
  PHILOSOPHY: 'Философия',
  HEALTH: 'Здоровье',
  LIFESTYLE: 'Образ жизни',
};

export const YogaBlog = ({ posts }: YogaBlogProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Недавно';
    try {
      return new Date(dateString).toLocaleDateString('ru-RU');
    } catch {
      return 'Недавно';
    }
  };

  return (
    <section className="py-16 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-text mb-4">Блог о йоге</h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Полезные статьи о практике, философии и здоровом образе жизни
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <Card key={post.id} hover>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium mb-3">
                  {categoryNames[post.category] || post.category}
                </span>
                <h3 className="text-xl font-semibold text-text mb-2 line-clamp-2">{post.title}</h3>
              </div>

              <p className="text-sm text-text-secondary mb-4 line-clamp-3">{post.excerpt}</p>

              <div className="flex items-center gap-4 text-xs text-text-secondary mb-4">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>{post.readingTime} мин</span>
                </div>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="text-xs text-text-secondary">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center">
                  {post.author.avatar ? (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center text-white text-xs font-bold mr-2">
                      {post.author.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-xs text-text-secondary">{post.author.name}</span>
                </div>

                  <a
                    href={`/yoga/blog/${post.slug}`}
                    className="flex items-center text-sm text-primary hover:text-primary-dark font-medium transition-colors"
                  >
                    Читать
                    <ArrowRight size={16} className="ml-1" />
                  </a>
              </div>
            </Card>
          ))}
        </div>

        {posts.length > 6 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors">
              Все статьи
            </button>
          </div>
        )}
      </div>
    </section>
  );
};