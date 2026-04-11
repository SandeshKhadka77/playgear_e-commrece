import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/admin.css';
import { useToast } from '../hooks/useToast';

const AdminOrders = () => {
  const { showToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ orderCount: 0, totalSales: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

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

  const updateStatus = async (orderId, nextStatus) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
      const token = userInfo?.token;

      if (!token) {
        showToast('Admin token missing. Please login again.', 'error');
        return;
      }

      const { data } = await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: nextStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((prev) => prev.map((order) => (order._id === orderId ? data : order)));
      showToast('Order status updated.', 'success');
    } catch (requestError) {
      showToast(requestError?.response?.data?.message || 'Could not update order status.', 'error');
    }
  };

  const filteredOrders = orders.filter((order) => {
    const idText = String(order._id || '').toLowerCase();
    const customer = String(order.user?.name || order.user?.email || '').toLowerCase();
    const term = searchTerm.trim().toLowerCase();
    const matchesSearch = !term || idText.includes(term) || customer.includes(term);
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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

      <div className="admin-toolbar">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by order ID or customer"
        />

        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="All">All statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
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
              <td>
                <select
                  className="status-select"
                  value={order.status}
                  onChange={(event) => updateStatus(order._id, event.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}

          {filteredOrders.length === 0 && (
            <tr>
              <td colSpan="6" className="orders-empty-cell">
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