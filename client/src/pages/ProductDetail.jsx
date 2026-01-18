import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products.js';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  // Find product by matching the URL ID with the product ID in our data
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Product Not Found</h2>;

  return (
    <div className="product-detail-container">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-specs">
        <span className="category-tag">{product.category}</span>
        <h1>{product.name}</h1>
        <p className="description">{product.description}</p>
        <h2 className="price">Rs. {product.price}</h2>
        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;