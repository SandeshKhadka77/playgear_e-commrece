import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiMail, FiMapPin, FiPhone, FiTwitter } from 'react-icons/fi';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-wrap">
        <section className="footer-brand">
          <h4>
            PLAY<span>GEAR</span>
          </h4>
          <p>Performance-driven gear for gaming, sports, and fitness.</p>
        </section>

        <section>
          <h5>Quick Links</h5>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </section>

        <section>
          <h5>Contact</h5>
          <ul className="footer-contact">
            <li><FiPhone /> <span>+977-9800000000</span></li>
            <li><FiMail /> <a href="mailto:support@playgear.com">support@playgear.com</a></li>
            <li><FiMapPin /> <span>Kathmandu</span></li>
          </ul>
        </section>

        <section>
          <h5>Social</h5>
          <div className="footer-socials" aria-label="Social links">
            <a href="#" aria-label="Instagram"><FiInstagram /></a>
            <a href="#" aria-label="Facebook"><FiFacebook /></a>
            <a href="#" aria-label="Twitter"><FiTwitter /></a>
          </div>
        </section>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Play Gear. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
