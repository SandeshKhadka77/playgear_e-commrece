import React, { useState } from 'react';
import { products } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import '../styles/ProductsPage.css';

const Products = () => {
  const [filter, setFilter] = useState('All');

  // Logic to filter products based on the selected category
  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(item => item.category === filter);

  return (
    <div className="products-page">
      <div className="category-header">
        <h2>Explore Gear</h2>
        {/* Filter Buttons */}
        <div className="filter-bar">
          {['All', 'Sports', 'Gym', 'Gaming'].map((cat) => (
            <button 
              key={cat} 
              className={filter === cat ? 'active' : ''}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      <div className="products-grid">
        {filteredProducts.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;