import { IModelIntegration } from '@/@types/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { listIntegrations } from '@/constant/listIntegrations';
import { cn } from '@/lib/utils';

type IntegrationsDialogType = {
  open: boolean;
  setOpen: (value: boolean) => void;
  integrations: IModelIntegration[];
  handleIntegrations: (type: string) => void;
};

export function IntegrationsDialog({
  open,
  setOpen,
  integrations,
  handleIntegrations,
}: IntegrationsDialogType) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl">
        <h2 className="text-lg font-semibold mb-4">Escolha uma Integração</h2>
        <ScrollArea className="h-[500px]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {listIntegrations.filter(item => !item.disabled).map((integration) => {
              const alreadyIntegrated = integrations.find(
                (item) =>
                  item.name.toUpperCase() === integration.name.toUpperCase()
              );
              return (
                <Card
                  key={integration.name}
                  className={cn(
                    'transition p-4 border bg-white text-black dark:bg-zinc-900 dark:text-white dark:border-zinc-700',
                    integration.disabled && 'cursor-not-allowed opacity-50',
                    !integration.disabled &&
                      alreadyIntegrated &&
                      'bg-green-100 border-green-500 hover:shadow-md cursor-not-allowed dark:bg-green-900 dark:border-green-400',
                    !integration.disabled &&
                      !alreadyIntegrated &&
                      'hover:shadow-md cursor-pointer'
                  )}
                  onClick={() => {
                    // if (!integration.disabled && !alreadyIntegrated) {
                      handleIntegrations(integration.name.toUpperCase());
                    // }
                  }}
                >
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                    <div className="text-primary dark:text-primary">
                      {integration.icon}
                    </div>
                    <p className="text-lg font-medium text-center">
                      {integration.name}
                    </p>
                    {!integration.disabled &&
                      listIntegrations.find(
                        (item) =>
                          item.name.toUpperCase() ===
                          integration.name.toUpperCase()
                      ) && (
                        <p className="text-sm font-light text-center">
                          Conectado
                        </p>
                      )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
