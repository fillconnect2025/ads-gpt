
import AdAccountSelector, { AdAccount } from '@/components/AdAccountSelector';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Facebook, Instagram, Plus, RefreshCcw, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

// Dados simulados
const mockAccounts: AdAccount[] = [
  { id: '1', name: 'Minha Empresa - Facebook', platform: 'facebook', status: 'active' },
  { id: '2', name: 'Minha Empresa - Google Ads', platform: 'google', status: 'active' },
  { id: '3', name: 'Loja Online - Instagram', platform: 'instagram', status: 'paused' },
  { id: '4', name: 'Campanha Institucional', platform: 'facebook', status: 'disabled' },
  { id: '5', name: 'Lançamento Produto XYZ', platform: 'google', status: 'active' },
];

const AdAccounts = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<AdAccount | undefined>(mockAccounts[0]);
  const [activeTab, setActiveTab] = useState('todas');
  
  const filteredAccounts = mockAccounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'todas' || 
                      (activeTab === 'facebook' && account.platform === 'facebook') ||
                      (activeTab === 'google' && account.platform === 'google') ||
                      (activeTab === 'instagram' && account.platform === 'instagram');
    
    return matchesSearch && matchesTab;
  });
  
  const handleConnect = () => {
    toast({
      title: "Conectar nova conta",
      description: "Funcionalidade em desenvolvimento."
    });
  };
  
  const handleRefresh = () => {
    toast({
      title: "Atualizando contas",
      description: "Suas contas de anúncios estão sendo sincronizadas."
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Contas de Anúncios</h1>
        <div className="flex gap-2">
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button onClick={handleConnect}>
            <Plus className="h-4 w-4 mr-2" />
            Conectar conta
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Gerenciar Contas de Anúncios</CardTitle>
            <CardDescription>
              Conecte e gerencie suas contas de diferentes plataformas de anúncios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar contas..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Tabs defaultValue="todas" value={activeTab} onValueChange={setActiveTab} className="w-auto">
                  <TabsList>
                    <TabsTrigger value="todas">Todas</TabsTrigger>
                    <TabsTrigger value="facebook" className="flex items-center gap-1">
                      <Facebook className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Facebook</span>
                    </TabsTrigger>
                    <TabsTrigger value="google" className="flex items-center gap-1">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                        <path d="M22.5 12.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v3h-3c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h4.5c.83 0 1.5-.67 1.5-1.5v-4.5z" fill="#4285F4"/>
                        <path d="M5.5 15.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H4c-.83 0-1.5-.67-1.5-1.5v-4.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v3z" fill="#34A853"/>
                        <path d="M5.5 8.5h3c.83 0 1.5-.67 1.5-1.5S9.33 5.5 8.5 5.5H4C3.17 5.5 2.5 6.17 2.5 7v4.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-3z" fill="#FBBC05"/>
                        <path d="M15.5 8.5h3v-3c0-.83-.67-1.5-1.5-1.5h-4.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h3z" fill="#EA4335"/>
                      </svg>
                      <span className="hidden sm:inline">Google</span>
                    </TabsTrigger>
                    <TabsTrigger value="instagram" className="flex items-center gap-1">
                      <Instagram className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Instagram</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="border rounded-md">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-3 text-sm font-medium">Conta</th>
                      <th className="text-left p-3 text-sm font-medium">Plataforma</th>
                      <th className="text-left p-3 text-sm font-medium">Status</th>
                      <th className="text-right p-3 text-sm font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAccounts.length > 0 ? (
                      filteredAccounts.map((account) => (
                        <tr key={account.id} className="border-b hover:bg-muted/30 transition-colors">
                          <td className="p-3">
                            <div className="font-medium">{account.name}</div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1.5">
                              {account.platform === 'facebook' && <Facebook className="h-4 w-4 text-blue-600" />}
                              {account.platform === 'google' && (
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                                  <path d="M22.5 12.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v3h-3c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h4.5c.83 0 1.5-.67 1.5-1.5v-4.5z" fill="#4285F4"/>
                                  <path d="M5.5 15.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H4c-.83 0-1.5-.67-1.5-1.5v-4.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v3z" fill="#34A853"/>
                                  <path d="M5.5 8.5h3c.83 0 1.5-.67 1.5-1.5S9.33 5.5 8.5 5.5H4C3.17 5.5 2.5 6.17 2.5 7v4.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-3z" fill="#FBBC05"/>
                                  <path d="M15.5 8.5h3v-3c0-.83-.67-1.5-1.5-1.5h-4.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h3z" fill="#EA4335"/>
                                </svg>
                              )}
                              {account.platform === 'instagram' && <Instagram className="h-4 w-4 text-pink-600" />}
                              <span className="capitalize">{account.platform}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                              ${account.status === 'active' ? 'bg-green-100 text-green-800' : 
                                account.status === 'paused' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-gray-100 text-gray-800'}`}
                            >
                              <span className="flex h-1.5 w-1.5 mr-1 rounded-full
                                ${account.status === 'active' ? 'bg-green-400' : 
                                  account.status === 'paused' ? 'bg-yellow-400' : 
                                  'bg-gray-400'}"
                              ></span>
                              {account.status === 'active' ? 'Ativo' : 
                               account.status === 'paused' ? 'Pausado' : 'Desativado'}
                            </div>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedAccount(account)}
                              >
                                Selecionar
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-muted-foreground">
                          Nenhuma conta encontrada com os filtros atuais
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Conta atual</CardTitle>
            <CardDescription>
              Selecione a conta que você deseja gerenciar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AdAccountSelector 
              accounts={mockAccounts}
              selectedAccount={selectedAccount}
              onSelect={setSelectedAccount}
            />
            
            {selectedAccount && (
              <div className="space-y-4 mt-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">Detalhes da conta</h3>
                  <div className="border rounded-md p-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">ID da conta:</span>
                      <span className="text-sm font-medium">{selectedAccount.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Plataforma:</span>
                      <span className="text-sm font-medium capitalize">{selectedAccount.platform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <span className="text-sm font-medium capitalize">
                        {selectedAccount.status === 'active' ? 'Ativo' : 
                         selectedAccount.status === 'paused' ? 'Pausado' : 'Desativado'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-muted-foreground">Ações rápidas</h3>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="justify-start">
                      <RefreshCcw className="h-4 w-4 mr-2" />
                      Sincronizar dados
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none">
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13 2v7h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Ver relatório
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdAccounts;
