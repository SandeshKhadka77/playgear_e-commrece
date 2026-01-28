import React from 'react';

const AdminUsers = () => {
  const mockUsers = [
    { _id: 'U1', name: 'Admin User', email: 'admin@playgear.com', role: 'Admin' },
    { _id: 'U2', name: 'Standard Customer', email: 'customer@gmail.com', role: 'Customer' },
  ];

  return (
    <div className="admin-users-page">
      <h1>User Management</h1>
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
          {mockUsers.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td className="bold-text">{user.name}</td>
              <td>{user.email}</td>
              <td><span className="badge">{user.role}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;