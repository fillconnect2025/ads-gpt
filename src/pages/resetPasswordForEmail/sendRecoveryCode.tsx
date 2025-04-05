import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSendRecoveryCodeForm } from '@/hooks/useResetPasswordForEmail/sendRecoveryCode';
import { CheckCircle, Code, Loader2, Mail } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

const SendRecoveryCode = () => {
  const { form, isLoading, onSubmit, user } = useSendRecoveryCodeForm();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-zinc-900">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <img
              src="/uploads/e73c30b4-497e-4698-8624-51e217934707.png"
              alt="Ads-GPT Logo"
              className="h-24 w-auto"
            />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Bem-vindo ao Ads-GPT</h1>
            <p className="text-muted-foreground mt-2">
              Entre com suas credenciais para acessar sua conta
            </p>
          </div>

          <Card className="border-0 shadow-lg bg-white dark:bg-zinc-800">
            <CardContent className="pt-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <Input
                              placeholder="seu@email.com"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Carregando...
                      </>
                    ) : (
                      <>
                        <Code className="h-4 w-4" />
                        Enviar
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-0">
              <div className="text-center mt-4 text-sm">
                Já tem uma conta?{' '}
                <Link to="/login" className="text-primary hover:underline">
                  Login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 bg-primary text-primary-foreground">
        <div className="h-full flex flex-col justify-center items-center p-12">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold mb-6">
              Potencialize seus anúncios com IA
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Otimize suas campanhas e aumente seu ROI com nossa plataforma
              inteligente de gerenciamento de anúncios.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-white/20 rounded-full mr-3 mt-1">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <p className="opacity-90">
                  Dashboard completo com métricas em tempo real
                </p>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-white/20 rounded-full mr-3 mt-1">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <p className="opacity-90">
                  Recomendações personalizadas baseadas em IA
                </p>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-white/20 rounded-full mr-3 mt-1">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <p className="opacity-90">
                  Integração com todas as principais plataformas
                </p>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 bg-white/20 rounded-full mr-3 mt-1">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <p className="opacity-90">
                  Suporte técnico especializado e personalizado
                </p>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
              <blockquote className="italic">
                "O Ads-GPT transformou completamente nossa estratégia de
                marketing digital. Conseguimos aumentar o ROI em mais de 150% em
                apenas 3 meses!"
              </blockquote>
              <div className="mt-4 flex items-center">
                <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
                  <span className="font-bold">MS</span>
                </div>
                <div className="ml-3">
                  <p className="font-medium">Marcos Silva</p>
                  <p className="opacity-70 text-sm">CMO, TechSolutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendRecoveryCode;
