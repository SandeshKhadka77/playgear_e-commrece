import React from 'react';
import { useCart } from '../hooks/useCart'; 
import '../styles/Cart.css';

const Cart = () => {
  const { cart, removeFromCart, addToCart } = useCart();

  // Calculate total price for all items in the cart
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return <div className="cart-empty">Your cart is empty. Start shopping!</div>;
  }

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>Price: Rs. {item.price}</p>
                <div className="quantity-controls">
                  {/* Reuseof  addToCart to increase quantity */}
                  <button onClick={() => addToCart(item)}>+</button>
                  <span>{item.quantity}</span>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <h2>Summary</h2>
          <p>Total Items: {cart.length}</p>
          <h3>Total Price: Rs. {totalPrice}</h3>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;