import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Separator } from '../ui/separator';

const TabNotifications = () => {
  return (
    <TabsContent value="notifications">
      <Card>
        <CardHeader>
          <CardTitle>Preferências de Notificações</CardTitle>
          <CardDescription>
            Escolha como deseja receber nossas notificações
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium mb-1">Notificações por Email</h4>
                <p className="text-sm text-muted-foreground">
                  Receba atualizações no seu email
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="notificacaoEmail"
                  checked={false}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium mb-1">Notificações no App</h4>
                <p className="text-sm text-muted-foreground">
                  Receba notificações dentro da plataforma
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="notificacaoApp"
                  checked={false}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button >Salvar preferências</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default TabNotifications;
