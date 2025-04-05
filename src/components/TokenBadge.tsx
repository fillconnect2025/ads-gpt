
import React from 'react';
import { useTokens } from '@/context/TokenContext';
import { Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

const TokenBadge = () => {
  const { tokens, usedTokens, plan } = useTokens();
  
  // Calculate token percentage
  const maxTokens = (() => {
    switch (plan) {
      case 'lite': return 100;
      case 'plus': return 500;
      case 'prime': return 2000;
      default: return 100;
    }
  })();
  
  const usagePercentage = Math.min(100, (usedTokens / maxTokens) * 100);
  
  // Format plan name for display
  const planDisplayName = {
    'lite': 'Lite',
    'plus': 'Plus',
    'prime': 'Prime'
  }[plan];
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`flex items-center gap-1 px-2 ${tokens < maxTokens * 0.2 ? 'text-destructive animate-pulse' : ''}`}
            asChild
          >
            <Link to="/token-usage">
              <Coins className={`h-4 w-4 ${tokens < maxTokens * 0.2 ? 'text-destructive' : 'text-yellow-500'}`} />
              <span className="font-semibold">{tokens}</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="end" className="w-60 p-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="font-semibold">Plano {planDisplayName}</p>
              <Link to="/plans" className="text-xs text-primary hover:underline">
                Fazer upgrade
              </Link>
            </div>
            <Progress value={usagePercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{tokens} tokens restantes</span>
              <span>{maxTokens} total</span>
            </div>
            <div className="pt-1 border-t mt-2">
              <p className="text-xs text-primary">Clique para ver detalhes de uso</p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TokenBadge;
