import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useAdAccountsTable } from '@/hooks/tabs/useAdAccountsTable';
import { formatDateBr } from '@/utils/format';
import { Loader2, Usb } from 'lucide-react';

const TableSelectAdAccounts = () => {
  const {
    getStatusBadge,
    unselectAllAdAccounts,
    handleSelectAll,
    toggleAccountSelection,

    adAccounts,
    checkboxRef,
    selectedAccounts,
    allSelected,
    isLoadingSelectAdAccounts,
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
              onClick={() => toggleAccountSelection(account.id)}
              className={`rounded-xl border p-4 shadow-sm transition-all hover:bg-muted/50 ${
                selectedAccounts.includes(account.id)
                  ? 'bg-muted/50'
                  : 'bg-white'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedAccounts.includes(account.id)}
                    onCheckedChange={() => toggleAccountSelection(account.id)}
                    aria-label={`Selecionar conta ${account.name}`}
                  />
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
                  <span className="text-muted-foreground">
                    Conta conectada?:
                  </span>{' '}
                  {account.is_active ? 'Sim' : 'Não'}
                </div>
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
        <Button size="sm" className="gap-1.5">
          <Usb className="h-3.5 w-3.5" />
          Conectar 
        </Button>
      </div>
    </div>
  );

  // Em forma de tabela
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-muted-foreground">
          {selectedAccounts.length > 0 && (
            <span>{selectedAccounts.length} campanha(s) selecionada(s)</span>
          )}
        </div>

        {selectedAccounts.length > 0 && (
          <Button variant="outline" size="sm" onClick={unselectAllAdAccounts}>
            Limpar seleção
          </Button>
        )}
      </div>

      {/* Scroll vertical com header fixo */}
      <div className="rounded-md border max-h-[500px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 bg-background border-b">
            <tr>
              <th className="w-[50px] px-4 py-2 text-left">
                <Checkbox
                  ref={checkboxRef}
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Selecionar todas as contas"
                />
              </th>
              <th className="px-4 py-2 text-left">Nome da Conta</th>
              <th className="px-4 py-2 text-left">Status da Conta</th>
              <th className="px-4 py-2 text-left">Portfólios Empresariais</th>
              <th className="px-4 py-2 text-left">Gerenciando?</th>
              <th className="px-4 py-2 text-right">Atualizado em</th>
            </tr>
          </thead>
          <tbody>
            {adAccounts.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-muted-foreground"
                >
                  Nenhuma conta encontrada. Autentique-se e sincronize os dados.
                </td>
              </tr>
            ) : (
              adAccounts.map((account) => (
                <tr
                  key={account.id}
                  className={
                    selectedAccounts.includes(account.id) ? 'bg-muted/50' : ''
                  }
                >
                  <td className="px-4 py-2">
                    <Checkbox
                      checked={selectedAccounts.includes(account.id)}
                      onCheckedChange={() => toggleAccountSelection(account.id)}
                      aria-label={`Selecionar conta ${account.name}`}
                    />
                  </td>
                  <td className="px-4 py-2 font-medium">
                    <div>{account.name}</div>
                    <div className="text-xs text-muted-foreground">
                      ID: {account.account_id}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    {account.is_active ? 'Sim' : 'Não'}
                  </td>
                  <td className="px-4 py-2">
                    {getStatusBadge(account.account_status)}
                  </td>
                  <td className="px-4 py-2">
                    <div>{account.business_name}</div>
                    <div className="text-xs text-muted-foreground">
                      ID: {account.business_id}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-right">
                    {formatDateBr(account.updated_at)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Botão alinhado à direita */}
      <div className="flex justify-end">
        <Button size="sm" className="gap-1.5">
          <Usb className="h-3.5 w-3.5" />
          Conectar contas selecionadas
        </Button>
      </div>
    </div>
  );
};

export default TableSelectAdAccounts;
