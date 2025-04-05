
import React from 'react';
import { useTokens } from '@/context/TokenContext';
import { Progress } from '@/components/ui/progress';
import { Coins } from 'lucide-react';
import { Link } from 'react-router-dom';

const TokenDisplay = () => {
  const { tokens, usedTokens, plan } = useTokens();
  
  // Calculate token usage percentage
  const maxTokens = getPlanMaxTokens(plan);
  const usagePercentage = Math.min(100, (usedTokens / maxTokens) * 100);

  // Format plan name for display
  const planDisplayName = {
    'lite': 'Lite',
    'plus': 'Plus',
    'prime': 'Prime'
  }[plan];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Coins className="h-5 w-5 text-yellow-500" />
          <h4 className="text-sm font-medium">Tokens</h4>
        </div>
        <Link to="/plans" className="text-xs text-primary hover:underline">
          Upgrade
        </Link>
      </div>
      
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-bold">{tokens}</span>
        <span className="text-xs text-muted-foreground">Plano {planDisplayName}</span>
      </div>
      
      <Progress value={usagePercentage} className="h-2" />
      
      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
        <span>{usedTokens} usados</span>
        <span>{maxTokens} total</span>
      </div>
    </div>
  );
};

// Helper function to determine max tokens based on plan
function getPlanMaxTokens(plan: 'lite' | 'plus' | 'prime'): number {
  switch (plan) {
    case 'lite': return 100;
    case 'plus': return 500;
    case 'prime': return 2000;
    default: return 100;
  }
}

export default TokenDisplay;
