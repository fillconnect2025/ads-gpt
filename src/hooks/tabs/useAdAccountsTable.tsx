
import { useEffect, useRef, useState } from 'react';
import { useFacebookAds } from '@/context/FacebookADSContext';
import { Badge } from '@/components/ui/badge';
import { IModelFacebookAdAccounts } from '@/@types/supabase';

export const useAdAccountsTable = () => {
  const { adAccounts, isLoadingSelectAdAccounts, fetchPutAdAccounts } = useFacebookAds();
  const [selectedAdAccountIds, setSelectedAdAccountIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [isFetchPutAdAccounts, setIsFetchPutAdAccounts] = useState(false);
  
  useEffect(() => {
    // Initialize selectedAdAccountIds based on adAccounts data
    if (adAccounts && adAccounts.length > 0) {
      const initialSelectedIds = adAccounts
        .filter((account: IModelFacebookAdAccounts) => account.is_active)
        .map((account: IModelFacebookAdAccounts) => account.id || '');
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

  const toggleAccountSelection = (adAccountId: string) => {
    handleAdAccountSelection(adAccountId);
  };

  const handleSelectAll = () => {
    if (adAccounts.length === selectedAdAccountIds.length) {
      setSelectedAdAccountIds([]);
    } else {
      const allIds = adAccounts.map((account: IModelFacebookAdAccounts) => account.id || '');
      setSelectedAdAccountIds(allIds);
    }
  };

  const unselectAllAdAccounts = () => {
    setSelectedAdAccountIds([]);
  };

  const getStatusBadge = (status: number) => {
    switch (status) {
      case 1:
        return <Badge className="bg-green-500">Active</Badge>;
      case 2:
        return (
          <Badge variant="outline" className="text-red-500 border-red-500">
            Disabled
          </Badge>
        );
      default:
        return <Badge variant="outline">{`Status: ${status}`}</Badge>;
    }
  };
  
  const handleFetchPutAdAccounts = async (ids: string[]) => {
    setIsFetchPutAdAccounts(true);
    try {
      await fetchPutAdAccounts(ids);
    } finally {
      setIsFetchPutAdAccounts(false);
    }
  };

  // Filter accounts based on search term
  const filteredAccounts = searchTerm 
    ? adAccounts.filter((account: IModelFacebookAdAccounts) => 
        account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.account_id.toString().includes(searchTerm) ||
        account.business_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : adAccounts;

  const allSelected = adAccounts.length > 0 && selectedAdAccountIds.length === adAccounts.length;

  return {
    adAccounts: filteredAccounts,
    isLoadingSelectAdAccounts,
    selectedAdAccountIds,
    handleAdAccountSelection,
    getStatusBadge,
    unselectAllAdAccounts,
    handleSelectAll,
    toggleAccountSelection,
    fetchPutAdAccounts: handleFetchPutAdAccounts,
    checkboxRef,
    selectedAccounts: selectedAdAccountIds,
    allSelected,
    isFetchPutAdAccounts,
    searchTerm,
    setSearchTerm,
  };
};
