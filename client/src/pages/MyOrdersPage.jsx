import React, { useEffect, useMemo, useState } from 'react';
import api from '../lib/apiClient';
import StateBlock from '../components/StateBlock';
import '../styles/staticPages.css';

const getStatusStep = (status) => {
  const steps = {
    Pending: 1,
    Confirmed: 2,
    Shipped: 3,
    Delivered: 4,
  };

  return steps[status] || 1;
};

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

        const { data } = await api.get('/api/orders/my');

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

  if (loading) {
    return (
      <div className="static-page-shell">
        <div className="static-page-card">
          <StateBlock title="Loading your orders" message="Fetching your latest order history." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <section className="static-page-shell">
        <div className="static-page-card">
          <h1>My Orders</h1>
          <p className="static-subtitle">Track your latest purchases and delivery progress.</p>
          <StateBlock
            tone="error"
            title="Unable to load orders"
            message={error}
            actionLabel="Login"
            actionTo="/login"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="static-page-shell">
      <div className="static-page-card">
        <h1>My Orders</h1>
        <p className="static-subtitle">Track your latest purchases and delivery progress.</p>

        <div className="order-meta-row">
          <p>Total Orders: <strong>{orders.length}</strong></p>
          <p>Total Spent: <strong>Rs. {totalSpent.toLocaleString()}</strong></p>
        </div>

        {orders.length === 0 ? (
          <StateBlock
            title="No orders yet"
            message="Start shopping and your orders will show here."
            actionLabel="Browse products"
            actionTo="/products"
          />
        ) : (
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
                    <div className="status-cell">
                      <span className={`badge ${order.status === 'Delivered' ? 'success' : 'warning'}`}>
                        {order.status}
                      </span>
                      <div className="timeline-dots" aria-hidden="true">
                        {[1, 2, 3, 4].map((step) => (
                          <span
                            key={step}
                            className={`dot ${getStatusStep(order.status) >= step ? 'active' : ''}`}
                          />
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </section>
  );
};

export default MyOrdersPage;


