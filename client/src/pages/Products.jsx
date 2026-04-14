import React, { useEffect, useMemo, useState } from 'react';
import api from '../lib/apiClient';
import { FiSearch, FiSliders } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import StateBlock from '../components/StateBlock';
import '../styles/ProductsPage.css'; 
import { products as fallbackProducts } from '../data/products';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(100000);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/api/products');
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts(fallbackProducts.map((item) => ({ ...item, _id: item.id })));
        setNotice('Live server is unavailable right now. Showing demo products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = useMemo(
    () => ['All', ...new Set(products.map((product) => product.category).filter(Boolean))],
    [products]
  );

  const highestPrice = useMemo(
    () => Math.max(1000, ...products.map((product) => Number(product.price) || 0)),
    [products]
  );

  useEffect(() => {
    setMaxPrice(highestPrice);
  }, [highestPrice]);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const name = String(product.name || '').toLowerCase();
      const category = String(product.category || '');
      const price = Number(product.price) || 0;

      const matchesSearch = name.includes(searchTerm.trim().toLowerCase());
      const matchesCategory = selectedCategory === 'All' || category === selectedCategory;
      const matchesPrice = price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sortBy === 'price-low') {
      return [...filtered].sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    }

    if (sortBy === 'price-high') {
      return [...filtered].sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    }

    if (sortBy === 'name-az') {
      return [...filtered].sort((a, b) => String(a.name || '').localeCompare(String(b.name || '')));
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, maxPrice, sortBy]);

  return (
    <div className="shop-container">
      <div className="shop-head">
        <h2 className="shop-title">Premium Gear</h2>
        <p>Hand-picked products for gaming, sports, and fitness enthusiasts.</p>
      </div>

      {notice && <div className="shop-notice">{notice}</div>}

      <section className="shop-toolbar" aria-label="Product filters">
        <div className="filter-title">
          <FiSliders />
          <span>Browse Filters</span>
        </div>

        <div className="toolbar-controls">
          <label className="search-control">
            <FiSearch />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search products"
              aria-label="Search products"
            />
          </label>

          <label>
            <span>Category</span>
            <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>

          <label>
            <span>Sort</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-az">Name: A-Z</option>
            </select>
          </label>

          <label className="range-control">
            <span>Max Price: Rs. {Number(maxPrice).toLocaleString()}</span>
            <input
              type="range"
              min="1000"
              max={highestPrice}
              step="500"
              value={Math.min(maxPrice, highestPrice)}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              aria-label="Maximum price"
            />
          </label>
        </div>
      </section>

      <div className="product-grid">
        {loading && Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={`products-skeleton-${index}`} />
        ))}

        {!loading && filteredProducts.map((product) => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>

      {!loading && filteredProducts.length === 0 && (
        <StateBlock
          title="No matching products"
          message="Try a different category, price range, or search keyword."
        />
      )}
    </div>
  );
};

export default Products;

