import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const securitySchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    newPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Confirm password is required' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof securitySchema>;

export const useSecurityFrom = () => {
  const { handlePasswordUpdateUser, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const response = await handlePasswordUpdateUser(
        data.currentPassword,
        data.newPassword
      );
      if (response.success) {
        toast({
          title: 'Updated successful',
          description: 'Your password has been updated.',
        });
        return true;
      } else {
        toast({
          variant: 'destructive',
          title: 'Updated failed',
          description:
            response.message || 'Failed to password updated. Please try again.',
        });
        return false;
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Updated failed',
        description: 'An error occurred. Please try again.',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    onSubmit,

    user,
    isLoading,
  };
};
