import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: '📊 Dashboard', path: '/admin' },
    { name: '📦 Products', path: '/admin/productlist' },
    { name: '📜 Orders', path: '/admin/orderlist' },
    { name: '👥 Users', path: '/admin/userlist' },
  ];

  return (
    <div className="w-64 bg-slate-900 min-h-screen text-white p-4 shadow-xl">
      <div className="mb-10 text-center">
        <h1 className="text-xl font-bold text-blue-400">PlayGear Nepal</h1>
        <p className="text-xs text-gray-400 uppercase tracking-widest">Admin Panel</p>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block p-3 rounded-lg transition-all ${
              location.pathname === item.path 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'hover:bg-slate-800 text-gray-300'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;