import { useEffect, useState } from 'react';
import { adminApi, BlogPost, YogaInstructor } from '@shared/api/admin.api';
import { Button, Spinner } from '@shared/ui';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

export const BlogManagement = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [instructors, setInstructors] = useState<YogaInstructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [postsData, instructorsData] = await Promise.all([
        adminApi.getPosts(),
        adminApi.getInstructors(),
      ]);
      setPosts(postsData);
      setInstructors(instructorsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить эту статью?')) return;
    try {
      await adminApi.deletePost(id);
      await loadData();
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('Ошибка при удалении');
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      await adminApi.updatePost(post.id, { isPublished: !post.isPublished });
      await loadData();
    } catch (error) {
      console.error('Failed to toggle publish:', error);
      alert('Ошибка при изменении статуса');
    }
  };

  const categoryNames: Record<string, string> = {
    PRACTICE: 'Практика',
    PHILOSOPHY: 'Философия',
    HEALTH: 'Здоровье',
    LIFESTYLE: 'Образ жизни',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (showForm) {
    return (
      <BlogForm
        post={editingPost}
        instructors={instructors}
        onSave={() => {
          setShowForm(false);
          setEditingPost(null);
          loadData();
        }}
        onCancel={() => {
          setShowForm(false);
          setEditingPost(null);
        }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text">Блог</h2>
        <Button variant="primary" onClick={() => setShowForm(true)}>
          <Plus size={16} className="mr-2" />
          Новая статья
        </Button>
      </div>

      <div className="space-y-4">
        {posts.map(post => (
          <div
            key={post.id}
            className={`bg-surface-hover rounded-lg p-4 border-2 ${
              post.isPublished ? 'border-border' : 'border-amber-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-text">{post.title}</h3>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                    {categoryNames[post.category]}
                  </span>
                  {!post.isPublished && (
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded text-xs font-medium">
                      Черновик
                    </span>
                  )}
                </div>

                <p className="text-sm text-text-secondary mb-3 line-clamp-2">{post.excerpt}</p>

                <div className="flex items-center gap-4 text-xs text-text-secondary">
                  <span>Автор: {post.author.name}</span>
                  <span>•</span>
                  <span>Slug: /{post.slug}</span>
                  <span>•</span>
                  <span>{post.readingTime} мин чтения</span>
                  {post.publishedAt && (
                    <>
                      <span>•</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString('ru-RU')}</span>
                    </>
                  )}
                </div>

                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs text-text-secondary">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleTogglePublish(post)}
                  className="p-2 hover:bg-surface rounded text-text-secondary hover:text-text"
                  title={post.isPublished ? 'Снять с публикации' : 'Опубликовать'}
                >
                  {post.isPublished ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                <button
                  onClick={() => {
                    setEditingPost(post);
                    setShowForm(true);
                  }}
                  className="p-2 hover:bg-surface rounded text-text-secondary hover:text-text"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 hover:bg-surface rounded text-red-600 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface BlogFormProps {
  post: BlogPost | null;
  instructors: YogaInstructor[];
  onSave: () => void;
  onCancel: () => void;
}

const BlogForm = ({ post, instructors, onSave, onCancel }: BlogFormProps) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    authorId: post?.authorId || '',
    category: post?.category || 'PRACTICE',
    tags: post?.tags.join(', ') || '',
    readingTime: post?.readingTime || 5,
    isPublished: post?.isPublished || false,
  });
  const [saving, setSaving] = useState(false);

  const categories = ['PRACTICE', 'PHILOSOPHY', 'HEALTH', 'LIFESTYLE'];
  const categoryLabels: Record<string, string> = {
    PRACTICE: 'Практика',
    PHILOSOPHY: 'Философия',
    HEALTH: 'Здоровье',
    LIFESTYLE: 'Образ жизни',
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[а-яё]/g, c => {
        const map: Record<string, string> = {
          а: 'a',
          б: 'b',
          в: 'v',
          г: 'g',
          д: 'd',
          е: 'e',
          ё: 'yo',
          ж: 'zh',
          з: 'z',
          и: 'i',
          й: 'y',
          к: 'k',
          л: 'l',
          м: 'm',
          н: 'n',
          о: 'o',
          п: 'p',
          р: 'r',
          с: 's',
          т: 't',
          у: 'u',
          ф: 'f',
          х: 'h',
          ц: 'ts',
          ч: 'ch',
          ш: 'sh',
          щ: 'sch',
          ъ: '',
          ы: 'y',
          ь: '',
          э: 'e',
          ю: 'yu',
          я: 'ya',
        };
        return map[c] || c;
      })
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const data = {
        ...formData,
        tags: formData.tags
          .split(',')
          .map(t => t.trim())
          .filter(t => t),
      };

      if (post) {
        await adminApi.updatePost(post.id, data);
      } else {
        await adminApi.createPost(data);
      }
      onSave();
    } catch (error) {
      console.error('Failed to save post:', error);
      alert('Ошибка при сохранении');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-text mb-6">
        {post ? 'Редактировать статью' : 'Новая статья'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-4xl">
        <div>
          <label className="block text-sm font-medium text-text mb-2">Заголовок</label>
          <input
            type="text"
            value={formData.title}
            onChange={e => handleTitleChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">Slug (URL)</label>
          <input
            type="text"
            value={formData.slug}
            onChange={e => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <p className="text-xs text-text-secondary mt-1">URL: /blog/{formData.slug}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">Краткое описание</label>
          <textarea
            value={formData.excerpt}
            onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">Содержание (Markdown)</label>
          <textarea
            value={formData.content}
            onChange={e => setFormData({ ...formData, content: e.target.value })}
            rows={12}
            className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text mb-2">Автор</label>
            <select
              value={formData.authorId}
              onChange={e => setFormData({ ...formData, authorId: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Выберите автора</option>
              {instructors.map(instructor => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Категория</label>
            <select
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {categoryLabels[cat]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Теги (через запятую)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={e => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="йога, медитация, здоровье"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Время чтения (мин)</label>
            <input
              type="number"
              value={formData.readingTime}
              onChange={e => setFormData({ ...formData, readingTime: parseInt(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isPublished}
              onChange={e => setFormData({ ...formData, isPublished: e.target.checked })}
              className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary"
            />
            <span className="text-sm font-medium text-text">Опубликовать</span>
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? 'Сохранение...' : 'Сохранить'}
          </Button>
          <Button type="button" variant="ghost" onClick={onCancel}>
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
};
