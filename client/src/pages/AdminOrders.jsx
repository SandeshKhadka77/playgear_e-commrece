import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import '../styles/admin.css';
import { useToast } from '../hooks/useToast';

const PAGE_SIZE = 8;

const AdminOrders = () => {
  const { showToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ orderCount: 0, totalSales: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

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
          axios.get('/api/products/admin/stats'),
          axios.get('/api/orders', {
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
        `/api/orders/${orderId}/status`,
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

  useEffect(() => {
    setPage(1);
  }, [searchTerm, statusFilter]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE)),
    [filteredOrders.length]
  );

  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredOrders.slice(start, start + PAGE_SIZE);
  }, [filteredOrders, page]);

  const goPrevious = () => setPage((prev) => Math.max(1, prev - 1));
  const goNext = () => setPage((prev) => Math.min(totalPages, prev + 1));

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
          {paginatedOrders.map((order) => (
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
                <div className="order-actions">
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
                  <button type="button" className="view-order-btn" onClick={() => setSelectedOrder(order)}>
                    View
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {paginatedOrders.length === 0 && (
            <tr>
              <td colSpan="6" className="orders-empty-cell">
                No orders found yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {filteredOrders.length > 0 && (
        <div className="pagination-row">
          <button type="button" onClick={goPrevious} disabled={page === 1}>Previous</button>
          <span>Page {page} of {totalPages}</span>
          <button type="button" onClick={goNext} disabled={page === totalPages}>Next</button>
        </div>
      )}

      {selectedOrder && (
        <div className="admin-modal-overlay" role="presentation" onClick={() => setSelectedOrder(null)}>
          <div className="admin-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <div className="admin-modal-head">
              <h3>Order #{String(selectedOrder._id).slice(-6)}</h3>
              <button type="button" onClick={() => setSelectedOrder(null)}>Ã—</button>
            </div>

            <p><strong>Customer:</strong> {selectedOrder.user?.name || selectedOrder.user?.email || 'Unknown'}</p>
            <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
            <p><strong>Total:</strong> Rs. {Number(selectedOrder.totalPrice || 0).toLocaleString()}</p>

            <h4>Items</h4>
            <ul className="order-item-list">
              {(selectedOrder.orderItems || []).map((item, index) => (
                <li key={`${item.product || item.name}-${index}`}>
                  <span>{item.name}</span>
                  <span>{item.qty} Ã— Rs. {Number(item.price || 0).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
