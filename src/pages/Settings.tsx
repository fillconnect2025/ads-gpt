
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import FontSizeAdjuster from '@/components/FontSizeAdjuster';

const Settings = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Configurações salvas",
      description: "Suas configurações foram atualizadas com sucesso.",
    });
  };
  
  return (
    <div className="container mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Configurações</h1>
        <Button onClick={handleSave}>Salvar alterações</Button>
      </div>
      
      <Tabs defaultValue="geral" className="space-y-4">
        <TabsList>
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="integracao">Integrações</TabsTrigger>
          <TabsTrigger value="acessibilidade">Acessibilidade</TabsTrigger>
        </TabsList>
        
        <TabsContent value="geral" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações gerais</CardTitle>
              <CardDescription>
                Gerencie as configurações básicas do sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="idioma">Idioma</Label>
                <select
                  id="idioma"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="theme-mode">Tema escuro</Label>
                  <p className="text-sm text-muted-foreground">
                    Ative o modo escuro para utilizar durante a noite.
                  </p>
                </div>
                <Switch id="theme-mode" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="timezone">Fuso horário automático</Label>
                  <p className="text-sm text-muted-foreground">
                    Usar o fuso horário do navegador para exibição de dados.
                  </p>
                </div>
                <Switch id="timezone" defaultChecked />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Dados e privacidade</CardTitle>
              <CardDescription>
                Gerencie como seus dados são armazenados e utilizados.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="analytics">Coleta de dados de uso</Label>
                  <p className="text-sm text-muted-foreground">
                    Permitir a coleta de dados anônimos para melhorar o sistema.
                  </p>
                </div>
                <Switch id="analytics" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="cookies">Cookies de terceiros</Label>
                  <p className="text-sm text-muted-foreground">
                    Permitir cookies de serviços de terceiros.
                  </p>
                </div>
                <Switch id="cookies" />
              </div>
              
              <Button variant="outline" className="w-full justify-start" size="sm">
                Baixar meus dados
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notificacoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de notificações</CardTitle>
              <CardDescription>
                Configure como e quando você deseja receber notificações.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifs">Notificações por e-mail</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber atualizações importantes por e-mail.
                  </p>
                </div>
                <Switch id="email-notifs" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifs">Notificações push</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber notificações no navegador.
                  </p>
                </div>
                <Switch id="push-notifs" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="campaign-alerts">Alertas de campanhas</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber alertas sobre mudanças em campanhas.
                  </p>
                </div>
                <Switch id="campaign-alerts" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="token-alerts">Alertas de tokens</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber alertas quando seus tokens estiverem acabando.
                  </p>
                </div>
                <Switch id="token-alerts" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="news-updates">Novidades e atualizações</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber informações sobre novos recursos e atualizações.
                  </p>
                </div>
                <Switch id="news-updates" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integracao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integrações ativas</CardTitle>
              <CardDescription>
                Gerencie suas conexões com plataformas externas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-3">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" className="w-8 h-8" alt="Facebook" />
                  <div>
                    <p className="font-medium">Facebook Ads</p>
                    <p className="text-xs text-muted-foreground">Conectado como Ads Manager</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Desconectar</Button>
              </div>
              
              <div className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-3">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" className="w-8 h-8" alt="Google" />
                  <div>
                    <p className="font-medium">Google Ads</p>
                    <p className="text-xs text-muted-foreground">Não conectado</p>
                  </div>
                </div>
                <Button size="sm">Conectar</Button>
              </div>
              
              <div className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-3">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" className="w-8 h-8" alt="LinkedIn" />
                  <div>
                    <p className="font-medium">LinkedIn Ads</p>
                    <p className="text-xs text-muted-foreground">Não conectado</p>
                  </div>
                </div>
                <Button size="sm">Conectar</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Chaves de API</CardTitle>
              <CardDescription>
                Gerencie suas chaves de API para integrações personalizadas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">Chave de API</Label>
                <div className="flex gap-2">
                  <Input id="api-key" value="••••••••••••••••••••••••••••••" readOnly />
                  <Button variant="outline">Copiar</Button>
                  <Button variant="outline">Redefinir</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Esta chave é usada para acessar a API do Ads-GPT a partir de aplicações externas.
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="webhook-enabled">Webhooks</Label>
                  <p className="text-sm text-muted-foreground">
                    Habilitar webhooks para receber atualizações em tempo real.
                  </p>
                </div>
                <Switch id="webhook-enabled" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="acessibilidade" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de acessibilidade</CardTitle>
              <CardDescription>
                Personalize a interface para melhorar sua experiência.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Tamanho da fonte</Label>
                <FontSizeAdjuster />
                <p className="text-xs text-muted-foreground mt-1">
                  Ajuste o tamanho do texto para melhorar a leitura.
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="motion-reduced">Reduzir animações</Label>
                  <p className="text-sm text-muted-foreground">
                    Diminuir ou remover animações para reduzir distrações.
                  </p>
                </div>
                <Switch id="motion-reduced" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="high-contrast">Alto contraste</Label>
                  <p className="text-sm text-muted-foreground">
                    Aumentar o contraste entre texto e fundo.
                  </p>
                </div>
                <Switch id="high-contrast" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="screen-reader">Compatibilidade com leitores de tela</Label>
                  <p className="text-sm text-muted-foreground">
                    Otimizar para leitores de tela e tecnologias assistivas.
                  </p>
                </div>
                <Switch id="screen-reader" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="keyboard-nav">Navegação por teclado aprimorada</Label>
                  <p className="text-sm text-muted-foreground">
                    Facilitar a navegação utilizando apenas o teclado.
                  </p>
                </div>
                <Switch id="keyboard-nav" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
