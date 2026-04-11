import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/admin.css';
import { useToast } from '../hooks/useToast';

const AdminProducts = () => {
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch logic contained entirely inside useEffect
  useEffect(() => {
    const getInventory = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
      } catch (error) {
        console.error("Fetch Error:", error.message);
      } finally {
        setLoading(false);
      }
    };
    getInventory();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('Remove this item?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setProducts((prev) => prev.filter((p) => p._id !== id));
        showToast('Product removed.', 'success');
      } catch (err) {
        console.error("Delete failed:", err.message);
        showToast('Could not remove product.', 'error');
      }
    }
  };

  if (loading) return <div className="admin-loader">Loading Inventory...</div>;

  return (
    <div className="admin-products-page">
      <div className="admin-header">
        <h1>Product Management</h1>
        <Link className="btn-primary" to="/admin/addproduct">+ Add New Gear</Link>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>Rs. {p.price}</td>
              <td>
                <button className="btn-delete" onClick={() => deleteHandler(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;