import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';

const ProductsView = ({ products, setProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStatus = (id) => {
    const updated = products.map(p => p.id === id ? { ...p, active: !p.active } : p);
    setProducts(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">Insurance Products</h2>
          <p className="text-sm text-slate-600 mt-1">Manage plans, features, and visibility</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-grow sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-teal-500 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm shadow-lg transition-all">
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(p => (
          <div key={p.id} className={`bg-white border rounded-[2rem] p-6 transition-all ${p.active ? 'border-white shadow-sm' : 'border-slate-200 opacity-75 grayscale-[0.2]'}`}>
            <div className="flex justify-between items-start mb-4">
              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                {p.type}
              </span>
              <button onClick={() => toggleStatus(p.id)} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-colors ${p.active ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}>
                {p.active ? <><Eye size={12}/> Visible</> : <><EyeOff size={12}/> Hidden</>}
              </button>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 mb-2">{p.name}</h3>
            <p className="text-sm text-slate-500 mb-6 min-h-[40px]">{p.description}</p>

            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all">
                <Edit2 size={14} /> Edit
              </button>
              <button className="p-2 border border-slate-200 text-red-500 hover:bg-red-50 rounded-xl transition-all">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">No products found.</div>
        )}
      </div>
    </div>
  );
};

export default ProductsView;
