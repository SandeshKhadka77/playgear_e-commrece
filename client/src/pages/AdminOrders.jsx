import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/admin.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ orderCount: 0, totalSales: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
        const token = userInfo?.token;

        if (!token) {
          setError('Admin token missing. Please login again.');
          setLoading(false);
          return;
        }

        const [{ data: statsData }, { data: orderData }] = await Promise.all([
          axios.get('http://localhost:5000/api/products/admin/stats'),
          axios.get('http://localhost:5000/api/orders', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        setStats({
          orderCount: statsData.orderCount || 0,
          totalSales: statsData.totalSales || 0,
        });
        setOrders(Array.isArray(orderData) ? orderData : []);
      } catch (requestError) {
        setError(requestError?.response?.data?.message || 'Unable to load orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
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
          {orders.map((order) => (
            <tr key={order._id}>
              <td>#{String(order._id).slice(-6)}</td>
              <td>{order.user?.name || order.user?.email || 'Unknown'}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>Rs. {Number(order.totalPrice || 0).toLocaleString()}</td>
              <td>
                <span className={`badge ${order.status === 'Delivered' ? 'success' : 'warning'}`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}

          {orders.length === 0 && (
            <tr>
              <td colSpan="5" className="orders-empty-cell">
                No orders found yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;