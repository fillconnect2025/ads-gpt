import { IUser } from '@/@types/user.type';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/utils/supabase';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Define user type
interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  handleLogout: () => Promise<void>;
  handleSignUp: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ success: boolean; message?: string }>;
  handleUpdateUser: (
    email: string,
    name: string,
    phone: string
  ) => Promise<{ success: boolean; message?: string }>;
  handlePasswordUpdateUser: (
    currentPassword: string,
    newPassword: string
  ) => Promise<{ success: boolean; message?: string }>;
  requestPasswordReset: (email: string) => Promise<{
    success: boolean;
    variant?: 'default' | 'destructive';
    title: string;
    description: string;
  }>;
  verifyOTP: (
    email: string,
    token: string
  ) => Promise<{ success: boolean; message?: string }>;
  resetPassword: (
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  login: async () => false,
  handleLogout: async () => {},
  handleSignUp: async () => ({ success: false }),
  handleUpdateUser: async () => ({ success: false }),
  handlePasswordUpdateUser: async () => ({ success: false }),
  requestPasswordReset: async () => ({
    success: false,
    title: '',
    description: '',
    variant: 'default',
  }),
  verifyOTP: async () => ({ success: false }),
  resetPassword: async () => ({ success: false }),
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      try {
        const { data } = await supabase.auth.getSession();

        if (data.session?.user) {
          const supabaseUser = data.session.user as IUser;
          setUser(supabaseUser);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const supabaseUser = session.user as IUser;
          setUser(supabaseUser);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        toast({
          variant: 'destructive',
          title: 'Login falhou',
          description: error.message,
        });
        return false;
      }

      if (data.user) {
        toast({
          title: 'Login bem sucedido',
          description: 'Bem-vindo de volta!',
        });
        return true;
      }

      return false;
    } catch (error: any) {
      console.error('Unexpected login error:', error);
      toast({
        variant: 'destructive',
        title: 'Erro no login',
        description: error.message || 'Ocorreu um erro inesperado',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        variant: 'destructive',
        title: 'Erro ao sair',
        description: error.message || 'Não foi possível efetuar logout',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (
    email: string,
    password: string,
    name: string
  ) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      if (data.user) {
        return {
          success: true,
          message:
            'Conta criada com sucesso! Por favor, verifique seu email para confirmação.',
        };
      }

      return {
        success: false,
        message: 'Não foi possível criar a conta. Tente novamente.',
      };
    } catch (error: any) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: error.message || 'Ocorreu um erro ao criar a conta',
      };
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (
    email: string,
    name: string,
    phone: string
  ) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        email,
        phone,
        data: { name },
      });

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      if (data.user) {
        return {
          success: true,
          message: 'Conta atualizado com sucesso!',
        };
      }

      return {
        success: false,
        message: 'Não foi possível atualizar a conta. Tente novamente.',
      };
    } catch (error: any) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: error.message || 'Ocorreu um erro ao criar a conta',
      };
    }
  };

  const handlePasswordUpdateUser = async (
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        password: currentPassword,
        email: user.email,
      });

      console.log('loginError ', loginError);

      if (loginError) {
        return {
          success: false,
          message: 'Senha atual incorreta.',
        };
      }

      const { data, error } = await supabase.auth.updateUser({
        password: currentPassword,
      });

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      if (data.user) {
        return {
          success: true,
          message: 'Senha atualizado com sucesso!',
        };
      }

      return {
        success: false,
        message: 'Não foi possível atualizar a senha. Tente novamente.',
      };
    } catch (error: any) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: error.message || 'Ocorreu um erro ao criar a senha',
      };
    }
  };

  const requestPasswordReset = async (email: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/verify-otp?email=${email}`,
      });
      console.log('error ', error);

      if (error) {
        return {
          success: false,
          variant: 'destructive' as 'destructive',
          title: 'Login failed',
          description: 'Invalid email or password. Please try again.',
        };
      }

      return {
        success: true,
        variant: 'default' as 'default',
        title: 'Código successful',
        description: 'Email com instruções de recuperação enviado com sucesso!',
      };
    } catch (error: any) {
      console.error('Password reset request error:', error);
      return {
        success: false,
        variant: 'destructive' as 'destructive',
        title: 'Erro ao solicitar',
        description: error.message || 'Erro ao solicitar recuperação de senha',
      };
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (email: string, token: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'recovery',
      });

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      if (data.user) {
        return {
          success: true,
          message: 'Verificação bem-sucedida!',
        };
      }

      return {
        success: false,
        message: 'Não foi possível verificar o código. Tente novamente.',
      };
    } catch (error: any) {
      console.error('OTP verification error:', error);
      return {
        success: false,
        message: error.message || 'Erro ao verificar o código',
      };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: true,
        message: 'Senha alterada com sucesso!',
      };
    } catch (error: any) {
      console.error('Password reset error:', error);
      return {
        success: false,
        message: error.message || 'Erro ao atualizar senha',
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        handleLogout,
        handleSignUp,
        handleUpdateUser,
        handlePasswordUpdateUser,
        requestPasswordReset,
        verifyOTP,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
