import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo - Flowchart Entry */}
        <Link to="/" className="nav-logo">
          PLAYGEAR<span>NEPAL</span>
        </Link>

        {/* Search Input - Flowchart Node: Search */}
        <div className="nav-search">
          <input type="text" placeholder="Search sports & gaming gear..." />
          <button type="submit">Search</button>
        </div>

        {/* Navigation - Flowchart Nodes */}
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li>
            <Link to="/cart" className="cart-btn">
              Cart 🛒 <span className="cart-count">0</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;