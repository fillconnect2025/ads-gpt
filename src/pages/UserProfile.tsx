import TabNotifications from '@/components/profile/TabNotifications';
import TabProfile from '@/components/profile/TabPersonal';
import TabSecurity from '@/components/profile/TabSecurity';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Bell, Camera, Lock, LogOut, Users } from 'lucide-react';

const UserProfile = () => {
  const { toast } = useToast();
  const { user, loading, handleLogout } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">
            Carregando informações do perfil...
          </p>
        </div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Perfil do Usuário</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Card de perfil */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="relative mx-auto mb-4">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarImage src="" alt={user.user_metadata.name} />
                <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                  {getInitials(user.user_metadata.name)}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0"
              >
                <Camera className="h-4 w-4" />
                <span className="sr-only">Alterar foto</span>
              </Button>
            </div>
            <CardTitle>{user.user_metadata.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plano:</span>
                <span className="font-medium">A definir Tabela</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Desde:</span>
                <span>
                  {new Date(user.created_at).toLocaleDateString('pt-BR')}
                </span>
              </div>

              <Separator />

              <Button
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                   da conta
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs de configurações */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="personal">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="personal">
                <Users className="mr-2 h-4 w-4" />
                Dados Pessoais
              </TabsTrigger>
              <TabsTrigger value="security">
                <Lock className="mr-2 h-4 w-4" />
                Segurança
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="mr-2 h-4 w-4" />
                Notificações
              </TabsTrigger>
            </TabsList>

            {/* Dados Pessoais */}
            <TabProfile />

            {/* Segurança */}
            <TabSecurity />

            {/* Notificações */}
            <TabNotifications />
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
