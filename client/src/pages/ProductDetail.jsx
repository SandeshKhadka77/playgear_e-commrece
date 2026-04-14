import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../lib/apiClient';
import { FiCheckCircle, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';
import { products } from '../data/products.js';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import StateBlock from '../components/StateBlock';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/api/products/${id}`);
        setProduct(data);

        const allProducts = await api.get('/api/products');
        const related = allProducts.data
          .filter((item) => String(item._id) !== String(data._id))
          .filter((item) => item.category === data.category)
          .slice(0, 4);
        setRelatedProducts(related);
      } catch (requestError) {
        const localProduct = products.find((p) => String(p.id) === String(id));
        setProduct(localProduct || null);
        if (!localProduct) {
          setError(requestError?.response?.data?.message || 'Could not load this product.');
        }

        if (localProduct) {
          const related = products
            .filter((item) => String(item.id) !== String(localProduct.id))
            .filter((item) => item.category === localProduct.category)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-detail-shell">
        <div className="product-detail-state-grid">
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-shell">
        <StateBlock
          tone="error"
          title="Product not found"
          message={error || 'This product may have been removed or is currently unavailable.'}
          actionLabel="Back to products"
          actionTo="/products"
        />
      </div>
    );
  }

  const increaseQty = () => setQty((prev) => Math.min(99, prev + 1));
  const decreaseQty = () => setQty((prev) => Math.max(1, prev - 1));

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
          <div className="detail-cta-row">
            <div className="detail-qty-controls">
              <button type="button" onClick={decreaseQty} aria-label="Decrease quantity"><FiMinus /></button>
              <span>{qty}</span>
              <button type="button" onClick={increaseQty} aria-label="Increase quantity"><FiPlus /></button>
            </div>

            <button
              className="add-to-cart-btn"
              type="button"
              onClick={() => {
                addToCart(product, qty);
                showToast(`${qty} item(s) added to cart.`, 'success');
              }}
            >
              <FiShoppingBag />
              <span>Add {qty} to Cart</span>
            </button>
          </div>

          <button
            className="buy-now-btn"
            type="button"
            onClick={() => {
              addToCart(product, 1);
              showToast('Item added. Continue checkout from cart.', 'info');
            }}
          >
            <FiShoppingBag />
            <span>Buy Now</span>
          </button>
          <ul className="detail-benefits">
            <li><FiCheckCircle /> Fast delivery across the country</li>
            <li><FiCheckCircle /> Quality-checked before shipping</li>
          </ul>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="related-products">
          <h3>Related Products</h3>
          <div className="related-grid">
            {relatedProducts.map((item) => (
              <ProductCard key={item._id || item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;

