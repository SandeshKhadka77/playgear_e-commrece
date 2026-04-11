import React from 'react';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import '../styles/staticPages.css';

const ContactPage = () => {
  return (
    <section className="static-page-shell">
      <div className="static-page-card">
        <h1>Contact Us</h1>
        <p className="static-subtitle">Need help with products, orders, or returns? Reach out to the Play Gear support team.</p>

        <ul className="contact-list">
          <li><FiPhone /> <span>+977-9800000000</span></li>
          <li><FiMail /> <span>support@playgear.com</span></li>
          <li><FiMapPin /> <span>Kathmandu</span></li>
        </ul>
      </div>
    </section>
  );
};

export default ContactPage;
