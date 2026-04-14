import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { IoStar, IoStarHalf } from 'react-icons/io5';
import '../styles/ProductCard.css';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';
import { useWishlist } from '../hooks/useWishlist';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const rating = Number(product.rating || 4.5);
  const roundedRating = Math.round(rating * 2) / 2;
  const productId = product._id || product.id;
  const liked = isInWishlist(productId);

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i += 1) {
      if (roundedRating >= i) {
        stars.push(<IoStar key={i} className="star-icon" />);
      } else if (roundedRating + 0.5 === i) {
        stars.push(<IoStarHalf key={i} className="star-icon" />);
      }
    }

    return stars;
  };

  return (
    <article className="product-card">
      <Link to={`/product/${product._id || product.id}`}>
        <div className="product-image-wrap">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-image"
          />
          <span className="category-chip">
            {product.category}
          </span>
          <button
            type="button"
            className={`wishlist-icon-btn ${liked ? 'active' : ''}`}
            aria-label="Toggle wishlist"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              toggleWishlist(product);
              showToast(liked ? `${product.name} removed from wishlist.` : `${product.name} saved to wishlist.`, 'info');
            }}
          >
            <FiHeart />
          </button>
        </div>
      </Link>

      <div className="product-content">
        <Link to={`/product/${product._id || product.id}`}>
          <h3 className="product-name">
            {product.name}
          </h3>
        </Link>
        <div className="rating-row">
          <span className="stars">{renderStars()}</span>
          <span className="rating-value">({roundedRating.toFixed(1)})</span>
        </div>
        <div className="card-footer">
          <span className="product-price">Rs. {Number(product.price || 0).toLocaleString()}</span>
          <button
            className="add-to-cart-btn"
            type="button"
            onClick={() => {
              addToCart(product);
              showToast(`${product.name} added to cart.`, 'success');
            }}
          >
            <FiShoppingBag />
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;