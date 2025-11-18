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

export async function postJSON(path, body = {}) {
  const url = new URL(path, BASE_URL)
  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json()
}

export const Api = {
  listProducts: (filters = {}) => fetchJSON('/api/products', filters),
  getProduct: (id) => fetchJSON(`/api/products/${id}`),
  startCart: () => postJSON('/api/cart/start'),
  addToCart: ({ cart_id, product_id, qty = 1 }) => postJSON('/api/cart/add', { cart_id, product_id, qty }),
  getCart: (cart_id) => fetchJSON(`/api/cart/${cart_id}`),
  checkout: ({ cart_id, email }) => postJSON('/api/checkout', { cart_id, email })
}
