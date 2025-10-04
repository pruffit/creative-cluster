import { useCallback, useEffect, useState } from 'react';
import { adminApi, User } from '@shared/api/admin.api';
import { Button, Spinner } from '@shared/ui';
import { Shield, ChevronLeft, ChevronRight } from 'lucide-react';

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updatingRole, setUpdatingRole] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminApi.getUsers(page, 20);
      setUsers(data.users);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      setUpdatingRole(userId);
      await adminApi.updateUserRole(userId, newRole);
      await loadUsers();
    } catch (error) {
      console.error('Failed to update role:', error);
      alert('Ошибка при изменении роли');
    } finally {
      setUpdatingRole(null);
    }
  };

  const roles = ['GUEST', 'CUSTOMER', 'CREATOR', 'ADMIN'];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text">Пользователи</h2>
        <p className="text-sm text-text-secondary">Всего: {users.length}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-text">Email</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-text">Username</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-text">Имя</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-text">Роль</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-text">
                Дата регистрации
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b border-border hover:bg-surface-hover">
                <td className="py-3 px-4 text-sm text-text">{user.email}</td>
                <td className="py-3 px-4 text-sm text-text">@{user.username}</td>
                <td className="py-3 px-4 text-sm text-text">
                  {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : '—'}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-text-secondary" />
                    <select
                      value={user.role}
                      onChange={e => handleRoleChange(user.id, e.target.value)}
                      disabled={updatingRole === user.id}
                      className="px-2 py-1 rounded border border-border bg-surface text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                    >
                      {roles.map(role => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-text-secondary">
                  {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft size={16} className="mr-1" />
            Назад
          </Button>
          <span className="text-sm text-text-secondary">
            Страница {page} из {totalPages}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Вперед
            <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};
