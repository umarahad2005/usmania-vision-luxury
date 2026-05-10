import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

type AuthCtx = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  setAuth: (user: AuthUser, token: string) => void;
  signOut: () => void;
};

const Ctx = createContext<AuthCtx>({
  user: null,
  token: null,
  loading: true,
  setAuth: () => {},
  signOut: () => {},
});

const USER_KEY = 'usm_user';
const TOKEN_KEY = 'usm_token';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_KEY);
      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  const setAuth = (newUser: AuthUser, newToken: string) => {
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    localStorage.setItem(TOKEN_KEY, newToken);
    setUser(newUser);
    setToken(newToken);
  };

  const signOut = () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setToken(null);
  };

  return (
    <Ctx.Provider value={{ user, token, loading, setAuth, signOut }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
