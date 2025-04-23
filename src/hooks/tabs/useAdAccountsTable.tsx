import { Badge } from '@/components/ui/badge';
import { useFacebookAds } from '@/context/FacebookADSContext';
import { useEffect, useRef, useState } from 'react';

export const useAdAccountsTable = () => {
  const {
    adAccounts,
    isLoadingSelectAdAccounts,
    fetchPutAdAccounts,
    isFetchPutAdAccounts,
  } = useFacebookAds();

  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const checkboxRef = useRef<HTMLDivElement>(null);

  const filteredAdAccounts = adAccounts.filter((account) =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const allSelected =
    adAccounts.length > 0 && selectedAccounts.length === adAccounts.length;

  const getStatusBadge = (status: number) => {
    switch (status) {
      case 1: // ACTIVE
        return <Badge className="bg-green-500 hover:bg-green-600">Ativa</Badge>;
      case 2: // DISABLED
        return (
          <Badge className="bg-gray-500 hover:bg-gray-600">Desativada</Badge>
        );
      case 3: // UNSETTLED
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">
            Pagamento Pendente
          </Badge>
        );
      case 7: // PENDING_RISK_REVIEW
        return (
          <Badge className="bg-orange-500 hover:bg-orange-600">
            Em Análise de Risco
          </Badge>
        );
      case 8: // PENDING_SETTLEMENT
        return (
          <Badge className="bg-orange-400 hover:bg-orange-600 text-black">
            Aguardando Liquidação
          </Badge>
        );
      case 9: // IN_GRACE_PERIOD
        return (
          <Badge className="bg-blue-400 hover:bg-blue-600">
            Período de Carência
          </Badge>
        );
      case 100: // PENDING_CLOSURE
        return (
          <Badge className="bg-red-400 hover:bg-red-600">
            Aguardando Encerramento
          </Badge>
        );
      case 101: // CLOSED
        return <Badge className="bg-red-600 hover:bg-red-600">Encerrada</Badge>;
      case 201: // ANY_ACTIVE
        return (
          <Badge className="bg-green-400 hover:bg-green-600">
            Qualquer Conta Ativa
          </Badge>
        );
      case 202: // ANY_CLOSED
        return (
          <Badge className="bg-gray-400 hover:bg-gray-600">
            Qualquer Conta Encerrada
          </Badge>
        );

      default:
        return <Badge variant="secondary">Status: {status}</Badge>;
    }
  };

  const handleSelectAll = () => {
    if (allSelected) {
      unselectAllAdAccounts();
    } else {
      selectAllAdAccounts();
    }
  };

  const unselectAllAdAccounts = () => {
    setSelectedAccounts([]);
  };

  const selectAllAdAccounts = () => {
    const allCampaignIds = adAccounts.map((campaign) => campaign.id);
    setSelectedAccounts(allCampaignIds);
  };

  const toggleAccountSelection = (id: string) => {
    setSelectedAccounts((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((accountId) => accountId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  useEffect(() => {
    if (adAccounts && adAccounts.length > 0) {
      const activeAccounts = adAccounts
        .filter((adAccount) => adAccount.is_active)
        .map((adAccount) => adAccount.id);

      setSelectedAccounts(activeAccounts);
    }
  }, [adAccounts]);

  return {
    // FUNCTION
    getStatusBadge,
    handleSelectAll,
    unselectAllAdAccounts,
    toggleAccountSelection,
    fetchPutAdAccounts,

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
