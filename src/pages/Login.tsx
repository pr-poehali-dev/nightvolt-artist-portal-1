import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface LoginProps {
  onLogin: (user: { uid: string; email: string; role: string; label: string }) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [artistEmail, setArtistEmail] = useState('');
  const [artistPassword, setArtistPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleArtistLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/c2d4f2cf-04ca-415f-b05b-10f2e816ee3f', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: artistEmail,
          password: artistPassword,
          role: 'artist'
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: '✅ Успешный вход',
          description: `Добро пожаловать, ${data.user.email}!`
        });
        onLogin(data.user);
      } else {
        toast({
          title: '❌ Ошибка входа',
          description: data.error || 'Неверный email или пароль',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: '❌ Ошибка подключения',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/c2d4f2cf-04ca-415f-b05b-10f2e816ee3f', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: adminEmail,
          password: adminPassword,
          role: 'admin'
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: '✅ Успешный вход',
          description: 'Добро пожаловать, администратор!'
        });
        onLogin(data.user);
      } else {
        toast({
          title: '❌ Ошибка входа',
          description: data.error || 'Неверные данные администратора',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: '❌ Ошибка подключения',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-purple-pink opacity-20 blur-3xl"></div>
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
      
      <Card className="w-full max-w-md relative z-10 border-2 border-primary/30 shadow-2xl backdrop-blur-sm bg-card/80">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 rounded-2xl gradient-purple-pink">
              <Icon name="Music" size={48} className="text-white" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold gradient-text">NIGHTVOLT</CardTitle>
          <CardDescription className="text-lg">Личный кабинет артистов</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="artist" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="artist" className="text-base">
                <Icon name="User" size={18} className="mr-2" />
                Артист
              </TabsTrigger>
              <TabsTrigger value="admin" className="text-base">
                <Icon name="Shield" size={18} className="mr-2" />
                Админ
              </TabsTrigger>
            </TabsList>

            <TabsContent value="artist">
              <form onSubmit={handleArtistLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="artist-email">Email</Label>
                  <Input
                    id="artist-email"
                    type="email"
                    placeholder="artist@example.com"
                    value={artistEmail}
                    onChange={(e) => setArtistEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="artist-password">Пароль</Label>
                  <Input
                    id="artist-password"
                    type="password"
                    placeholder="nightvolt-XXXXX"
                    value={artistPassword}
                    onChange={(e) => setArtistPassword(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-semibold gradient-purple-pink hover:opacity-90 transition-opacity"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                      Вход...
                    </>
                  ) : (
                    <>
                      <Icon name="LogIn" size={20} className="mr-2" />
                      Войти
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="admin">
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email администратора</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@nightvolt.app"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Пароль администратора</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="NIGHTVOLT-ROOT-2025"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-semibold bg-destructive hover:bg-destructive/90 transition-colors"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                      Вход...
                    </>
                  ) : (
                    <>
                      <Icon name="ShieldCheck" size={20} className="mr-2" />
                      Войти как админ
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}