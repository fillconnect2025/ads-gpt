import { useEffect, useState } from 'react';
import { useFacebookAds } from '@/context/FacebookADSContext';

export const useAdAccountsTable = () => {
  const { adAccounts, isLoadingSelectAdAccounts } = useFacebookAds();
  const [selectedAdAccountIds, setSelectedAdAccountIds] = useState<string[]>([]);

  useEffect(() => {
    // Initialize selectedAdAccountIds based on adAccounts data
    if (adAccounts && adAccounts.length > 0) {
      const initialSelectedIds = adAccounts
        .filter((account) => account.is_active)
        .map((account) => account.id);
      setSelectedAdAccountIds(initialSelectedIds);
    }
  }, [adAccounts]);

  const handleAdAccountSelection = (adAccountId: string) => {
    setSelectedAdAccountIds((prevSelected) => {
      if (prevSelected.includes(adAccountId)) {
        return prevSelected.filter((id) => id !== adAccountId);
      } else {
        return [...prevSelected, adAccountId];
      }
    });
  };

  return {
    adAccounts,
    isLoadingSelectAdAccounts,
    selectedAdAccountIds,
    handleAdAccountSelection,
  };
};

