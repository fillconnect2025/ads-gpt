import { IntegrationsDialog } from '@/components/dialog/DialogIntegrations';
import { DialogSelectAdAccounts } from '@/components/dialog/DialogSelectAdAccounts';
import FacebookIcon from '@/components/icons/facebook.icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useIntegration } from '@/hooks/useIntegration';
import { formatDateBr } from '@/utils/format';
import { isDateInThePast } from '@/utils/help';
import {
  Copy,
  Facebook,
  Loader2,
  Plus,
  RefreshCw,
  Settings,
  Usb,
  XCircle,
  Zap,
} from 'lucide-react';

const Integration = () => {
  const {
    // FUNCTION
    getStatusBadge,
    handleIntegrations,
    handleConnectFacebookAds,
    fetchGetAdAccounts,

    // STATES
    isSyncing,
    isConnectingFacebookAds,
    syncProgress,
    autoSync,
    setAutoSync,
    isLoadingIntegration,
    integrations,
    adAccounts,
    openIntegrationsDialog,
    setOpenIntegrationsDialog,
    isLoadingSelectAdAccounts,
    openDialogSelectAdAccounts,
    setOpenDialogSelectAdAccounts,
  } = useIntegration();

  if (isLoadingIntegration) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-sm text-muted-foreground">
            Carregando integrações...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <IntegrationsDialog
        open={openIntegrationsDialog}
        setOpen={setOpenIntegrationsDialog}
        integrations={integrations}
        handleIntegrations={handleIntegrations}
      />

      <DialogSelectAdAccounts
        open={openDialogSelectAdAccounts}
        setOpen={setOpenDialogSelectAdAccounts}
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Facebook Integration
          </h1>
          <p className="text-muted-foreground mt-1">
            Connect and manage your Facebook Ads accounts
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <Button
            onClick={() => setOpenIntegrationsDialog(true)}
            variant="default"
          >
            <Plus className="h-3.5 w-3.5" />
            Nova Integração
          </Button>

          {/* <Button
            onClick={handleConnectFacebookAds}
            disabled={isConnectingFacebookAds}
            variant="default"
          >
            {isConnectingFacebookAds ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <FacebookIcon />
            )}
            <span>
              {isConnectingFacebookAds ? '+ Conectando...' : 'Conectar'}
            </span>
          </Button> */}
        </div>
      </div>

      {isSyncing && (
        <Card className="section-transition">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Syncing Facebook accounts...</span>
                <span>{syncProgress}%</span>
              </div>
              <Progress value={syncProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contas de Anúncios Conectadas</CardTitle>
              <CardDescription>
                Gerencie suas contas de anúncios vinculadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrations && integrations.length !== 0 ? (
                  integrations.map((integration, index) => (
                    <Card
                      key={`${integration.id}-${index}`}
                      className="overflow-hidden border"
                    >
                      <CardContent className="flex flex-col gap-4 p-6">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                              <FacebookIcon color="#172554" />
                            </div>
                            <div>
                              <h3 className="font-medium">
                                {integration.name}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                ID da Conta: {integration.account_id}
                              </p>
                              <div className="flex items-center mt-2 space-x-2">
                                {getStatusBadge(integration.status)}
                                {integration.status && (
                                  <span className="text-xs text-muted-foreground">
                                    Última sincronização:{' '}
                                    {formatDateBr(integration.lastSync)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4 md:w-auto w-full">
                            <div className="p-3 bg-blue-50 rounded-lg text-center">
                              <p className="text-xs text-blue-700">
                                Contas de anúncios
                              </p>
                              <p className="text-lg font-bold text-blue-900">
                                {integration.qtd.adAccountQtd ?? 0}
                              </p>
                            </div>

                            <div className="p-3 bg-purple-50 rounded-lg text-center">
                              <p className="text-xs text-purple-700">
                                Campanhas
                              </p>
                              <p className="text-lg font-bold text-purple-900">
                                {integration.qtd.campaignQtd ?? 0}
                              </p>
                            </div>

                            <div className="p-3 bg-green-50 rounded-lg text-center">
                              <p className="text-xs text-green-700">Anúncios</p>
                              <p className="text-lg font-bold text-green-900">
                                {integration.qtd.adQtd ?? 0}
                              </p>
                            </div>
                          </div>
                        </div>

                        <hr className="h-1 w-full" />

                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            className="gap-1.5"
                            onClick={() => {
                              setOpenDialogSelectAdAccounts(true);
                              fetchGetAdAccounts(integration.id);
                            }}
                            disabled={isLoadingSelectAdAccounts}
                            variant="ghost"
                          >
                            <Usb className="h-3.5 w-3.5" />
                            Selecionar Portfolios
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1.5 "
                          >
                            <RefreshCw className="h-3.5 w-3.5" />
                            Sincronizar
                          </Button>
                          {integration.status !== 'connected' ||
                          isDateInThePast(integration.token_expires_at) ? (
                            <Button
                              size="sm"
                              className="gap-1.5"
                              onClick={handleConnectFacebookAds}
                            >
                              {isConnectingFacebookAds ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                <Facebook className="h-3.5 w-3.5" />
                              )}
                              Reconectar
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1.5 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                            >
                              <XCircle className="h-3.5 w-3.5" />
                              Desconectar
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted-foreground">
                    Nenhuma integração encontrada.
                  </p>
                )}
              </div>
            </CardContent>
            {/* <CardFooter className="flex justify-between border-t pt-6">
              <p className="text-sm text-muted-foreground">
                Exibindo 3 de 3 contas
              </p>
            </CardFooter> */}
          </Card>
        </div>

        <div className="section-transition">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Integration Status</CardTitle>
              <CardDescription>
                Overview of your Facebook connection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm">Connection Status</p>
                  <Badge className="bg-green-500">Connected</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <p className="text-sm">Total Accounts</p>
                  <span className="font-medium">3</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <p className="text-sm">Active Accounts</p>
                  <span className="font-medium">2</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <p className="text-sm">Last Sync</p>
                  <span className="font-medium">Today at 14:30</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <p className="text-sm">Total Campaigns</p>
                  <span className="font-medium">23</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <p className="text-sm">Token Expiry</p>
                  <span className="font-medium">30 days remaining</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>
                Configure sync and AI analysis options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-sync">Automatic Sync</Label>
                  <Switch
                    id="auto-sync"
                    checked={autoSync}
                    onCheckedChange={setAutoSync}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Automatically sync data every 6 hours
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sync-frequency">Sync Frequency</Label>
                <Select defaultValue="6hours">
                  <SelectTrigger id="sync-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1hour">Every hour</SelectItem>
                    <SelectItem value="3hours">Every 3 hours</SelectItem>
                    <SelectItem value="6hours">Every 6 hours</SelectItem>
                    <SelectItem value="12hours">Every 12 hours</SelectItem>
                    <SelectItem value="24hours">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-key">Facebook App ID</Label>
                <div className="flex gap-2">
                  <Input
                    id="api-key"
                    type="text"
                    value="385729102984017"
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button variant="ghost" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ai-analysis-level">AI Analysis Level</Label>
                <Select defaultValue="advanced">
                  <SelectTrigger id="ai-analysis-level">
                    <SelectValue placeholder="Select analysis level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Higher levels provide more detailed insights but may take
                  longer
                </p>
              </div>

              <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                <div className="flex items-start">
                  <Zap className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800">Pro Tip</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      For best results, keep automatic sync enabled and use the
                      advanced AI analysis level for more actionable insights.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between border-t pt-6">
              <Button variant="outline">Reset to Defaults</Button>
              <Button className="gap-1.5">
                <Settings className="h-4 w-4" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Integration;
