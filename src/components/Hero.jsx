import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fde6d8]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="uppercase tracking-widest text-amber-700/80 text-sm mb-3">Pure • Natural • Ayurvedic</p>
          <h1 className="text-4xl md:text-6xl font-serif text-emerald-900 leading-tight">
            Discover Pure Ayurvedic Skincare
          </h1>
          <p className="mt-5 text-emerald-800/80 max-w-md">
            Handcrafted blends of ancient herbs and botanicals for glowing, balanced skin. Sustainably sourced and crafted with care.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="#products" className="inline-block bg-emerald-700 text-white px-6 py-3 rounded-full shadow hover:bg-emerald-800 transition">Shop Bestsellers</a>
            <a href="#philosophy" className="inline-block bg-white text-emerald-800 px-6 py-3 rounded-full shadow border border-emerald-200 hover:bg-emerald-50 transition">Our Philosophy</a>
          </div>
        </div>
        <div className="relative h-[380px] md:h-[520px] rounded-2xl shadow-xl">
          <Spline scene="https://prod.spline.design/c1w2QYixcPkptHWE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fde6d8] opacity-70" />
    </section>
  )
}
