// composables/useApiClient.ts
export function useApiClient() {
  const baseURL = useRuntimeConfig().public.apiBase || '/api';
  const headers = { 'Content-Type': 'application/json' };

  async function get<T>(url: string, opts: RequestInit = {}): Promise<T> {
    const res = await fetch(baseURL + url, { ...opts, method: 'GET', headers });
    if (!res.ok) throw new Error(`GET ${url} ${res.status}`);
    return res.json() as Promise<T>;
  }

  async function post<T, B = unknown>(url: string, body: B, opts: RequestInit = {}): Promise<T> {
    const res = await fetch(baseURL + url, {
      ...opts, method: 'POST', headers, body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`POST ${url} ${res.status}`);
    return res.json() as Promise<T>;
  }

  async function patch<T, B = unknown>(url: string, body: B, opts: RequestInit = {}): Promise<T> {
    const res = await fetch(baseURL + url, {
      ...opts, method: 'PATCH', headers, body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`PATCH ${url} ${res.status}`);
    return res.json() as Promise<T>;
  }

  return { get, post, patch };
}
