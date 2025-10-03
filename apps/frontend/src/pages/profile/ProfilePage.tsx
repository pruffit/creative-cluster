import { useUserStore } from '@entities/user/model/user.store';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@shared/api/auth.api';
import { Button, Card } from '@shared/ui';
import { LogOut, User as UserIcon, Mail, Shield } from 'lucide-react';

export const ProfilePage = () => {
  const { user, clearUser } = useUserStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await authApi.signOut();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      clearUser();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-text mb-8">Профиль</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card>
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary to-amber-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-xl font-semibold text-text mb-1">
                  {user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user.username}
                </h2>
                <p className="text-sm text-text-secondary mb-4">@{user.username}</p>
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="w-full">
                  <LogOut size={16} className="mr-2" />
                  Выйти
                </Button>
              </div>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-text mb-4">Личная информация</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <UserIcon size={20} className="text-text-secondary mr-3" />
                  <div>
                    <p className="text-sm text-text-secondary">Имя пользователя</p>
                    <p className="text-text font-medium">{user.username}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail size={20} className="text-text-secondary mr-3" />
                  <div>
                    <p className="text-sm text-text-secondary">Email</p>
                    <p className="text-text font-medium">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Shield size={20} className="text-text-secondary mr-3" />
                  <div>
                    <p className="text-sm text-text-secondary">Роль</p>
                    <p className="text-text font-medium">{user.role}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-text mb-4">Мои бронирования</h3>
              <p className="text-text-secondary">У вас пока нет активных бронирований</p>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-text mb-4">Мои заказы</h3>
              <p className="text-text-secondary">У вас пока нет заказов</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
