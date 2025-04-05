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
});

type LoginFormValues = z.infer<typeof formSchema>;

export const useSendRecoveryCodeForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { requestPasswordReset, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const { description, title, variant, success } =
        await requestPasswordReset(data.email);
      toast({ description, title, variant });

      // if (success) navigate('/dashboard');
      
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

  return {
    form,
    onSubmit,
    isLoading,
    user,
  };
};
