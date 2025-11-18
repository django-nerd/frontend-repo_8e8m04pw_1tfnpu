export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-2xl bg-white/70 backdrop-blur border border-emerald-100 shadow-sm hover:shadow-lg transition overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-emerald-900 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-emerald-800/70 line-clamp-2 mt-1">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-emerald-900">${product.price.toFixed(2)}</span>
          <button onClick={() => onAdd(product)} className="px-3 py-1.5 rounded-full bg-emerald-700 text-white text-sm hover:bg-emerald-800">Add</button>
        </div>
      </div>
    </div>
  )
}
