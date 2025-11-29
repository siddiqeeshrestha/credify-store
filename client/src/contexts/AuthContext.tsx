import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/lib/api';

interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'admin';
  name: string; // Computed from firstName + lastName or username
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (data: { username: string; email: string; password: string; firstName?: string; lastName?: string; phone?: string }) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  const isAuthenticated = !!user;

  // Helper function to transform API user to our User interface
  const transformUser = (apiUser: any): User => {
    return {
      id: apiUser.id,
      username: apiUser.username,
      email: apiUser.email,
      firstName: apiUser.firstName,
      lastName: apiUser.lastName,
      phone: apiUser.phone,
      avatar: apiUser.avatar,
      role: apiUser.role,
      name: apiUser.firstName && apiUser.lastName 
        ? `${apiUser.firstName} ${apiUser.lastName}`
        : apiUser.username
    };
  };

  // Helper to save user to localStorage
  const saveUserToStorage = (user: User) => {
    try {
      localStorage.setItem('authUser', JSON.stringify(user));
    } catch (error) {
      console.warn('Failed to save user to localStorage:', error);
    }
  };

  // Helper to load user from localStorage
  const loadUserFromStorage = (): User | null => {
    try {
      const saved = localStorage.getItem('authUser');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.warn('Failed to load user from localStorage:', error);
      return null;
    }
  };

  // Helper to clear user from localStorage
  const clearUserFromStorage = () => {
    try {
      localStorage.removeItem('authUser');
    } catch (error) {
      console.warn('Failed to clear user from localStorage:', error);
    }
  };

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authApi.me();
        const transformedUser = transformUser(response.user);
        setUser(transformedUser);
        saveUserToStorage(transformedUser);
      } catch (error) {
        // Only clear user if it's a real authentication error (401)
        // Don't clear user for network errors, server errors, etc.
        if (error instanceof Error && (
          error.message.includes('authenticated') || 
          error.message.includes('401') ||
          error.message.includes('Unauthorized')
        )) {
          setUser(null);
          clearUserFromStorage();
        } else {
          console.warn('Auth check failed, trying localStorage fallback:', error);
          // For network/server errors, try to load from localStorage
          const savedUser = loadUserFromStorage();
          if (savedUser) {
            setUser(savedUser);
            console.log('Loaded user from localStorage as fallback');
          } else {
            setUser(null);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Periodic session validation (every 5 minutes)
  useEffect(() => {
    if (!isAuthenticated) return;

    const validateSession = async () => {
      try {
        await authApi.me();
      } catch (error) {
        if (error instanceof Error && (
          error.message.includes('authenticated') || 
          error.message.includes('401') ||
          error.message.includes('Unauthorized')
        )) {
          console.log('Session expired, logging out');
          setUser(null);
          clearUserFromStorage();
        }
      }
    };

    // Validate session every 5 minutes
    const interval = setInterval(validateSession, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const login = async (username: string, password: string) => {
    try {
      const response = await authApi.login({ username, password });
      const transformedUser = transformUser(response.user);
      setUser(transformedUser);
      saveUserToStorage(transformedUser);
      // Invalidate relevant React Query caches
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: { username: string; email: string; password: string; firstName?: string; lastName?: string; phone?: string }) => {
    try {
      const response = await authApi.register(data);
      const transformedUser = transformUser(response.user);
      setUser(transformedUser);
      saveUserToStorage(transformedUser);
      // Invalidate relevant React Query caches
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      clearUserFromStorage();
      // Clear all React Query caches on logout
      queryClient.clear();
    }
  };

  const refreshUser = async () => {
    try {
      const response = await authApi.me();
      const transformedUser = transformUser(response.user);
      setUser(transformedUser);
      saveUserToStorage(transformedUser);
    } catch (error) {
      // If refresh fails, check if it's an auth error
      if (error instanceof Error && (
        error.message.includes('authenticated') || 
        error.message.includes('401') ||
        error.message.includes('Unauthorized')
      )) {
        setUser(null);
        clearUserFromStorage();
      } else {
        console.warn('User refresh failed, keeping current state:', error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};