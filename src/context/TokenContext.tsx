
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define token plan types
export type PlanType = 'lite' | 'plus' | 'prime';

export interface TokenContextType {
  tokens: number;
  usedTokens: number;
  plan: PlanType;
  updateTokens: (newTokens: number) => void;
  consumeToken: () => void;
  setPlan: (plan: PlanType) => void;
  resetUsedTokens: () => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [tokens, setTokens] = useState<number>(100);
  const [usedTokens, setUsedTokens] = useState<number>(0);
  const [plan, setPlan] = useState<PlanType>('lite');

  // Load token data from localStorage on mount
  useEffect(() => {
    const storedTokens = localStorage.getItem('tokens');
    const storedUsedTokens = localStorage.getItem('usedTokens');
    const storedPlan = localStorage.getItem('plan') as PlanType | null;

    if (storedTokens) setTokens(Number(storedTokens));
    if (storedUsedTokens) setUsedTokens(Number(storedUsedTokens));
    if (storedPlan) setPlan(storedPlan);
  }, []);

  // Save token data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('tokens', tokens.toString());
    localStorage.setItem('usedTokens', usedTokens.toString());
    localStorage.setItem('plan', plan);
  }, [tokens, usedTokens, plan]);

  const updateTokens = (newTokens: number) => {
    setTokens(newTokens);
  };

  const consumeToken = () => {
    if (tokens > 0) {
      setTokens(prev => prev - 1);
      setUsedTokens(prev => prev + 1);
    }
  };

  const resetUsedTokens = () => {
    setUsedTokens(0);
  };

  const value = {
    tokens,
    usedTokens,
    plan,
    updateTokens,
    consumeToken,
    setPlan,
    resetUsedTokens
  };

  return <TokenContext.Provider value={value}>{children}</TokenContext.Provider>;
};

export const useTokens = (): TokenContextType => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useTokens must be used within a TokenProvider');
  }
  return context;
};
