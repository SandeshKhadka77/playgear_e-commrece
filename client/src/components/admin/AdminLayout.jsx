import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiBox, FiClipboard, FiHome, FiPlusSquare, FiUsers } from 'react-icons/fi';
import '../../styles/admin.css';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <FiHome /> },
    { name: 'Products', path: '/admin/products', icon: <FiBox /> },
    { name: 'Add Product', path: '/admin/addproduct', icon: <FiPlusSquare /> },
    { name: 'Orders', path: '/admin/orders', icon: <FiClipboard /> },
    { name: 'Users', path: '/admin/users', icon: <FiUsers /> },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h1>Play Gear</h1>
          <p>Admin Panel</p>
        </div>
        <nav className="admin-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-nav-item ${
                location.pathname === item.path 
                ? 'active' 
                : ''
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <section className="admin-main">{children}</section>
    </div>
  );
};

export default AdminLayout;