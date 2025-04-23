
import { Button } from '@/components/ui/button';
import { useAdAccountsTable } from '@/hooks/tabs/useAdAccountsTable';
import { formatDateBr } from '@/utils/format';
import { Loader2, Search } from 'lucide-react';
import { Input } from '../ui/input';

const TableSelectAdAccounts = () => {
  const {
    getStatusBadge,
    unselectAllAdAccounts,
    toggleAccountSelection,
    fetchPutAdAccounts,
    adAccounts,
    selectedAccounts,
    isLoadingSelectAdAccounts,
    isFetchPutAdAccounts,
    searchTerm,
    setSearchTerm,
  } = useAdAccountsTable();

  if (isLoadingSelectAdAccounts) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-sm text-muted-foreground">
            Carregando Contas de Anúncios...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Header com contador e botão limpar */}
      <div className="flex flex-col gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar contas..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-muted-foreground">
            {selectedAccounts.length > 0 && (
              <span>{selectedAccounts.length} conta(s) selecionada(s)</span>
            )}
          </div>

          {selectedAccounts.length > 0 && (
            <Button variant="outline" size="sm" onClick={unselectAllAdAccounts}>
              Limpar seleção
            </Button>
          )}
        </div>
      </div>

      {/* Lista com scroll */}
      <div className="grid gap-4 max-h-[500px] overflow-y-auto pr-1">
        {adAccounts.length === 0 ? (
          <div className="text-center text-muted-foreground py-6">
            Nenhuma conta encontrada. Autentique-se e sincronize os dados.
          </div>
        ) : (
          adAccounts.map((account) => (
            <div
              key={account.id}
              onClick={() => toggleAccountSelection(account.id || '')}
              className={`rounded-xl border p-4 shadow-sm transition-all hover:bg-muted/90 ${
                selectedAccounts.includes(account.id || '')
                  ? 'bg-muted/90'
                  : 'bg-white'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-medium text-base">{account.name}</div>
                    <div className="text-xs text-muted-foreground">
                      ID: {account.account_id}
                    </div>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground text-right">
                  {formatDateBr(account.updated_at)}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm">
                <span className="text-muted-foreground">
                  Status da conta: {getStatusBadge(account.account_status)}
                </span>{' '}
                <div className="sm:col-span-2">
                  <span className="text-muted-foreground">Portfólio:</span>{' '}
                  {account.business_name}
                  <div className="text-xs text-muted-foreground">
                    ID: {account.business_id}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Botão alinhado à direita */}
      <div className="flex justify-end">
        <Button
          size="sm"
          className="gap-1.5"
          onClick={() => fetchPutAdAccounts(selectedAccounts)}
        >
          {isFetchPutAdAccounts ? (
            <Loader2 className="h-3.5 w-3.5" />
          ) : (
            <Loader2 className="h-3.5 w-3.5" />
          )}
          {isFetchPutAdAccounts ? ' Conectando...' : 'Conectar'}
        </Button>
      </div>
    </div>
  );
};

export default TableSelectAdAccounts;
