const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchApi(endpoint: string, opts: any = {}) {
  const headers: any = { 'Content-Type': 'application/json', ...opts.headers };
  if (opts.token) headers['Authorization'] = 'Bearer ' + opts.token;
  const res = await fetch(API_BASE + endpoint, { ...opts, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const api = {
  get: (e: string, t?: string | null) => fetchApi(e, { token: t || undefined }),
  post: (e: string, b: any, t?: string | null) => fetchApi(e, { method: 'POST', body: JSON.stringify(b), token: t || undefined }),
  patch: (e: string, b: any, t?: string | null) => fetchApi(e, { method: 'PATCH', body: JSON.stringify(b), token: t || undefined }),
};

export function getToken() { return typeof window !== 'undefined' ? localStorage.getItem('token') : null; }
export function setToken(t: string) { localStorage.setItem('token', t); }
export function removeToken() { localStorage.removeItem('token'); }

export const authApi = {
  login: (b: any) => fetchApi('/auth/login', { method: 'POST', body: JSON.stringify(b) }),
  register: (b: any) => fetchApi('/auth/register', { method: 'POST', body: JSON.stringify(b) }),
  getMe: (t: string) => fetchApi('/auth/me', { token: t }),
};