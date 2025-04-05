import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Facebook, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  ExternalLink, 
  RefreshCw, 
  Lock, 
  FileText,
  Key,
  Zap,
  Settings,
  Shield,
  Copy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Mock connected accounts data
const connectedAccounts = [
  {
    id: 1,
    name: 'Main Business',
    accountId: '385729102',
    status: 'connected',
    lastSync: '2023-06-20 14:30',
    campaigns: 12,
    adSets: 35,
    ads: 126
  },
  {
    id: 2,
    name: 'Marketing Account',
    accountId: '485921673',
    status: 'connected',
    lastSync: '2023-06-18 09:15',
    campaigns: 8,
    adSets: 21,
    ads: 94
  },
  {
    id: 3,
    name: 'Test Account',
    accountId: '267394501',
    status: 'disconnected',
    lastSync: '2023-06-10 11:45',
    campaigns: 3,
    adSets: 7,
    ads: 15
  }
];

// Mock permissions data
const permissionStatus = [
  { name: 'View Campaigns', status: 'granted' },
  { name: 'View Ad Insights', status: 'granted' },
  { name: 'View Page Posts', status: 'granted' },
  { name: 'Manage Campaigns', status: 'granted' },
  { name: 'Manage Ads', status: 'granted' },
  { name: 'View Ad Sets', status: 'granted' },
  { name: 'Manage Pages', status: 'denied' },
  { name: 'Manage Page Posts', status: 'pending' }
];

// Mock log data
const integrationLogs = [
  { timestamp: '2023-06-20 14:30:12', event: 'Sync completed', status: 'success', message: 'Successfully synced 126 ads from Main Business account' },
  { timestamp: '2023-06-20 14:29:45', event: 'Sync started', status: 'info', message: 'Starting sync for Main Business account' },
  { timestamp: '2023-06-18 09:15:33', event: 'Sync completed', status: 'success', message: 'Successfully synced 94 ads from Marketing Account' },
  { timestamp: '2023-06-18 09:14:22', event: 'Sync started', status: 'info', message: 'Starting sync for Marketing Account' },
  { timestamp: '2023-06-10 11:45:51', event: 'Authentication error', status: 'error', message: 'Failed to connect to Test Account due to expired token' },
  { timestamp: '2023-06-10 11:44:18', event: 'Sync started', status: 'info', message: 'Starting sync for Test Account' }
];

