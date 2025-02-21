import type { ReactNode } from 'react';

import { useMemo, useState, useEffect, useCallback, createContext } from 'react';

interface User {
  id: string;
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<string | void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<string | void> => {
      try {
        const response = await fetch(`${import.meta.env.VITE_STOCK_API_URL}/authenticate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Login failed:', errorData);
          return errorData.message || 'Invalid credentials';
        }

        const data: User = await response.json();
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
      } catch (error) {
        console.error('Login failed:', error);
        return 'Network error. Please try again later.';
      }
      return '';
    },
    [setUser]
  );

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const memoizedValue = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
