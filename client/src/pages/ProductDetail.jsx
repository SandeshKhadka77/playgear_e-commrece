import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiCheckCircle, FiShoppingBag } from 'react-icons/fi';
import { products } from '../data/products.js';
import { useCart } from '../hooks/useCart';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
      } catch {
        const localProduct = products.find((p) => String(p.id) === String(id));
        setProduct(localProduct || null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="product-detail-state">Loading product details...</div>;

  if (!product) return <div className="product-detail-state">Product not found.</div>;

  return (
    <div className="product-detail-shell">
      <div className="product-detail-container">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-specs">
          <span className="category-tag">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="description">
            {product.description || 'Performance-tested gear built for comfort, consistency, and long sessions.'}
          </p>
          <h2 className="price">Rs. {Number(product.price || 0).toLocaleString()}</h2>
          <button className="add-to-cart-btn" type="button" onClick={() => addToCart(product)}>
            <FiShoppingBag />
            <span>Add to Cart</span>
          </button>
          <ul className="detail-benefits">
            <li><FiCheckCircle /> Fast delivery inside Nepal</li>
            <li><FiCheckCircle /> Quality-checked before shipping</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;