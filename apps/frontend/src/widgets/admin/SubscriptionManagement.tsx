import { useEffect, useState } from 'react';
import { adminApi, Subscription } from '@shared/api/admin.api';
import { Button, Spinner } from '@shared/ui';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';

export const SubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSub, setEditingSub] = useState<Subscription | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getSubscriptions();
      setSubscriptions(data);
    } catch (error) {
      console.error('Failed to load subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить этот абонемент?')) return;
    try {
      await adminApi.deleteSubscription(id);
      await loadData();
    } catch (error) {
      console.error('Failed to delete subscription:', error);
      alert('Ошибка при удалении');
    }
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
      <SubForm
        subscription={editingSub}
        onSave={() => {
          setShowForm(false);
          setEditingSub(null);
          loadData();
        }}
        onCancel={() => {
          setShowForm(false);
          setEditingSub(null);
        }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text">Абонементы</h2>
        <Button variant="primary" onClick={() => setShowForm(true)}>
          <Plus size={16} className="mr-2" />
          Добавить абонемент
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subscriptions.map(sub => (
          <div
            key={sub.id}
            className={`bg-surface-hover rounded-lg p-6 border-2 ${
              sub.isPopular ? 'border-primary' : 'border-border'
            }`}
          >
            {sub.isPopular && (
              <div className="flex items-center gap-1 text-primary text-sm font-medium mb-2">
                <Star size={14} fill="currentColor" />
                Популярный
              </div>
            )}

            <h3 className="text-xl font-bold text-text mb-2">{sub.name}</h3>
            <p className="text-sm text-text-secondary mb-4">{sub.description}</p>

            <div className="mb-4">
              <div className="text-3xl font-bold text-text">
                {sub.price} <span className="text-lg">₽</span>
              </div>
              {sub.discount && <div className="text-sm text-green-600">Скидка {sub.discount}%</div>}
            </div>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Занятий:</span>
                <span className="text-text font-medium">{sub.classesCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Срок действия:</span>
                <span className="text-text font-medium">{sub.validityDays} дней</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm font-medium text-text mb-2">Преимущества:</div>
              <ul className="text-xs text-text-secondary space-y-1">
                {sub.features.map((feature, idx) => (
                  <li key={idx}>• {feature}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setEditingSub(sub);
                  setShowForm(true);
                }}
                className="flex-1"
              >
                <Edit2 size={14} className="mr-1" />
                Изменить
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDelete(sub.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface SubFormProps {
  subscription: Subscription | null;
  onSave: () => void;
  onCancel: () => void;
}

const SubForm = ({ subscription, onSave, onCancel }: SubFormProps) => {
  const [formData, setFormData] = useState({
    name: subscription?.name || '',
    description: subscription?.description || '',
    classesCount: subscription?.classesCount || 4,
    validityDays: subscription?.validityDays || 30,
    price: subscription?.price || 2000,
    discount: subscription?.discount || 0,
    features: subscription?.features.join('\n') || '',
    isPopular: subscription?.isPopular || false,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const data = {
        ...formData,
        features: formData.features.split('\n').filter(f => f.trim()),
      };

      if (subscription) {
        await adminApi.updateSubscription(subscription.id, data);
      } else {
        await adminApi.createSubscription(data);
      }
      onSave();
    } catch (error) {
      console.error('Failed to save subscription:', error);
      alert('Ошибка при сохранении');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-text mb-6">
        {subscription ? 'Редактировать абонемент' : 'Новый абонемент'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-text mb-2">Название</label>
          <input
            type="text"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">Описание</label>
          <textarea
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text mb-2">Количество занятий</label>
            <input
              type="number"
              value={formData.classesCount}
              onChange={e => setFormData({ ...formData, classesCount: parseInt(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Срок действия (дней)</label>
            <input
              type="number"
              value={formData.validityDays}
              onChange={e => setFormData({ ...formData, validityDays: parseInt(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Цена (₽)</label>
            <input
              type="number"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Скидка (%)</label>
            <input
              type="number"
              value={formData.discount}
              onChange={e => setFormData({ ...formData, discount: parseInt(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Преимущества (каждое с новой строки)
          </label>
          <textarea
            value={formData.features}
            onChange={e => setFormData({ ...formData, features: e.target.value })}
            rows={5}
            className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Безлимитное посещение&#10;Все классы&#10;Скидка 20%"
            required
          />
        </div>

        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isPopular}
              onChange={e => setFormData({ ...formData, isPopular: e.target.checked })}
              className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary"
            />
            <span className="text-sm font-medium text-text">Популярный (выделить)</span>
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
