import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRegisterForm } from '@/hooks/useRegisterForm';
import { Eye, EyeOff, Key, Loader2, Mail, User, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import * as z from 'zod';

const formSchema = z.object({
  nome: z.string().min(2, {
    message: 'O nome deve ter pelo menos 2 caracteres',
  }),
  email: z.string().email({
    message: 'E-mail inválido',
  }),
  password: z.string().min(6, {
    message: 'A senha deve ter pelo menos 6 caracteres',
  }),
  termos: z.boolean().refine((val) => val === true, {
    message: 'Você precisa aceitar os termos e condições',
  }),
});

const Register = () => {
  const { form, isLoading, onSubmit, user } = useRegisterForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-zinc-900 dark:to-black px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="/uploads/e73c30b4-497e-4698-8624-51e217934707.png"
            alt="Ads-GPT Logo"
            className="h-32 w-auto mx-auto mb-6"
          />
          <h1 className="text-3xl font-semibold">Crie sua conta</h1>
          <p className="text-muted-foreground mt-2">
            Registre-se para começar a usar o Ads-GPT
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex justify-center">
              <div className="bg-primary/10 p-3 rounded-full">
                <UserPlus className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome completo</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <Input
                            placeholder="Seu nome"
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
                            <Key className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="********"
                            className="pl-10"
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Key className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="********"
                            className="pl-10"
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
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

                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Criando conta...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4" />
                      Criar conta
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Ou registre-se com
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <Button variant="outline">Google</Button>
              <Button variant="outline">Facebook</Button>
            </div>
            <div className="text-center mt-4 text-sm">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Faça login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
