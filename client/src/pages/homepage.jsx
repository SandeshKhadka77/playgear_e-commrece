import React, { useEffect, useMemo, useState } from 'react';
import api from '../lib/apiClient';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import StateBlock from '../components/StateBlock';
import { FiActivity, FiArrowRight, FiChevronLeft, FiChevronRight, FiCpu, FiShield, FiTarget, FiTruck } from 'react-icons/fi';
import '../styles/homepage.css';
import { products as fallbackProducts } from '../data/products';

const heroSlides = [
  {
    id: 'slide-gaming',
    title: 'Own The Arena',
    subtitle: 'Elite gaming setups for every level.',
    image:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1600',
  },
  {
    id: 'slide-sports',
    title: 'Train For Matchday',
    subtitle: 'Sports gear engineered for consistency.',
    image:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1600',
  },
  {
    id: 'slide-fitness',
    title: 'Build Daily Strength',
    subtitle: 'Home fitness tools for focused progress.',
    image:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1600',
  },
  {
    id: 'slide-performance',
    title: 'Performance Starts Here',
    subtitle: 'Premium essentials for serious routines.',
    image:
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=1600',
  },
];

const categories = [
  { title: 'Gaming', icon: <FiCpu /> },
  { title: 'Sports', icon: <FiTarget /> },
  { title: 'Fitness', icon: <FiActivity /> },
];

const bundles = [
  {
    id: 'starter-pack',
    title: 'Starter Pack',
    priceText: 'Starting from Rs. 4,999',
    image:
      'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'pro-pack',
    title: 'Pro Pack',
    priceText: 'Starting from Rs. 9,999',
    image:
      'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&q=80&w=1200',
  },
];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data } = await api.get('/api/products');
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

  const goToPreviousSlide = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <div className="home-page">
      <section className="hero-slider page-wrap" aria-label="Promotional highlights">
        {heroSlides.map((slide, index) => (
          <article
            key={slide.id}
            className={`hero-slide ${index === activeSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
            aria-hidden={index !== activeSlide}
          >
            <div className="hero-slide-overlay" />
            <div className="hero-slide-content">
              <p className="hero-kicker">PLAYGEAR</p>
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <Link className="hero-cta" to="/products">
                Shop Now
                <FiArrowRight />
              </Link>
            </div>
          </article>
        ))}

        <button type="button" className="hero-arrow left" onClick={goToPreviousSlide} aria-label="Previous slide">
          <FiChevronLeft />
        </button>
        <button type="button" className="hero-arrow right" onClick={goToNextSlide} aria-label="Next slide">
          <FiChevronRight />
        </button>

        <div className="hero-dots" role="tablist" aria-label="Slide selectors">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`hero-dot ${index === activeSlide ? 'active' : ''}`}
              aria-label={`Go to ${slide.title}`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </section>

      <section className="category-section page-wrap" aria-label="Shop by category">
        {categories.map((category) => (
          <Link to="/products" key={category.title} className="category-card">
            <span>{category.icon}</span>
            <h3>{category.title}</h3>
          </Link>
        ))}
      </section>

      <section className="featured-section page-wrap">
        <div className="section-head">
          <h2>Featured Gear</h2>
        </div>
        <div className="featured-grid">
          {loading && Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={`home-skeleton-${index}`} />
          ))}
          {!loading && featuredItems.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>

        {!loading && featuredItems.length === 0 && (
          <StateBlock
            title="No featured products yet"
            message="New arrivals will appear here once products are available."
            actionLabel="Browse all products"
            actionTo="/products"
          />
        )}
      </section>

      <section className="offers-section page-wrap" aria-label="Offers and highlights">
        <article className="offer-banner gaming">
          <div className="offer-overlay" />
          <div className="offer-content">
            <h3>Up to 40% Off Gaming Gear</h3>
            <Link to="/products" className="offer-btn">Shop Now</Link>
          </div>
        </article>
        <article className="offer-banner fitness">
          <div className="offer-overlay" />
          <div className="offer-content">
            <h3>Home Workout Essentials</h3>
            <Link to="/products" className="offer-btn">Shop Now</Link>
          </div>
        </article>
      </section>

      <section className="bundles-section page-wrap">
        <div className="section-head">
          <h2>Bundles & Starter Packs</h2>
        </div>
        <div className="bundle-scroll" role="region" aria-label="Bundle cards">
          {bundles.map((bundle) => (
            <article key={bundle.id} className="bundle-card" style={{ backgroundImage: `url(${bundle.image})` }}>
              <div className="bundle-overlay" />
              <div className="bundle-content">
                <h4>{bundle.title}</h4>
                <p>{bundle.priceText}</p>
                <Link to="/products" className="bundle-btn">View Bundle</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="why-section page-wrap" aria-label="Why choose PlayGear">
        <div>
          <FiTruck />
          <span>Fast Delivery</span>
        </div>
        <div>
          <FiShield />
          <span>Quality Checked</span>
        </div>
        <div>
          <FiTarget />
          <span>Performance First</span>
        </div>
      </section>

      <section className="home-cta-band page-wrap">
        <div>
          <h3>Ready To Upgrade Your Setup?</h3>
          <p>Explore PLAYGEAR collections and build your perfect kit.</p>
        </div>
        <Link className="home-cta-btn" to="/products">Start Shopping</Link>
      </section>
    </div>
  );
};

export default HomePage;

