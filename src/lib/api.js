const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export async function fetchJSON(path, params = {}) {
  const url = new URL(path, BASE_URL)
  if (params && Object.keys(params).length) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v)
    })
  }
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json()
}

export const Api = {
  listProducts: (filters = {}) => fetchJSON('/api/products', filters),
  getProduct: (id) => fetchJSON(`/api/products/${id}`),
}
