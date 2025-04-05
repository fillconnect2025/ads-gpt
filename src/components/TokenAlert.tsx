
import React from 'react';
import { useTokens } from '@/context/TokenContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

const TokenAlert = () => {
  const { tokens, usedTokens, plan } = useTokens();
  
  // Define limites por plano
  const getTokenLimit = () => {
    switch (plan) {
      case 'lite': return 100;
      case 'plus': return 500;
      case 'prime': return 2000;
      default: return 100;
    }
  };
  
  const tokenLimit = getTokenLimit();
  const tokenPercentage = Math.min(100, (usedTokens / tokenLimit) * 100);
  const tokensRemaining = tokenLimit - usedTokens;
  const lowTokenThreshold = tokenLimit * 0.2; // 20% do limite
  
  // Não mostrar o alerta se os tokens estão acima do limite
  if (tokensRemaining >= lowTokenThreshold) {
    return null;
  }
  
  return (
    <Alert variant="destructive" className="mb-4 animate-fade-in">
      <AlertTriangle className="h-4 w-4 mt-1" />
      <AlertTitle className="flex items-center justify-between">
        Tokens acabando!
        <Link to="/plans">
          <Button variant="destructive" size="sm" className="ml-2">
            Fazer upgrade
          </Button>
        </Link>
      </AlertTitle>
      <AlertDescription>
        <p className="mt-1 mb-2">Você tem apenas {tokens} tokens restantes. Considere fazer upgrade para continuar usando o sistema sem interrupções.</p>
        <Progress value={tokenPercentage} className="h-2" />
        <p className="text-xs mt-1 text-right">{tokens} de {tokenLimit} tokens</p>
      </AlertDescription>
    </Alert>
  );
};

export default TokenAlert;
