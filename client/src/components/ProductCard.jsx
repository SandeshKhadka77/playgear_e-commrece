import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 group">
      <Link to={`/product/${product._id}`}>
        <div className="relative overflow-hidden aspect-square">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <span className="absolute top-2 left-2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
            {product.category}
          </span>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-bold text-slate-800 truncate hover:text-orange-500 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center mt-1 mb-2">
          <span className="text-yellow-400 text-sm">★ ★ ★ ★ ☆</span>
          <span className="text-gray-400 text-xs ml-2">({product.rating})</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-extrabold text-slate-900">Rs. {product.price.toLocaleString()}</span>
          <button className="bg-slate-100 hover:bg-orange-500 hover:text-white p-2 rounded-lg transition-colors">
            🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;