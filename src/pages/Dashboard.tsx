import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface User {
  uid: string;
  email: string;
  role: string;
  label: string;
}

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

type MenuSection = 'upload' | 'releases' | 'moderation' | 'fix' | 'support' | 'profile';

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeSection, setActiveSection] = useState<MenuSection>('releases');

  const menuItems = [
    { id: 'upload' as MenuSection, label: 'Загрузка релиза', icon: 'Upload' },
    { id: 'releases' as MenuSection, label: 'Мои релизы', icon: 'Disc3' },
    { id: 'moderation' as MenuSection, label: 'На модерации', icon: 'Clock' },
    { id: 'fix' as MenuSection, label: 'Исправить', icon: 'AlertCircle' },
    { id: 'support' as MenuSection, label: 'Поддержка', icon: 'MessageCircle' },
    { id: 'profile' as MenuSection, label: 'Профиль', icon: 'User' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'upload':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold gradient-text">Загрузка релиза</h2>
            </div>
            <Card className="border-primary/30">
              <CardContent className="p-8 text-center">
                <Icon name="Upload" size={64} className="mx-auto mb-4 text-primary" />
                <p className="text-lg text-muted-foreground">Форма загрузки релиза будет здесь</p>
              </CardContent>
            </Card>
          </div>
        );

      case 'releases':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold gradient-text">Мои релизы</h2>
              <Button className="gradient-purple-pink hover:opacity-90">
                <Icon name="Plus" size={18} className="mr-2" />
                Новый релиз
              </Button>
            </div>
            <div className="grid gap-4">
              <Card className="border-primary/30 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                      <Icon name="Music" size={40} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">Название релиза</CardTitle>
                      <CardDescription className="text-base mt-1">Single • 2025</CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                          Опубликован
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        );

      case 'moderation':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold gradient-text">На модерации</h2>
            <Card className="border-primary/30">
              <CardContent className="p-8 text-center">
                <Icon name="Clock" size={64} className="mx-auto mb-4 text-primary" />
                <p className="text-lg text-muted-foreground">Нет релизов на модерации</p>
              </CardContent>
            </Card>
          </div>
        );

      case 'fix':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold gradient-text">Требуют исправления</h2>
            <Card className="border-primary/30">
              <CardContent className="p-8 text-center">
                <Icon name="CheckCircle" size={64} className="mx-auto mb-4 text-primary" />
                <p className="text-lg text-muted-foreground">Все релизы в порядке</p>
              </CardContent>
            </Card>
          </div>
        );

      case 'support':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold gradient-text">Поддержка</h2>
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle>Связаться с нами</CardTitle>
                <CardDescription>Мы ответим в течение 24 часов</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start h-12">
                    <Icon name="Mail" size={20} className="mr-3" />
                    support@nightvolt.app
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12">
                    <Icon name="MessageCircle" size={20} className="mr-3" />
                    Telegram поддержка
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold gradient-text">Профиль</h2>
            <Card className="border-primary/30">
              <CardHeader>
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24 border-4 border-primary">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-2xl gradient-purple-pink">
                      {user.email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{user.email}</CardTitle>
                    <CardDescription className="text-base mt-1">
                      Лейбл: {user.label}
                    </CardDescription>
                    <CardDescription className="text-sm mt-1">
                      UID: {user.uid}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start h-12">
                    <Icon name="Camera" size={20} className="mr-3" />
                    Изменить фото профиля
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12">
                    <Icon name="Edit" size={20} className="mr-3" />
                    Редактировать биографию
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12">
                    <Icon name="Link" size={20} className="mr-3" />
                    Добавить соцсети
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-72 bg-sidebar border-r border-sidebar-border p-6 space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl gradient-purple-pink">
            <Icon name="Music" size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">NIGHTVOLT</h1>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeSection === item.id
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-lg'
                  : 'hover:bg-sidebar-accent/50'
              }`}
            >
              <Icon name={item.icon} size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button
            variant="outline"
            onClick={onLogout}
            className="w-full justify-start h-12 border-destructive/50 hover:bg-destructive hover:text-destructive-foreground"
          >
            <Icon name="LogOut" size={20} className="mr-3" />
            Выйти
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
