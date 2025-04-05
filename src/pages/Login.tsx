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
import { useLoginForm } from '@/hooks/useLoginForm';
import {
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  LogIn,
  Mail,
} from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

const Login = () => {
  const {
    form,
    isLoading,
    onSubmit,
    togglePasswordVisibility,
    user,
    showPassword,
  } = useLoginForm();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-zinc-900">
      {/* Seção de Login à esquerda */}
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

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="******"
                              className="pl-10"
                              {...field}
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="remember"
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="remember" className="text-sm">
                        Lembrar-me
                      </label>
                    </div>
                    <a
                      href="/send-recovery-code"
                      className="text-sm text-primary hover:underline"
                    >
                      Esqueceu a senha?
                    </a>
                  </div>

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
                        <LogIn className="h-4 w-4" />
                        Entrar
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-0">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Ou continue com
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                    className="h-4 w-4"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    className="h-4 w-4"
                  >
                    <path
                      fill="currentColor"
                      d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                    />
                  </svg>
                  Facebook
                </Button>
              </div>

              <div className="text-center mt-4 text-sm">
                Não tem uma conta?{' '}
                <Link to="/registro" className="text-primary hover:underline">
                  Registre-se
                </Link>
              </div>
            </CardFooter>
          </Card>

          <div className="mt-2 text-center text-sm text-muted-foreground">
            <p>Demo credentials: user@example.com / password123</p>
          </div>
        </div>
      </div>

      {/* Seção de destaque à direita - Usando a cor azul padrão do sistema */}
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

export default Login;
