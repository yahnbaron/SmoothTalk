import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'expo-router';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const login = () => setIsAuthenticated(true);
  
  const logout = () => {
    setIsAuthenticated(false);
    router.replace('/auth');
  };

  const signOut = async () => {
    try {
      // Implement your signOut logic here
      // For example, if using Firebase:
      // await auth.signOut();
      logout();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}