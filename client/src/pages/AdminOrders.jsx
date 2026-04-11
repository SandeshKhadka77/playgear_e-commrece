import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/admin.css';

const AdminOrders = () => {
  const [stats, setStats] = useState({ orderCount: 0, totalSales: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderSummary = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products/admin/stats');
        setStats({
          orderCount: data.orderCount || 0,
          totalSales: data.totalSales || 0,
        });
      } catch {
        setError('Unable to load order summary.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderSummary();
  }, []);

  if (loading) return <div className="admin-loader">Loading order summary...</div>;

  return (
    <div className="admin-orders-page">
      <h1>Order Management</h1>
      {error && <p className="admin-alert error">{error}</p>}

      <div className="order-summary-grid">
        <div className="order-summary-card">
          <h3>Total Orders</h3>
          <p>{stats.orderCount}</p>
        </div>
        <div className="order-summary-card">
          <h3>Total Sales</h3>
          <p>Rs. {Number(stats.totalSales).toLocaleString()}</p>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="5" className="orders-empty-cell">
              Orders model is not integrated yet. Summary cards above are live from admin stats.
            </td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;