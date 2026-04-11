import React from 'react';
import ProductCard from '../components/ProductCard'; 
import { FiArrowRight, FiCpu, FiTarget, FiTrendingUp } from 'react-icons/fi';
import '../styles/homepage.css';

const HomePage = () => {
  const products = [
    { _id: 'p1', name: 'Logitech G Pro Wireless', price: 15500, category: 'Gaming', image: 'https://placehold.co/300x300?text=Gaming+Mouse', rating: 5 },
    { _id: 'p2', name: 'Adjustable Dumbbell Set (20kg)', price: 12000, category: 'Gym', image: 'https://placehold.co/300x300?text=Dumbbells', rating: 4.5 },
    { _id: 'p3', name: 'English Willow Cricket Bat', price: 25000, category: 'Sports', image: 'https://placehold.co/300x300?text=Cricket+Bat', rating: 5 },
    { _id: 'p4', name: 'Razer Kraken V3 Headset', price: 9500, category: 'Gaming', image: 'https://placehold.co/300x300?text=Headset', rating: 4 },
  ];

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content page-wrap">
          <p className="hero-tag">Nepal's next-level sports and gaming store</p>
          <h1>Gear Up For Real Performance</h1>
          <p>
            Discover premium gaming setups, elite fitness tools, and sports essentials built for daily grind and match day.
          </p>
          <button className="hero-cta" type="button">
            Shop New Arrivals
            <FiArrowRight />
          </button>
        </div>
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
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;