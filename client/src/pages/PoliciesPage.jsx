import React from 'react';
import '../styles/staticPages.css';

const PoliciesPage = () => {
  return (
    <section className="static-page-shell">
      <div className="static-page-card">
        <h1>Policies</h1>
        <div className="policy-group">
          <h2>Shipping Policy</h2>
          <p>Orders are processed within 24 hours and dispatched on working days. Delivery timelines depend on destination coverage.</p>
        </div>

        <div className="policy-group">
          <h2>Return and Replacement</h2>
          <p>Products can be returned within 7 days if unused and in original condition. Damaged or incorrect items are replaced at no extra cost.</p>
        </div>

        <div className="policy-group">
          <h2>Payments and Security</h2>
          <p>All transactions are processed through secured channels. User account and order data are handled with restricted admin-only access.</p>
        </div>
      </div>
    </section>
  );
};

export default PoliciesPage;
