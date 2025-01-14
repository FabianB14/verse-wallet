import { useState } from 'react';
import { verseApi, LoginCredentials, User } from '../services/verseApi';
import { useWalletStore } from '../store/useWalletStore';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address } = useWalletStore();

  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<User | null> => {
    try {
      setIsLoading(true);
      setError(null);

      if (!address) {
        throw new Error('Wallet not connected');
      }

      const response = await verseApi.registerUser({
        username,
        email,
        password,
        walletAddress: address ?? ''
      });

      localStorage.setItem('verse_user', JSON.stringify(response.user));
      return response.user;

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const credentials: LoginCredentials = {
        email,
        password,
        walletAddress: address ?? undefined
      };

      const response = await verseApi.loginUser(credentials);
      localStorage.setItem('verse_user', JSON.stringify(response.user));
      return response.user;

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('verse_user');
  };

  const getCurrentUser = (): User | null => {
    const userStr = localStorage.getItem('verse_user');
    return userStr ? JSON.parse(userStr) : null;
  };

  return {
    register,
    login,
    logout,
    getCurrentUser,
    isLoading,
    error
  };
}