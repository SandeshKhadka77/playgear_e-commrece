import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{product.name}</h3>
      <p>Rs. {product.price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;