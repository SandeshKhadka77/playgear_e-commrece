import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductCard.css'; 

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={product.image} alt={product.name} />
        <div className="product-info">
          <span className="category">{product.category}</span>
          <h3>{product.name}</h3>
          <p className="price">Rs. {product.price}</p>
        </div>
      </Link>
    </div>
  );
};

// export the component!
export default ProductCard;