import apiClient from './apiClient';

// Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  user?: any;
  message?: string;
}

export const authService = {
  // Login
  postLogin: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
      return {
        success: false,
        message: 'Network error. Please check your connection.',
      };
    }
  },

  // Register
  register: async (data: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post('/auth/register', data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
      return {
        success: false,
        message: 'Network error. Please check your connection.',
      };
    }
  },

  // Request password reset
  requestPasswordReset: async (email: string): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post('/auth/request-password-reset', { email });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
      return {
        success: false,
        message: 'Network error. Please check your connection.',
      };
    }
  },

  // Reset password (with token validation)
  resetPassword: async (token: string, newPassword: string): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post('/auth/reset-password', { token, password: newPassword });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
      return {
        success: false,
        message: 'Network error. Please check your connection.',
      };
    }
  },

  // Logout
  logout: async (): Promise<AuthResponse> => {
    try {
      const response = await apiClient.get('/auth/logout');
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
      return {
        success: false,
        message: 'Network error. Please check your connection.',
      };
    }
  }
};
