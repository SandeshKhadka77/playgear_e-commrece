import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/Admin.css'; // We will use your existing Admin.css

const AdminLayout = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: '📊' },
    { name: 'Products', path: '/admin/products', icon: '📦' },
    { name: 'Orders', path: '/admin/orders', icon: '🚚' },
    { name: 'Users', path: '/admin/users', icon: '👥' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* SIDEBAR */}
      <aside style={{
        width: '260px',
        backgroundColor: '#1a1a1a',
        color: 'white',
        position: 'fixed',
        height: '100vh',
        padding: '20px'
      }}>
        <h2 style={{ color: '#ff9900', marginBottom: '30px' }}>PlayGear Admin</h2>
        <nav>
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              style={{
                display: 'block',
                padding: '12px',
                color: location.pathname === item.path ? '#ff9900' : '#ccc',
                textDecoration: 'none',
                fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                borderLeft: location.pathname === item.path ? '4px solid #ff9900' : 'none',
                marginBottom: '10px'
              }}
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ marginLeft: '260px', flex: 1, padding: '40px', backgroundColor: '#f4f7f6' }}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;