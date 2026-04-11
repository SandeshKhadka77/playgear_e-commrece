import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard'; 
import { FiArrowRight, FiCpu, FiShield, FiTarget, FiTrendingUp, FiTruck } from 'react-icons/fi';
import '../styles/homepage.css';
import { products as fallbackProducts } from '../data/products';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(Array.isArray(data) ? data.slice(0, 8) : []);
      } catch {
        setProducts(fallbackProducts.map((item) => ({ ...item, _id: item.id })));
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const featuredItems = useMemo(() => products.slice(0, 4), [products]);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content page-wrap">
          <p className="hero-tag">Your next-level sports and gaming store</p>
          <h1>Gear Up For Real Performance</h1>
          <p>
            Discover premium gaming setups, elite fitness tools, and sports essentials built for daily grind and match day.
          </p>
          <div className="hero-cta-row">
            <Link className="hero-cta" to="/products">
              Shop New Arrivals
              <FiArrowRight />
            </Link>
            <Link className="hero-cta ghost" to="/products">
              Explore Collections
            </Link>
          </div>
        </div>
      </section>

      <section className="trust-strip page-wrap">
        <div><FiTruck /><span>Fast Dispatch</span></div>
        <div><FiShield /><span>Quality Checked</span></div>
        <div><FiTrendingUp /><span>Performance First</span></div>
      </section>

      <section className="quick-links page-wrap">
        <div className="quick-card">
          <FiCpu />
          <h3>Gaming</h3>
          <p>Mouse, keyboard, console and pro accessories.</p>
        </div>
        <div className="quick-card">
          <FiTarget />
          <h3>Sports</h3>
          <p>Cricket, football, athletics and team essentials.</p>
        </div>
        <div className="quick-card">
          <FiTrendingUp />
          <h3>Fitness</h3>
          <p>Strength, mobility and home gym collection.</p>
        </div>
      </section>

      <section className="featured-section page-wrap">
        <div className="section-head">
          <h2>Featured Gear</h2>
          <p>Selected products trusted by competitors and creators.</p>
        </div>
        <div className="featured-grid">
          {loading && <p className="home-loading">Loading featured products...</p>}
          {!loading && featuredItems.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="home-cta-band page-wrap">
        <div>
          <h3>Need a complete setup?</h3>
          <p>Build your gaming, fitness, or sports kit in one place with curated bundles.</p>
        </div>
        <Link className="home-cta-btn" to="/products">Start Building</Link>
      </section>
    </div>
  );
};

export default HomePage;