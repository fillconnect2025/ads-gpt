
import React, { useState } from 'react';
import { Check, ChevronDown, Clock } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'scheduled';
  budget: number;
  platform: string;
  startDate: string;
  endDate?: string;
}

interface CampaignSelectorProps {
  campaigns: Campaign[];
  selectedCampaign?: Campaign;
  onSelect: (campaign: Campaign) => void;
}

const statusColors = {
  active: 'bg-green-100 text-green-800',
  paused: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-blue-100 text-blue-800',
  scheduled: 'bg-purple-100 text-purple-800'
};

const CampaignSelector: React.FC<CampaignSelectorProps> = ({ 
  campaigns, 
  selectedCampaign, 
  onSelect 
}) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (campaign: Campaign) => {
    onSelect(campaign);
    setIsOpen(false);
    
    toast({
      title: "Campanha selecionada",
      description: `${campaign.name} foi selecionada para análise`,
    });
  };

  // Formatar valor monetário
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {selectedCampaign ? (
            <div className="flex items-center">
              <span className="font-medium truncate max-w-[180px]">{selectedCampaign.name}</span>
            </div>
          ) : (
            <span>Selecionar campanha</span>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[320px]" align="start">
        <DropdownMenuLabel>Suas Campanhas</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[320px] overflow-auto">
          {campaigns.map((campaign) => (
            <DropdownMenuItem
              key={campaign.id}
              className="py-3 cursor-pointer"
              onClick={() => handleSelect(campaign)}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{campaign.name}</p>
                    {selectedCampaign?.id === campaign.id && (
                      <Check className="h-3.5 w-3.5 text-green-600" />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Badge variant="outline" className={statusColors[campaign.status]}>
                      {campaign.status === 'active' ? 'Ativa' : 
                       campaign.status === 'paused' ? 'Pausada' : 
                       campaign.status === 'completed' ? 'Concluída' : 'Agendada'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{formatCurrency(campaign.budget)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>
                      {new Date(campaign.startDate).toLocaleDateString('pt-BR')}
                      {campaign.endDate && ` - ${new Date(campaign.endDate).toLocaleDateString('pt-BR')}`}
                    </span>
                  </div>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center">
          <Button variant="ghost" size="sm" className="w-full">
            Ver todas as campanhas
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CampaignSelector;
