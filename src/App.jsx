import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import ProductList from './components/ProductList'

function App() {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem('cart_id')
    if (stored) updateCartCount(stored)
    const i = setInterval(()=>{
      const id = localStorage.getItem('cart_id')
      if (id) updateCartCount(id)
    }, 4000)
    return ()=> clearInterval(i)
  }, [])

  async function updateCartCount(id){
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/cart/${id}`)
      if (res.ok) {
        const data = await res.json()
        setCartCount(data.items?.length || 0)
      }
    } catch {}
  }

  return (
    <div className="min-h-screen bg-[#fde6d8]">
      <header className="sticky top-0 z-10 backdrop-blur bg-[#fde6d8]/70 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-emerald-700 inline-block" />
            <span className="font-serif text-xl text-emerald-900">AyurVeda Beauty</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-emerald-900/80">
            <a href="#products" className="hover:text-emerald-900">Shop</a>
            <a href="#philosophy" className="hover:text-emerald-900">Philosophy</a>
            <a href="/test" className="hover:text-emerald-900">API Test</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="px-3 py-1.5 rounded-full border border-emerald-200 text-emerald-900/80">Login</button>
            <button className="px-3 py-1.5 rounded-full bg-emerald-700 text-white">Cart ({cartCount})</button>
          </div>
        </div>
      </header>

      <main>
        <Hero />
        <section id="philosophy" className="bg-[#fffaf4]">
          <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl md:text-3xl font-serif text-emerald-900">Rooted in Ayurveda</h2>
              <p className="mt-3 text-emerald-800/80">Our formulas honor ancient wisdom with modern safety. We source herbs ethically and craft small batches to preserve potency and purity.</p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-4 text-emerald-900/90">
                <li className="p-4 bg-white/70 border border-emerald-100 rounded-xl">Sulfate & Paraben Free</li>
                <li className="p-4 bg-white/70 border border-emerald-100 rounded-xl">Cruelty Free</li>
                <li className="p-4 bg-white/70 border border-emerald-100 rounded-xl">Sustainably Sourced</li>
                <li className="p-4 bg-white/70 border border-emerald-100 rounded-xl">Dermatologically Tested</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-[url('https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjM0MTE5NzJ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center min-h-[240px]" />
          </div>
        </section>
        <ProductList />
      </main>

      <footer className="bg-emerald-900 text-emerald-50">
        <div className="max-w-7xl mx-auto px-6 py-10 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h4 className="font-semibold mb-2">AyurVeda Beauty</h4>
            <p className="text-emerald-100/70">Pure, natural, and effective Ayurvedic skincare.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Shop</h4>
            <ul className="space-y-1 text-emerald-100/80">
              <li><a href="#products" className="hover:underline">Face Care</a></li>
              <li><a href="#products" className="hover:underline">Hair Care</a></li>
              <li><a href="#products" className="hover:underline">Body Care</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Support</h4>
            <ul className="space-y-1 text-emerald-100/80">
              <li><button className="hover:underline">Contact</button></li>
              <li><button className="hover:underline">Shipping</button></li>
              <li><button className="hover:underline">Returns</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Newsletter</h4>
            <p className="text-emerald-100/70 mb-2">Join for tips and special offers.</p>
            <div className="flex gap-2">
              <input placeholder="Email" className="px-3 py-2 rounded bg-emerald-800/40 border border-emerald-700 text-emerald-50 placeholder-emerald-200/60 flex-1" />
              <button className="px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-500">Join</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
