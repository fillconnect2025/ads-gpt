import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const registerSchema = z
  .object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Confirm password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const { handleSignUp, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const response = await handleSignUp(data.email, data.password, data.name);
      if (response.success) {
        toast({
          title: 'Registration successful',
          description: 'Your account has been created. You can now login.',
        });
        navigate('/login');
        return true;
      } else {
        toast({
          variant: 'destructive',
          title: 'Registration failed',
          description:
            response.message || 'Failed to create account. Please try again.',
        });
        return false;
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Registration failed',
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
