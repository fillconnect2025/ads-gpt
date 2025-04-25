import { ISelectedAccount } from '@/@types/integrations.type';
import { useFacebookAds } from '@/context/FacebookADSContext';
import { useEffect, useRef, useState } from 'react';


export const useAdAccountsTable = () => {
  const {
    adAccounts,
    isLoadingSelectAdAccounts,
    fetchPutAdAccountsAdsCampaigns,
    isFetchPutAdAccounts,
  } = useFacebookAds();

  const [selectedAccounts, setSelectedAccounts] = useState<ISelectedAccount[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState<string>('');
  const checkboxRef = useRef<HTMLDivElement>(null);

  const filteredAdAccounts = adAccounts.filter((account) =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const allSelected =
    filteredAdAccounts.length > 0 &&
    filteredAdAccounts.length === adAccounts.length;

  const unselectAllAdAccounts = () => {
    setSelectedAccounts([]);
  };

  const selectAllAdAccounts = () => {
    const allAccounts = filteredAdAccounts.map((account) => ({
      id: account.id,
      account_id: account.account_id,
    }));
    setSelectedAccounts(allAccounts);
  };

  const toggleAccountSelection = (account: {
    id: string;
    account_id: number;
  }) => {
    setSelectedAccounts((prevSelected) => {
      const exists = prevSelected.some(
        (a) => a.account_id === account.account_id
      );

      if (exists) {
        return prevSelected.filter((a) => a.account_id !== account.account_id);
      } else {
        return [...prevSelected, account];
      }
    });
  };

  useEffect(() => {
    if (adAccounts && adAccounts.length > 0) {
      const activeAccounts = adAccounts
        .filter((adAccount) => adAccount?.is_active)
        .map((adAccount) => ({
          id: adAccount.id,
          account_id: adAccount.account_id,
        }));

      setSelectedAccounts(activeAccounts);
    }
  }, [adAccounts]);

  return {
    // FUNCTION
    selectAllAdAccounts,
    unselectAllAdAccounts,
    toggleAccountSelection,
    fetchPutAdAccountsAdsCampaigns,

    // STATES
    isLoadingSelectAdAccounts,
    checkboxRef,
    allSelected,
    adAccounts: filteredAdAccounts,
    selectedAccounts,
    setSelectedAccounts,
    isFetchPutAdAccounts,
    searchTerm,
    setSearchTerm,
  };
};
