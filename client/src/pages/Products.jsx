import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import '../styles/ProductsPage.css'; 

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError('Unable to load products right now. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="loader">Loading PlayGear Store...</div>;
  if (error) return <div className="loader error">{error}</div>;

  return (
    <div className="shop-container">
      <div className="shop-head">
        <h2 className="shop-title">Premium Gear</h2>
        <p>Hand-picked products for gaming, sports, and fitness enthusiasts.</p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;