import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Admin {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin';
}

interface AdminContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
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
  const [admin, setAdmin] = useState<Admin | null>(() => {
    // Check if admin is stored in localStorage
    const storedAdmin = localStorage.getItem('admin');
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  });

  const isAuthenticated = !!admin;

  const login = async (email: string, password: string) => {
    // Mock admin authentication - in real app, this would be an API call
    if (email.includes('@admin.') || password === 'admin123') {
      const mockAdmin: Admin = {
        id: '1',
        email: email,
        name: 'Admin User',
        role: 'super_admin',
      };
      
      setAdmin(mockAdmin);
      localStorage.setItem('admin', JSON.stringify(mockAdmin));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
  };

  return (
    <AdminContext.Provider value={{ admin, isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};