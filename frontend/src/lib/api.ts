const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
interface FetchOptions extends RequestInit {
  token?: string;
}

async function fetchApi(endpoint: string, options: FetchOptions = {}) {
  const { token, ...fetchOpts } = options;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((fetchOpts.headers as Record<string, string>) || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOpts,
    headers,
    credentials: 'include',
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `Request failed with status ${res.status}`);
  return data;
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export function setToken(token: string) { localStorage.setItem('token', token); }
export function removeToken() { localStorage.removeItem('token'); }

export const authApi = {
  register: (body: { email: string; username: string; password: string; referralCode?: string }) => fetchApi('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body: { email: string; password: string }) => fetchApi('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  verify2FA: (body: { userId: string; code: string }) => fetchApi('/auth/verify-2fa', { method: 'POST', body: JSON.stringify(body) }),
  getMe: (token: string) => fetchApi('/auth/me', { token }),
  logout: (token: string) => fetchApi('/auth/logout', { method: 'POST', token }),
};

export const userApi = {
  getDashboard: (token: string) => fetchApi('/user/dashboard', { token }),
};

// Convenience api object
export const api = {
  get: (endpoint: string) => fetchApi(endpoint),
  post: (endpoint: string, body: any) => fetchApi(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint: string, body: any) => fetchApi(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  patch: (endpoint: string, body: any) => fetchApi(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (endpoint: string) => fetchApi(endpoint, { method: 'DELETE' }),
};

export default fetchApi;
