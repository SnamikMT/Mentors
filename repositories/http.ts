// repositories/http.ts
export function useApi() {
  // если у тебя nuxt и есть runtimeConfig — можно взять оттуда
  const base = '/api'

  async function get<T>(url: string, query?: Record<string, any>): Promise<T> {
    const params = query ? '?' + new URLSearchParams(query as any).toString() : ''
    const res = await $fetch<T>(base + url + params)
    return res
  }

  async function post<T>(url: string, body?: any): Promise<T> {
    const res = await $fetch<T>(base + url, {
      method: 'POST',
      body,
    })
    return res
  }

  return { get, post }
}
