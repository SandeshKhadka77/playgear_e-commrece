import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-wrap">
        <section>
          <h4>Play Gear</h4>
          <p>Performance-driven gear for gaming, sports, and fitness in one storefront.</p>
        </section>

        <section>
          <h5>Quick Links</h5>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/login">Account</Link></li>
          </ul>
        </section>

        <section>
          <h5>Policies</h5>
          <ul>
            <li>Shipping and delivery support</li>
            <li>Easy returns within 7 days</li>
            <li>Secure payments and checkout</li>
          </ul>
        </section>

        <section>
          <h5>Contact</h5>
          <ul className="footer-contact">
            <li><FiPhone /> <span>+977-9800000000</span></li>
            <li><FiMail /> <span>support@playgear.com</span></li>
            <li><FiMapPin /> <span>Kathmandu</span></li>
          </ul>
        </section>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Play Gear. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
