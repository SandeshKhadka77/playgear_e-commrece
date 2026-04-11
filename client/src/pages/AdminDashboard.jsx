import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiActivity, FiBox, FiCheckCircle, FiDollarSign, FiShoppingCart, FiUsers } from 'react-icons/fi';
import '../styles/admin.css';

const AdminDashboard = () => {
  // 1. State to hold our real data from DB
  const [stats, setStats] = useState({
    productCount: 0,
    orderCount: 0,
    totalSales: 0,
    userCount: 0
  });
  const [loading, setLoading] = useState(true);

  // 2. Fetch the data from the Backend API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        //  this URL matches our backend route
        const { data } = await axios.get('http://localhost:5000/api/products/admin/stats');
        setStats(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin stats:", error.message);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // 3. Map the DB data to the UI Cards
  const summaryCards = [
    { label: 'Total Revenue', value: `Rs. ${stats.totalSales.toLocaleString()}`, icon: <FiDollarSign />, color: '#28a745' },
    { label: 'Total Orders', value: stats.orderCount, icon: <FiShoppingCart />, color: '#ff9900' },
    { label: 'Active Products', value: stats.productCount, icon: <FiBox />, color: '#17a2b8' },
    { label: 'Total Users', value: stats.userCount, icon: <FiUsers />, color: '#6610f2' },
  ];

  if (loading) return <div className="admin-loader">Syncing PlayGear Dashboard...</div>;

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Real-time inventory and sales tracking from MongoDB.</p>
      </header>

      <div className="stats-grid">
        {summaryCards.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <h2 className="stat-value">{stat.value}</h2>
            </div>
            <div className="stat-icon-box" style={{ backgroundColor: `${stat.color}22`, color: stat.color }}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-lower">
        <div className="activity-panel">
          <h3>Recent Activity</h3>
          <ul className="activity-list">
            <li>
              <span className="act-icon"><FiActivity /></span>
              <p>Database connected: <strong>{stats.productCount}</strong> products synced.</p>
              <span className="act-time">Just now</span>
            </li>
            <li>
              <span className="act-icon"><FiCheckCircle /></span>
              <p>System health: <strong>Online</strong></p>
              <span className="act-time">Stable</span>
            </li>
          </ul>
        </div>

        <div className="quick-actions">
          <h3>Quick Management</h3>
          <div className="action-btns">
            <button className="q-btn">Download Report</button>
            <button className="q-btn secondary">Store Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;