const Integration = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [autoSync, setAutoSync] = useState(true);
  
  const connectFacebook = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      toast.success('Successfully connected to Facebook', {
        description: 'Your account has been connected and data is syncing.',
        action: {
          label: 'View',
          onClick: () => console.log('View'),
        },
      });
    }, 2000);
  };
  
  const syncAccounts = () => {
    setIsSyncing(true);
    setSyncProgress(0);
    
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSyncing(false);
            toast.success('Sync completed', {
              description: 'All accounts have been successfully synchronized.',
            });
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 400);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-500">Connected</Badge>;
      case 'disconnected':
        return <Badge variant="outline" className="text-red-500 border-red-500">Disconnected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getPermissionStatusBadge = (status: string) => {
    switch (status) {
      case 'granted':
        return (
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-1.5" />
            <span className="text-green-600">Granted</span>
          </div>
        );
      case 'denied':
        return (
          <div className="flex items-center">
            <XCircle className="h-4 w-4 text-red-500 mr-1.5" />
            <span className="text-red-600">Denied</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center">
            <AlertTriangle className="h-4 w-4 text-amber-500 mr-1.5" />
            <span className="text-amber-600">Pending</span>
          </div>
        );
      default:
        return <span>{status}</span>;
    }
  };
  
  const getLogStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'info':
        return <FileText className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Facebook Integration</h1>
          <p className="text-muted-foreground mt-1">Connect and manage your Facebook Ads accounts</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <Button 
            onClick={syncAccounts} 
            variant="outline" 
            disabled={isSyncing}
            className="gap-1.5"
          >
            {isSyncing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
          </Button>
          
          <Button 
            onClick={connectFacebook}
            disabled={isConnecting}
            className="bg-facebook hover:bg-facebook/90 text-white gap-1.5"
          >
            <Facebook className="h-4 w-4" />
            <span>{isConnecting ? 'Connecting...' : 'Connect Account'}</span>
          </Button>
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
          <Tabs defaultValue="accounts" className="section-transition">
            <TabsList>
              <TabsTrigger value="accounts">Connected Accounts</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="logs">Activity Logs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="accounts" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Connected Facebook Ad Accounts</CardTitle>
                  <CardDescription>Manage your linked Facebook advertising accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {connectedAccounts.map((account) => (
                      <Card key={account.id} className="overflow-hidden border">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex items-start">
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                                <Facebook className="h-5 w-5 text-facebook" />
                              </div>
                              <div>
                                <h3 className="font-medium">{account.name}</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Account ID: {account.accountId}
                                </p>
                                <div className="flex items-center mt-2 space-x-2">
                                  {getStatusBadge(account.status)}
                                  {account.status === 'connected' && (
                                    <span className="text-xs text-muted-foreground">
                                      Last sync: {account.lastSync}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 md:w-auto w-full">
                              <div className="p-3 bg-blue-50 rounded-lg text-center">
                                <p className="text-xs text-blue-700">Campaigns</p>
                                <p className="text-lg font-bold text-blue-900">{account.campaigns}</p>
                              </div>
                              <div className="p-3 bg-indigo-50 rounded-lg text-center">
                                <p className="text-xs text-indigo-700">Ad Sets</p>
                                <p className="text-lg font-bold text-indigo-900">{account.adSets}</p>
                              </div>
                              <div className="p-3 bg-purple-50 rounded-lg text-center">
                                <p className="text-xs text-purple-700">Ads</p>
                                <p className="text-lg font-bold text-purple-900">{account.ads}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-end mt-4">
                            <Button variant="outline" size="sm" className="gap-1.5 mr-2">
                              <RefreshCw className="h-3.5 w-3.5" />
                              Sync
                            </Button>
                            {account.status === 'connected' ? (
                              <Button variant="outline" size="sm" className="gap-1.5 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800">
                                <XCircle className="h-3.5 w-3.5" />
                                Disconnect
                              </Button>
                            ) : (
                              <Button size="sm" className="gap-1.5">
                                <CheckCircle className="h-3.5 w-3.5" />
                                Reconnect
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <p className="text-sm text-muted-foreground">Showing 3 of 3 accounts</p>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Go to Facebook Ads Manager
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="permissions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Permissions</CardTitle>
                  <CardDescription>Manage access levels for the Facebook Ads API</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <div className="flex items-center p-4 bg-muted/50">
                        <div className="w-1/2 font-medium">Permission</div>
                        <div className="w-1/4 font-medium">Status</div>
                        <div className="w-1/4 font-medium">Actions</div>
                      </div>
                      <div className="divide-y">
                        {permissionStatus.map((permission, index) => (
                          <div key={index} className="flex items-center p-4">
                            <div className="w-1/2">{permission.name}</div>
                            <div className="w-1/4">{getPermissionStatusBadge(permission.status)}</div>
                            <div className="w-1/4">
                              {permission.status !== 'granted' && (
                                <Button size="sm" variant="outline">
                                  Request
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                      <div className="flex items-start">
                        <Shield className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-800">Permission Information</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            Some permissions may require approval from Facebook. Incomplete permissions may limit certain features of the analytics platform.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <Button className="gap-1.5">
                    <Lock className="h-4 w-4" />
                    Review Permissions
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="logs" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Integration Activity Logs</CardTitle>
                  <CardDescription>Track system events and integration activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="flex items-center p-3 bg-muted/50 text-sm">
                      <div className="w-1/6 font-medium">Time</div>
                      <div className="w-1/6 font-medium">Event</div>
                      <div className="w-1/12 font-medium text-center">Status</div>
                      <div className="w-7/12 font-medium">Message</div>
                    </div>
                    <div className="divide-y">
                      {integrationLogs.map((log, index) => (
                        <div key={index} className="flex items-center p-3 text-sm">
                          <div className="w-1/6 text-muted-foreground">{log.timestamp}</div>
                          <div className="w-1/6">{log.event}</div>
                          <div className="w-1/12 flex justify-center">{getLogStatusIcon(log.status)}</div>
                          <div className="w-7/12">{log.message}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-6 justify-between">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <FileText className="h-3.5 w-3.5" />
                    Export Logs
                  </Button>
                  <Button size="sm" variant="ghost">Clear Logs</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="section-transition">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Integration Status</CardTitle>
              <CardDescription>Overview of your Facebook connection</CardDescription>
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
              <CardDescription>Configure sync and AI analysis options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-sync">Automatic Sync</Label>
                  <Switch id="auto-sync" checked={autoSync} onCheckedChange={setAutoSync} />
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
                  <Input id="api-key" type="text" value="385729102984017" readOnly className="font-mono text-sm" />
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
                  Higher levels provide more detailed insights but may take longer
                </p>
              </div>
              
              <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                <div className="flex items-start">
                  <Zap className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800">Pro Tip</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      For best results, keep automatic sync enabled and use the advanced AI analysis level for more actionable insights.
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
