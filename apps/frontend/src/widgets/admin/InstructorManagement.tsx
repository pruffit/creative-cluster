import { useEffect, useState } from 'react';
import { adminApi, YogaInstructor } from '@shared/api/admin.api';
import { Button, Spinner } from '@shared/ui';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export const InstructorManagement = () => {
  const [instructors, setInstructors] = useState<YogaInstructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState<YogaInstructor | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getInstructors();
      setInstructors(data);
    } catch (error) {
      console.error('Failed to load instructors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить этого инструктора? Это также удалит все связанные занятия.')) return;
    try {
      await adminApi.deleteInstructor(id);
      await loadData();
    } catch (error) {
      console.error('Failed to delete instructor:', error);
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
      <InstructorForm
        instructor={editingInstructor}
        onSave={() => {
          setShowForm(false);
          setEditingInstructor(null);
          loadData();
        }}
        onCancel={() => {
          setShowForm(false);
          setEditingInstructor(null);
        }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text">Инструкторы</h2>
        <Button variant="primary" onClick={() => setShowForm(true)}>
          <Plus size={16} className="mr-2" />
          Добавить инструктора
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {instructors.map(instructor => (
          <div key={instructor.id} className="bg-surface-hover rounded-lg p-6 border border-border">
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                {instructor.name.charAt(0)}
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-text mb-1">{instructor.name}</h3>
                <p className="text-sm text-text-secondary mb-2">
                  Опыт: {instructor.experience} лет
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {instructor.specializations.map((spec, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-surface rounded text-xs text-text-secondary"
                    >
                      {spec.style}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-text-secondary line-clamp-2 mb-3">{instructor.bio}</p>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditingInstructor(instructor);
                      setShowForm(true);
                    }}
                  >
                    <Edit2 size={14} className="mr-1" />
                    Изменить
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(instructor.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface InstructorFormProps {
  instructor: YogaInstructor | null;
  onSave: () => void;
  onCancel: () => void;
}

const InstructorForm = ({ instructor, onSave, onCancel }: InstructorFormProps) => {
  const [formData, setFormData] = useState({
    name: instructor?.name || '',
    bio: instructor?.bio || '',
    experience: instructor?.experience || 1,
    certifications: instructor?.certifications.join('\n') || '',
    specializations: instructor?.specializations.map(s => s.style) || [],
    instagram: instructor?.instagram || '',
    telegram: instructor?.telegram || '',
    vk: instructor?.vk || '',
  });
  const [saving, setSaving] = useState(false);

  const styles = ['HATHA', 'VINYASA', 'YIN', 'NIDRA', 'KUNDALINI'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);

      const apiData = {
        name: formData.name,
        bio: formData.bio,
        experience: formData.experience,
        certifications: formData.certifications.split('\n').filter(c => c.trim()),
        specializations: formData.specializations,
        instagram: formData.instagram || undefined,
        telegram: formData.telegram || undefined,
        vk: formData.vk || undefined,
      };

      if (instructor) {
        await adminApi.updateInstructor(instructor.id, apiData);
      } else {
        await adminApi.createInstructor(apiData);
      }
      onSave();
    } catch (error) {
      console.error('Failed to save instructor:', error);
      alert('Ошибка при сохранении');
    } finally {
      setSaving(false);
    }
  };

  const toggleSpecialization = (style: string) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(style)
        ? prev.specializations.filter(s => s !== style)
        : [...prev.specializations, style],
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-text mb-6">
        {instructor ? 'Редактировать инструктора' : 'Новый инструктор'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-text mb-2">Имя</label>
          <input
            type="text"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">Биография</label>
          <textarea
            value={formData.bio}
            onChange={e => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">Опыт (лет)</label>
          <input
            type="number"
            value={formData.experience}
            onChange={e => setFormData({ ...formData, experience: parseInt(e.target.value) })}
            className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-3">Специализация</label>
          <div className="flex flex-wrap gap-2">
            {styles.map(style => (
              <button
                key={style}
                type="button"
                onClick={() => toggleSpecialization(style)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formData.specializations.includes(style)
                    ? 'bg-primary text-white'
                    : 'bg-surface-hover text-text hover:bg-border'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Сертификаты (каждый с новой строки)
          </label>
          <textarea
            value={formData.certifications}
            onChange={e => setFormData({ ...formData, certifications: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="RYT-500&#10;Yoga Alliance&#10;Хатха-йога (Ришикеш)"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-text mb-2">Instagram</label>
            <input
              type="text"
              value={formData.instagram}
              onChange={e => setFormData({ ...formData, instagram: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Telegram</label>
            <input
              type="text"
              value={formData.telegram}
              onChange={e => setFormData({ ...formData, telegram: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">VK</label>
            <input
              type="text"
              value={formData.vk}
              onChange={e => setFormData({ ...formData, vk: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="username"
            />
          </div>
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
