import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useCart } from '../hooks/useCart'; 

const Navbar = () => {
  // 1. Initialize the hook to get the cart data
  const { cart } = useCart();

  // 2. Calculate the total number of items in the cart
  // This sums up all 'quantity' values from the cart array
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          PLAYGEAR<span>NEPAL</span>
        </Link>

        <div className="nav-search">
          <input type="text" placeholder="Search sports & gaming gear..." />
          <button type="submit">Search</button>
        </div>

        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li>
            <Link to="/cart" className="cart-btn">
              Cart 🛒 <span className="cart-count">{totalItems}</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;