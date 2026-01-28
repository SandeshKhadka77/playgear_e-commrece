import React from 'react';

const AdminOrders = () => {
  // Mock data for UI testing
  const mockOrders = [
    { _id: 'ORD101', user: 'Sandesh K.', date: '2026-01-28', total: 4500, status: 'Pending' },
    { _id: 'ORD102', user: 'Anil M.', date: '2026-01-27', total: 1200, status: 'Shipped' },
  ];

  return (
    <div className="admin-orders-page">
      <h1>Order Management</h1>
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
          {mockOrders.map(order => (
            <tr key={order._id}>
              <td className="bold-text">#{order._id}</td>
              <td>{order.user}</td>
              <td>{order.date}</td>
              <td>Rs. {order.total}</td>
              <td>
                <span className={`badge ${order.status === 'Shipped' ? 'success' : 'warning'}`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;