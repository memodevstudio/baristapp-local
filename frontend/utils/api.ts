// frontend/utils/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:3001';

export async function authFetch(
  path: string,
  init?: RequestInit
): Promise<Response> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = new Headers(init?.headers || {});
  if (token) headers.set('Authorization', `Bearer ${token}`);
  // Solo setea JSON si vas a enviar body
  if (init?.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  try {
    const res = await fetch(`${API_BASE}${path}`, { ...init, headers });

    if (res.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return res;
  } catch (e) {
    // Error de red (servidor caído, CORS, etc.)
    if (typeof window !== 'undefined') {
      console.error('authFetch error:', e);
      window.location.href = '/login';
    }
    throw e;
  }
}

// Azúcar sintáctica para JSON
export async function authJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await authFetch(path, init);
  if (!res.ok) {
    // Puedes lanzar un error con info del backend
    const msg = await safeText(res);
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

async function safeText(res: Response) {
  try { return await res.text(); } catch { return ''; }
}
