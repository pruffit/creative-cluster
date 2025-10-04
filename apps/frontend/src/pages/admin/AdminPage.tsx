import { useState } from 'react';
import { Users, Calendar, CreditCard, FileText, User as UserIcon } from 'lucide-react';
import { Card } from '@shared/ui';
import { UserManagement } from '@widgets/admin/UserManagement';
import { InstructorManagement } from '@widgets/admin/InstructorManagement';
import { ClassManagement } from '@widgets/admin/ClassManagement';
import { SubscriptionManagement } from '@widgets/admin/SubscriptionManagement';
import { BlogManagement } from '@widgets/admin/BlogManagement';

type Tab = 'users' | 'instructors' | 'classes' | 'subscriptions' | 'blog';

export const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('users');

  const tabs = [
    { id: 'users' as Tab, label: 'Пользователи', icon: Users },
    { id: 'instructors' as Tab, label: 'Инструкторы', icon: UserIcon },
    { id: 'classes' as Tab, label: 'Занятия', icon: Calendar },
    { id: 'subscriptions' as Tab, label: 'Абонементы', icon: CreditCard },
    { id: 'blog' as Tab, label: 'Блог', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text mb-2">Панель администратора</h1>
          <p className="text-text-secondary">Управление платформой Creative Cluster</p>
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'bg-surface hover:bg-surface-hover text-text'
                  }`}
                >
                  <Icon size={18} className="mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <Card className="p-6">
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'instructors' && <InstructorManagement />}
          {activeTab === 'classes' && <ClassManagement />}
          {activeTab === 'subscriptions' && <SubscriptionManagement />}
          {activeTab === 'blog' && <BlogManagement />}
        </Card>
      </div>
    </div>
  );
};
