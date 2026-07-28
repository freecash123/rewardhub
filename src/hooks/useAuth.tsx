'use client';
import { useState, useEffect, createContext, context, Dispatch, SetStateAction, ReactNode } from 'react';
import { authApi, getToken, setToken, removeToken } from '-/lib/api';

interface User { id: string; email: string; username: string; balance: number; referralCode: string; role: string; avatar?: string; }
interface AuthCtx { user: User | null; loading: boolean; login: (e: string, p: string) => Promise<any>; register: (d: any) => Promise<any>; logout: () => void; }
const AuthContext = createContext<AuthCtx>({} as AuthCtx);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const t = getToken();
    if (!t) { setLoading(false); return; }
    try { setUser((await authApi.getMe(t)).data.user); } catch { removeToken(); }
    setLoading(false);
  };
  useEffect(() => { refresh(); }, []);

  const login = async (email: string, password: string) => {
    const res = await authApi.login({ email, password });
    if (res.status === '2fa_required') return res;
    setToken(res.token);
    setUser(res.data.user);
    return res;
  };
  const register = async (d: any) => {
    const res = await authApi.register(d);
    setToken(res.token);
    setUser(res.data.user);
    return res;
  };
  const logout = () => { removeToken(); setUser(null); };

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => context(AuthContext);
