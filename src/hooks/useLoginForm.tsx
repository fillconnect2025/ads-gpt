import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email({
    message: 'E-mail inválido',
  }),
  password: z.string().min(6, {
    message: 'A senha deve ter pelo menos 6 caracteres',
  }),
});

type LoginFormValues = z.infer<typeof formSchema>;

export const useLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const success = await login(data.email, data.password);
      if (success) {
        navigate('/dashboard');
        toast({
          title: 'Login successful',
          description: 'Welcome back!',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Login failed',
          description: 'Invalid email or password. Please try again.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: 'An error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    form,
    onSubmit,
    togglePasswordVisibility,

    isLoading,
    user,
    showPassword
  };
};
