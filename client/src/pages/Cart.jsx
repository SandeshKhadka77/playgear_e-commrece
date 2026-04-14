import React from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/apiClient';
import { FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';
import { useNavigate } from 'react-router-dom';
import '../styles/cart.css'; 

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [placingOrder, setPlacingOrder] = React.useState(false);

  const totalPrice = cart.reduce((acc, item) => acc + ((Number(item.price) || 0) * (item.qty || 1)), 0);

  const increaseQty = (item) => {
    const key = item._id || item.id;
    updateQuantity(key, (item.qty || 1) + 1);
    showToast('Quantity updated.', 'info');
  };

  const decreaseQty = (item) => {
    const key = item._id || item.id;
    updateQuantity(key, Math.max(1, (item.qty || 1) - 1));
    showToast('Quantity updated.', 'info');
  };

  const checkoutHandler = async () => {
    try {
      setPlacingOrder(true);
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
      const token = userInfo?.token;

      if (!token) {
        showToast('Please login to place your order.', 'error');
        navigate('/login');
        return;
      }

      const orderItems = cart.map((item) => ({
        product: item._id || item.id,
        name: item.name,
        image: item.image,
        qty: item.qty || 1,
        price: Number(item.price) || 0,
      }));

      await api.post(
        '/api/orders',
        {
          orderItems,
          shippingPrice: 0,
          taxPrice: 0,
          totalPrice,
        }
      );

      clearCart();
      showToast('Order placed successfully.', 'success');
      navigate('/products');
    } catch (requestError) {
      showToast(requestError?.response?.data?.message || 'Could not place order.', 'error');
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="cart-page-container">
      <h1 className="cart-header">Your Shopping Cart ({cart.length})</h1>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart feels a bit light.</p>
          <Link to="/products" className="shop-link">Back to Shop</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-section">
            {cart.map((item) => (
              <div key={item._id || item.id} className="cart-item-card">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="item-category">{item.category}</p>
                  <p className="item-price">Rs. {Number(item.price || 0).toLocaleString()}</p>
                  <div className="qty-controls">
                    <button type="button" onClick={() => decreaseQty(item)}><FiMinus /></button>
                    <span>{item.qty || 1}</span>
                    <button type="button" onClick={() => increaseQty(item)}><FiPlus /></button>
                  </div>
                </div>
                <button
                  onClick={() => {
                    removeFromCart(item._id || item.id);
                    showToast('Item removed from cart.', 'info');
                  }}
                  className="remove-item-btn"
                  type="button"
                >
                  <FiTrash2 />
                  <span>Remove</span>
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary-section">
            <div className="summary-card">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>Rs. {totalPrice.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free-shipping">FREE</span>
              </div>
              <hr />
              <div className="summary-row total">
                <span>Total</span>
                <span>Rs. {totalPrice.toLocaleString()}</span>
              </div>
              <button className="checkout-btn" type="button" onClick={checkoutHandler} disabled={placingOrder}>
                <FiShoppingBag />
                <span>{placingOrder ? 'Placing Order...' : 'Proceed to Checkout'}</span>
              </button>
              <Link to="/products" className="continue-shopping">Continue Shopping</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

