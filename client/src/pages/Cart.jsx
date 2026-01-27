import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/cart.css'; 

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const localCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (localCart.length > 0) {
          const { data } = await axios.get('http://localhost:5000/api/products');
          const itemsWithDetails = localCart.map(localItem => {
            const dbProduct = data.find(p => p._id === localItem._id);
            return dbProduct ? { ...dbProduct, qty: localItem.qty } : null;
          }).filter(item => item !== null);
          setCartItems(itemsWithDetails);
        }
        setLoading(false);
      } catch (error) {
        console.error("Cart sync error:", error);
        setLoading(false);
      }
    };
    fetchCartData();
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart.map(i => ({ _id: i._id, qty: i.qty }))));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * (item.qty || 1)), 0);

  if (loading) return <div className="cart-loader">Checking inventory...</div>;

  return (
    <div className="cart-page-container">
      <h1 className="cart-header">Your Shopping Cart ({cartItems.length})</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart feels a bit light.</p>
          <Link to="/products" className="shop-link">Back to Shop</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-section">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item-card">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="item-category">{item.category}</p>
                  <p className="item-price">Rs. {item.price.toLocaleString()}</p>
                </div>
                <button onClick={() => removeFromCart(item._id)} className="remove-item-btn">
                  Remove
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
              <button className="checkout-btn">Proceed to Checkout</button>
              <Link to="/products" className="continue-shopping">Continue Shopping</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;