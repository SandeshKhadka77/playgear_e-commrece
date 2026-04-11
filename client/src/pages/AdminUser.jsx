import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/admin.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (loading) return <div className="admin-loader">Loading users...</div>;

  return (
    <div className="admin-users-page">
      <h1>User Management</h1>
      {error && <p className="admin-alert error">{error}</p>}
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
          {users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td><span className={`badge ${user.isAdmin ? 'success' : 'warning'}`}>{user.isAdmin ? 'Admin' : 'Customer'}</span></td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && !error && <p className="admin-empty">No users found.</p>}
    </div>
  );
};

export default AdminUsers;