import { Dialog, DialogContent } from '@/components/ui/dialog';
import TableSelectAdAccounts from '../table/TableSelectAdAccounts';

type DialogSelectAdAccountsType = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export function DialogSelectAdAccounts({
  open,
  setOpen,
}: DialogSelectAdAccountsType) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl">
        <h2 className="text-lg font-semibold mb-4">
          Escolha as contas que deseja gerenciar
        </h2>

        <TableSelectAdAccounts />
      </DialogContent>
    </Dialog>
  );
}
