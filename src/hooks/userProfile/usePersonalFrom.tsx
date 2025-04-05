import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { phoneRegex } from '@/utils/regexs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const profileSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .optional(),
  email: z.string().email({ message: 'Invalid email address' }).optional(),
  phone: z
    .union([
      z.string().regex(phoneRegex, {
        message: 'Telefone deve estar no formato (61) 00000-0000',
      }),
      z.literal(''),
    ])
    .optional(),
});

type RegisterFormValues = z.infer<typeof profileSchema>;

export const usePersonalFrom = () => {
  const { handleUpdateUser, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.user_metadata?.name || '',
      email: user.email,
      phone: user?.phone || '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const response = await handleUpdateUser(
        data.email,
        data.name,
        data.phone
      );
      if (response.success) {
        toast({
          title: 'Updated successful',
          description: 'Your account has been updated.',
        });
        return true;
      } else {
        toast({
          variant: 'destructive',
          title: 'Updated failed',
          description:
            response.message || 'Failed to create updated. Please try again.',
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
