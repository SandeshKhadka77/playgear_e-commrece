import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import '../styles/staticPages.css';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
        const token = userInfo?.token;

        if (!token) {
          setError('Please login to view your orders.');
          setLoading(false);
          return;
        }

        const { data } = await axios.get('http://localhost:5000/api/orders/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(Array.isArray(data) ? data : []);
      } catch (requestError) {
        setError(requestError?.response?.data?.message || 'Could not load your orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  const totalSpent = useMemo(
    () => orders.reduce((sum, order) => sum + (Number(order.totalPrice) || 0), 0),
    [orders]
  );

  if (loading) return <div className="static-page-shell"><div className="static-page-card">Loading your orders...</div></div>;

  return (
    <section className="static-page-shell">
      <div className="static-page-card">
        <h1>My Orders</h1>
        <p className="static-subtitle">Track your latest purchases and delivery progress.</p>

        {error && <p className="admin-alert error">{error}</p>}

        {!error && (
          <>
            <div className="order-meta-row">
              <p>Total Orders: <strong>{orders.length}</strong></p>
              <p>Total Spent: <strong>Rs. {totalSpent.toLocaleString()}</strong></p>
            </div>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>#{String(order._id).slice(-6)}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>{order.orderItems?.length || 0}</td>
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
                    <td colSpan="5" className="orders-empty-cell">No orders placed yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
};

export default MyOrdersPage;
