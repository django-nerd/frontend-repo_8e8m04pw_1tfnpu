import { useEffect, useMemo, useState } from 'react'
import { Api } from '../lib/api'
import ProductCard from './ProductCard'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // cart state
  const [cartId, setCartId] = useState(localStorage.getItem('cart_id') || '')
  const [cart, setCart] = useState({ items: [], total: 0 })

  // filters state
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sort, setSort] = useState('')

  useEffect(() => {
    if (!cartId) {
      Api.startCart().then((r) => {
        setCartId(r.cart_id)
        localStorage.setItem('cart_id', r.cart_id)
      }).catch(()=>{})
    } else {
      refreshCart(cartId)
    }
  }, [])

  useEffect(() => {
    load()
  }, [category, ingredient, sort, minPrice, maxPrice])

  async function load() {
    try {
      setLoading(true)
      const data = await Api.listProducts({
        category: category || undefined,
        ingredient: ingredient || undefined,
        min_price: minPrice || undefined,
        max_price: maxPrice || undefined,
        sort: sort || undefined,
        q: q || undefined,
      })
      setProducts(data)
      setError('')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function refreshCart(id){
    try {
      const c = await Api.getCart(id)
      setCart(c)
    } catch (e) {
      // ignore
    }
  }

  const categories = ['Face Care', 'Hair Care', 'Body Care']
  const ingredients = ['Sandalwood', 'Turmeric', 'Neem', 'Tulsi', 'Amla', 'Rose']

  const filtered = useMemo(() => {
    if (!q) return products
    const t = q.toLowerCase()
    return products.filter(p => p.name.toLowerCase().includes(t) || p.description.toLowerCase().includes(t))
  }, [products, q])

  async function addToCart(p) {
    if (!cartId) return
    try {
      await Api.addToCart({ cart_id: cartId, product_id: p.id, qty: 1 })
      await refreshCart(cartId)
    } catch (e) {
      alert('Failed to add to cart')
    }
  }

  async function handleCheckout(){
    if (!cartId) return
    try {
      const email = prompt('Enter email for order confirmation (optional)') || undefined
      const r = await Api.checkout({ cart_id: cartId, email })
      alert(`Order placed! ID: ${r.order_id || 'mock-order'}`)
      // reset cart
      localStorage.removeItem('cart_id')
      setCartId('')
      setCart({ items: [], total: 0 })
      const started = await Api.startCart()
      setCartId(started.cart_id)
      localStorage.setItem('cart_id', started.cart_id)
    } catch (e) {
      alert(e.message || 'Checkout failed')
    }
  }

  return (
    <section id="products" className="bg-[#fffaf4]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-serif text-emerald-900">Explore Products</h2>
            <p className="text-emerald-800/70 mt-1">Filter by category, ingredient, and price. Sort to find your perfect match.</p>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <input value={q} onChange={e=>setQ(e.target.value)} onBlur={load} placeholder="Search..." className="px-3 py-2 border border-emerald-200 rounded-lg bg-white/80"/>
            <select value={category} onChange={e=>setCategory(e.target.value)} className="px-3 py-2 border border-emerald-200 rounded-lg bg-white/80">
              <option value="">All Categories</option>
              {categories.map(c=> <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={ingredient} onChange={e=>setIngredient(e.target.value)} className="px-3 py-2 border border-emerald-200 rounded-lg bg-white/80">
              <option value="">Any Ingredient</option>
              {ingredients.map(i=> <option key={i} value={i}>{i}</option>)}
            </select>
            <input type="number" min="0" step="0.5" value={minPrice} onChange={e=>setMinPrice(e.target.value)} placeholder="Min $" className="w-24 px-3 py-2 border border-emerald-200 rounded-lg bg-white/80"/>
            <input type="number" min="0" step="0.5" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} placeholder="Max $" className="w-24 px-3 py-2 border border-emerald-200 rounded-lg bg-white/80"/>
            <select value={sort} onChange={e=>setSort(e.target.value)} className="px-3 py-2 border border-emerald-200 rounded-lg bg-white/80">
              <option value="">Sort</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A-Z</option>
              <option value="name_desc">Name: Z-A</option>
              <option value="popularity">Popularity</option>
              <option value="rating">Rating</option>
            </select>
            <button onClick={load} className="px-4 py-2 bg-emerald-700 text-white rounded-lg">Apply</button>
          </div>
        </div>

        {/* Cart bar */}
        <div className="mt-6 p-4 bg-white/70 border border-emerald-100 rounded-xl flex items-center justify-between">
          <div className="text-emerald-900/90">Items: {cart.items.length} • Total: ${cart.total?.toFixed?.(2) ?? cart.total}</div>
          <div className="flex gap-2">
            <button onClick={()=>refreshCart(cartId)} className="px-3 py-2 rounded-lg border border-emerald-200">Refresh</button>
            <button onClick={handleCheckout} className="px-3 py-2 rounded-lg bg-emerald-700 text-white">Checkout</button>
          </div>
        </div>

        {loading ? (
          <p className="mt-10 text-emerald-800">Loading products...</p>
        ) : error ? (
          <p className="mt-10 text-red-600">{error}</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
