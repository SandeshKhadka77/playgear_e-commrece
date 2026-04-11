import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/admin.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
        const token = userInfo?.token;

        if (!token) {
          setError('Admin token missing. Please login again.');
          setLoading(false);
          return;
        }

        const { data } = await axios.get('http://localhost:5000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(data);
      } catch (requestError) {
        setError(requestError?.response?.data?.message || 'Unable to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.trim().toLowerCase();
    const name = String(user.name || '').toLowerCase();
    const email = String(user.email || '').toLowerCase();
    const matchesSearch = !term || name.includes(term) || email.includes(term);
    const role = user.isAdmin ? 'Admin' : 'Customer';
    const matchesRole = roleFilter === 'All' || role === roleFilter;

    return matchesSearch && matchesRole;
  });

  if (loading) return <div className="admin-loader">Loading users...</div>;

  return (
    <div className="admin-users-page">
      <h1>User Management</h1>
      {error && <p className="admin-alert error">{error}</p>}

      <div className="admin-toolbar">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by name or email"
        />

        <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
          <option value="All">All roles</option>
          <option value="Admin">Admin</option>
          <option value="Customer">Customer</option>
        </select>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td><span className={`badge ${user.isAdmin ? 'success' : 'warning'}`}>{user.isAdmin ? 'Admin' : 'Customer'}</span></td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredUsers.length === 0 && !error && <p className="admin-empty">No users found.</p>}
    </div>
  );
};

export default AdminUsers;