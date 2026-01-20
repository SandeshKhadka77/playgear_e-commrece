import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart'; // Imported the useCart hook
import '../styles/ProductCard.css'; 

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // Get the addToCart function

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
      
      {/*  button section */}
      <div className="card-actions">
        <button 
          className="add-to-cart-btn" 
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;