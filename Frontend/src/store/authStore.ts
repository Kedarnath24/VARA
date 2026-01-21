import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/utils/api';
import type { User, LoginData, RegisterData, AuthResponse } from '@/types/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData, files: FormData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (data: LoginData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post<AuthResponse>('/auth/login', data);
          const { user, token } = response.data.data!;
          
          localStorage.setItem('token', token);
          set({ user, token, isLoading: false });
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Login failed';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      register: async (data: RegisterData, files: FormData) => {
        set({ isLoading: true, error: null });
        try {
          // Append form data
          Object.entries(data).forEach(([key, value]) => {
            if (value) files.append(key, value);
          });

          const response = await api.post<AuthResponse>('/auth/register', files, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          
          const { user, token } = response.data.data!;
          localStorage.setItem('token', token);
          set({ user, token, isLoading: false });
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Registration failed';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
