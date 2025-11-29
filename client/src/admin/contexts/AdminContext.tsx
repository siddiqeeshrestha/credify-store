import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { authApi } from '../../lib/api';

interface Admin {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

interface AdminContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!admin;

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authApi.me();
        if (response.user && response.user.role === 'admin') {
          setAdmin({
            id: response.user.id,
            email: response.user.email,
            name: `${response.user.firstName} ${response.user.lastName}`,
            role: 'admin'
          });
        }
      } catch (error) {
        console.log('Not authenticated or not admin');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ username: email, password });
      if (response.user && response.user.role === 'admin') {
        setAdmin({
          id: response.user.id,
          email: response.user.email,
          name: `${response.user.firstName} ${response.user.lastName}`,
          role: 'admin'
        });
      } else {
        throw new Error('Admin access required');
      }
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
      setAdmin(null);
    }
  };

  return (
    <AdminContext.Provider value={{ admin, isAuthenticated, login, logout, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
};