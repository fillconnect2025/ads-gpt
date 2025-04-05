
import React, { useState } from 'react';
import { Check, ChevronDown, Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export type AdPlatform = 'facebook' | 'google' | 'instagram' | 'tiktok';

export interface AdAccount {
  id: string;
  name: string;
  platform: AdPlatform;
  status: 'active' | 'paused' | 'disabled';
}

interface AdAccountSelectorProps {
  accounts: AdAccount[];
  selectedAccount?: AdAccount;
  onSelect: (account: AdAccount) => void;
}

const platformIcons = {
  facebook: <Facebook className="h-4 w-4 text-blue-600" />,
  google: (
    <svg className="h-4 w-4 text-red-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.5 12.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v3h-3c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h4.5c.83 0 1.5-.67 1.5-1.5v-4.5z" fill="#4285F4"/>
      <path d="M5.5 15.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H4c-.83 0-1.5-.67-1.5-1.5v-4.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v3z" fill="#34A853"/>
      <path d="M5.5 8.5h3c.83 0 1.5-.67 1.5-1.5S9.33 5.5 8.5 5.5H4C3.17 5.5 2.5 6.17 2.5 7v4.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-3z" fill="#FBBC05"/>
      <path d="M15.5 8.5h3v-3c0-.83-.67-1.5-1.5-1.5h-4.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h3z" fill="#EA4335"/>
    </svg>
  ),
  instagram: <Instagram className="h-4 w-4 text-pink-500" />,
  tiktok: (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" fill="currentColor" />
    </svg>
  ),
};

const platformColors = {
  facebook: 'bg-blue-100 text-blue-800',
  google: 'bg-red-100 text-red-800',
  instagram: 'bg-pink-100 text-pink-800',
  tiktok: 'bg-slate-100 text-slate-800',
};

const statusColors = {
  active: 'bg-green-100 text-green-800',
  paused: 'bg-yellow-100 text-yellow-800',
  disabled: 'bg-gray-100 text-gray-800',
};

const AdAccountSelector: React.FC<AdAccountSelectorProps> = ({ 
  accounts, 
  selectedAccount, 
  onSelect 
}) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (account: AdAccount) => {
    onSelect(account);
    setIsOpen(false);
    
    toast({
      title: "Conta de anúncios selecionada",
      description: `Você está conectado a: ${account.name}`,
    });
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {selectedAccount ? (
            <div className="flex items-center">
              <div className="mr-2">
                {platformIcons[selectedAccount.platform]}
              </div>
              <span className="font-medium truncate max-w-[180px]">{selectedAccount.name}</span>
            </div>
          ) : (
            <span>Selecionar conta de anúncios</span>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px]" align="start">
        <DropdownMenuLabel>Contas de Anúncios</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {accounts.map((account) => (
            <DropdownMenuItem
              key={account.id}
              className="py-2 cursor-pointer"
              onClick={() => handleSelect(account)}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-muted">
                    <div>{platformIcons[account.platform]}</div>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{account.name}</p>
                    <div className="flex gap-2 items-center">
                      <Badge variant="outline" className={platformColors[account.platform]}>
                        {account.platform.charAt(0).toUpperCase() + account.platform.slice(1)}
                      </Badge>
                      <Badge variant="outline" className={statusColors[account.status]}>
                        {account.status === 'active' ? 'Ativo' : 
                         account.status === 'paused' ? 'Pausado' : 'Desativado'}
                      </Badge>
                    </div>
                  </div>
                </div>
                {selectedAccount?.id === account.id && (
                  <Check className="h-4 w-4 text-green-600" />
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center">
          <Button variant="ghost" size="sm" className="w-full">
            + Conectar nova conta
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdAccountSelector;
