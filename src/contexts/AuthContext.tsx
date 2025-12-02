import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  setUserRole: (role: UserRole) => void;
  login: (phone: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [pendingPhone, setPendingPhone] = useState<string>('');

  const login = async (phone: string) => {
    // Simulate OTP send
    setPendingPhone(phone);
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const verifyOtp = async (otp: string): Promise<boolean> => {
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 500));
    if (otp === '123456' || otp.length === 6) {
      const mockUser: User = {
        id: '1',
        name: userRole === 'agent' ? 'John Agent' : 'Jane Homeowner',
        email: 'user@example.com',
        phone: pendingPhone,
        role: userRole || 'homeowner',
      };
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        userRole,
        setUserRole,
        login,
        verifyOtp,
        logout,
      }}
    >
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
