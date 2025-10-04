import { useEffect, useState } from 'react';
import { adminApi, YogaClass, YogaInstructor } from '@shared/api/admin.api';
import { Button, Spinner } from '@shared/ui';
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

export const ClassManagement = () => {
  const [classes, setClasses] = useState<YogaClass[]>([]);
  const [instructors, setInstructors] = useState<YogaInstructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState<YogaClass | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [classesData, instructorsData] = await Promise.all([
        adminApi.getClasses(),
        adminApi.getInstructors(),
      ]);
      setClasses(classesData);
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
    if (!confirm('Удалить это занятие?')) return;
    try {
      await adminApi.deleteClass(id);
      await loadData();
    } catch (error) {
      console.error('Failed to delete class:', error);
      alert('Ошибка при удалении');
    }
  };

  const handleToggleActive = async (yogaClass: YogaClass) => {
    try {
      await adminApi.updateClass(yogaClass.id, { isActive: !yogaClass.isActive });
      await loadData();
    } catch (error) {
      console.error('Failed to toggle active:', error);
      alert('Ошибка при изменении статуса');
    }
  };

  const dayNames: Record<string, string> = {
    MONDAY: 'Пн',
    TUESDAY: 'Вт',
    WEDNESDAY: 'Ср',
    THURSDAY: 'Чт',
    FRIDAY: 'Пт',
    SATURDAY: 'Сб',
    SUNDAY: 'Вс',
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
      <ClassForm
        yogaClass={editingClass}
        instructors={instructors}
        onSave={() => {
          setShowForm(false);
          setEditingClass(null);
          loadData();
        }}
        onCancel={() => {
          setShowForm(false);
          setEditingClass(null);
        }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text">Занятия</h2>
        <Button variant="primary" onClick={() => setShowForm(true)}>
          <Plus size={16} className="mr-2" />
          Добавить занятие
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map(yogaClass => (
          <div
            key={yogaClass.id}
            className={`bg-surface-hover rounded-lg p-4 border-2 ${
              yogaClass.isActive ? 'border-border' : 'border-red-300 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-text mb-1">{yogaClass.title}</h3>
                <p className="text-xs text-text-secondary">{yogaClass.instructor.name}</p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleToggleActive(yogaClass)}
                  className="p-1 hover:bg-surface rounded text-text-secondary hover:text-text"
                  title={yogaClass.isActive ? 'Деактивировать' : 'Активировать'}
                >
                  {yogaClass.isActive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                </button>
                <button
                  onClick={() => {
                    setEditingClass(yogaClass);
                    setShowForm(true);
                  }}
                  className="p-1 hover:bg-surface rounded text-text-secondary hover:text-text"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(yogaClass.id)}
                  className="p-1 hover:bg-surface rounded text-red-600 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">День:</span>
                <span className="text-text font-medium">{dayNames[yogaClass.dayOfWeek]}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Время:</span>
                <span className="text-text">{yogaClass.startTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Длительность:</span>
                <span className="text-text">{yogaClass.duration} мин</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Цена:</span>
                <span className="text-text font-medium">{yogaClass.price} ₽</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Участников:</span>
                <span className="text-text">
                  {yogaClass.currentParticipants} / {yogaClass.maxParticipants}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface ClassFormProps {
  yogaClass: YogaClass | null;
  instructors: YogaInstructor[];
  onSave: () => void;
  onCancel: () => void;
}

const ClassForm = ({ yogaClass, instructors, onSave, onCancel }: ClassFormProps) => {
  const [formData, setFormData] = useState({
    title: yogaClass?.title || '',
    description: yogaClass?.description || '',
    style: yogaClass?.style || 'HATHA',
    instructorId: yogaClass?.instructorId || '',
    dayOfWeek: yogaClass?.dayOfWeek || 'MONDAY',
    startTime: yogaClass?.startTime || '10:00',
    duration: yogaClass?.duration || 90,
    level: yogaClass?.level || 'ALL',
    maxParticipants: yogaClass?.maxParticipants || 15,
    price: yogaClass?.price || 600,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (yogaClass) {
        await adminApi.updateClass(yogaClass.id, formData);
      } else {
        await adminApi.createClass(formData);
      }
      onSave();
    } catch (error) {
      console.error('Failed to save class:', error);
      alert('Ошибка при сохранении');
    } finally {
      setSaving(false);
    }
  };

  const styles = ['HATHA', 'VINYASA', 'YIN', 'NIDRA', 'KUNDALINI'];
  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  const dayLabels: Record<string, string> = {
    MONDAY: 'Понедельник',
    TUESDAY: 'Вторник',
    WEDNESDAY: 'Среда',
    THURSDAY: 'Четверг',
    FRIDAY: 'Пятница',
    SATURDAY: 'Суббота',
    SUNDAY: 'Воскресенье',
  };
  const levels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'ALL'];
  const levelLabels: Record<string, string> = {
    BEGINNER: 'Начинающие',
    INTERMEDIATE: 'Средний',
    ADVANCED: 'Продвинутый',
    ALL: 'Все уровни',
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-text mb-6">
        {yogaClass ? 'Редактировать занятие' : 'Новое занятие'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-text mb-2">Название</label>
          <input
            type="text"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-2">Описание</label>
          <textarea
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text mb-2">Стиль</label>
            <select
              value={formData.style}
              onChange={e => setFormData({ ...formData, style: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {styles.map(style => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Инструктор</label>
            <select
              value={formData.instructorId}
              onChange={e => setFormData({ ...formData, instructorId: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Выберите инструктора</option>
              {instructors.map(instructor => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">День недели</label>
            <select
              value={formData.dayOfWeek}
              onChange={e => setFormData({ ...formData, dayOfWeek: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {days.map(day => (
                <option key={day} value={day}>
                  {dayLabels[day]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Время начала</label>
            <input
              type="time"
              value={formData.startTime}
              onChange={e => setFormData({ ...formData, startTime: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Длительность (мин)</label>
            <input
              type="number"
              value={formData.duration}
              onChange={e => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Уровень</label>
            <select
              value={formData.level}
              onChange={e => setFormData({ ...formData, level: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {levelLabels[level]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Макс. участников</label>
            <input
              type="number"
              value={formData.maxParticipants}
              onChange={e =>
                setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })
              }
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
