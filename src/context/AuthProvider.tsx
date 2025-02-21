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
  verify: (email: string) => Promise<string | void>;
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
        const response = await fetch(`${import.meta.env.VITE_EXPRESS_API_URL}/authenticate`, {
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

  const verify = useCallback(async (email: string): Promise<string | void> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_EXPRESS_API_URL}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return errorData.message || 'Invalid credentials';
      }

      const data = await response.json();
      window.location.href = data.magic_link;
    } catch (error) {
      console.error('User verification error:', error);
      return 'Network error. Please to verify user try again later.';
    }
    return '';
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const memoizedValue = useMemo(
    () => ({
      user,
      login,
      logout,
      verify,
    }),
    [user, login, logout, verify]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
