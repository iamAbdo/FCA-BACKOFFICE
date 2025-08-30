import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AUTH_KEY = 'fca_auth_user';
const AUTH_EXP_KEY = 'fca_auth_exp';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getStoredUser(): User | null {
  const userStr = localStorage.getItem(AUTH_KEY);
  const expStr = localStorage.getItem(AUTH_EXP_KEY);
  if (!userStr || !expStr) return null;
  const exp = parseInt(expStr, 10);
  if (Date.now() > exp) {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_EXP_KEY);
    return null;
  }
  try {
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Sync user state with localStorage on mount
    setUser(getStoredUser());
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulation d'authentification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'admin@future-clim.dz' && password === 'admin123') {
        const loggedUser = {
          id: '1',
          email: 'admin@future-clim.dz',
          name: 'Ahmed Benali',
          role: 'admin'
        };
        setUser(loggedUser);
        localStorage.setItem(AUTH_KEY, JSON.stringify(loggedUser));
        localStorage.setItem(AUTH_EXP_KEY, (Date.now() + 60 * 60 * 1000).toString()); // 1 hour
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_EXP_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}