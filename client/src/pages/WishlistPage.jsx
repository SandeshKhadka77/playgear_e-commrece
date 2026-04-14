import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';
import StateBlock from '../components/StateBlock';
import '../styles/wishlist.css';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const moveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item._id || item.id);
    showToast(`${item.name} moved to cart.`, 'success');
  };

  return (
    <section className="wishlist-shell">
      <div className="wishlist-head">
        <h1><FiHeart /> Wishlist</h1>
        {wishlist.length > 0 && (
          <button
            type="button"
            className="wishlist-clear-btn"
            onClick={() => {
              clearWishlist();
              showToast('Wishlist cleared.', 'info');
            }}
          >
            Clear Wishlist
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <StateBlock
          title="Your wishlist is empty"
          message="Save products you like and come back anytime to buy them."
          actionLabel="Browse products"
          actionTo="/products"
        />
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <article key={item._id || item.id} className="wishlist-card">
              <Link to={`/product/${item._id || item.id}`} className="wishlist-image-wrap">
                <img src={item.image} alt={item.name} />
              </Link>

              <div className="wishlist-content">
                <Link to={`/product/${item._id || item.id}`}>
                  <h3>{item.name}</h3>
                </Link>
                <p>{item.category}</p>
                <strong>Rs. {Number(item.price || 0).toLocaleString()}</strong>

                <div className="wishlist-actions">
                  <button type="button" className="wishlist-move-btn" onClick={() => moveToCart(item)}>
                    <FiShoppingBag />
                    <span>Move to Cart</span>
                  </button>
                  <button
                    type="button"
                    className="wishlist-remove-btn"
                    onClick={() => {
                      removeFromWishlist(item._id || item.id);
                      showToast(`${item.name} removed from wishlist.`, 'info');
                    }}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default WishlistPage;
