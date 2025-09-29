import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Admin {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'super_admin';
}

interface AdminContextType {
  admin: Admin | null;
  isAdminAuthenticated: boolean;
  adminLogin: (username: string, password: string) => Promise<void>;
  adminLogout: () => void;
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

  const isAdminAuthenticated = !!admin;

  const adminLogin = async (username: string, password: string) => {
    // Simulate API call - accept admin/admin for demo
    if (username === 'admin' && password === 'admin') {
      const mockAdmin: Admin = {
        id: '1',
        username: 'admin',
        email: 'admin@credifystore.com',
        role: 'super_admin',
      };
      
      setAdmin(mockAdmin);
      localStorage.setItem('admin', JSON.stringify(mockAdmin));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const adminLogout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
  };

  return (
    <AdminContext.Provider value={{ admin, isAdminAuthenticated, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
};