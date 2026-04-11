import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiMenu, FiSearch, FiShoppingCart, FiUser, FiX } from 'react-icons/fi';
import '../styles/navbar.css';
import { useCart } from '../hooks/useCart'; 
import { useState } from 'react';

const Navbar = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');

  const closeMenu = () => setIsMenuOpen(false);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    closeMenu();
    navigate('/');
  };

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          PLAYGEAR<span>NEPAL</span>
        </Link>

        <div className="nav-search">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search sports, gym and gaming gear" aria-label="Search products" />
          <button type="button">Search</button>
        </div>

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <ul className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/products" onClick={closeMenu}>Products</Link></li>
          {!userInfo ? (
            <li>
              <Link to="/login" className="profile-link" onClick={closeMenu}>
                <FiUser />
                <span>Login</span>
              </Link>
            </li>
          ) : (
            <>
              {userInfo.isAdmin && (
                <li>
                  <Link to="/admin" className="profile-link" onClick={closeMenu}>
                    <FiUser />
                    <span>Admin</span>
                  </Link>
                </li>
              )}
              <li>
                <button type="button" className="logout-btn" onClick={logoutHandler}>
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </li>
            </>
          )}
          <li>
            <Link to="/cart" className="cart-btn" onClick={closeMenu}>
              <FiShoppingCart />
              <span>Cart</span>
              <span className="cart-count">{totalItems}</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;