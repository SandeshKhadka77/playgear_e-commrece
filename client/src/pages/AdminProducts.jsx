import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/admin.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', price: '', category: '', description: '', image: '', countInStock: 10
  });

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

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/products', newProduct);
      // Instead of calling a fetch function, we update the state directly
      setProducts((prev) => [...prev, data]); 
      setShowAddForm(false);
      setNewProduct({ name: '', price: '', category: '', description: '', image: '', countInStock: 10 });
      alert("New Gear Added!");
    } catch (err) {
      console.error("Add failed:", err.message);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Remove this item?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } catch (err) {
        console.error("Delete failed:", err.message);
      }
    }
  };

  if (loading) return <div className="admin-loader">Loading Inventory...</div>;

  return (
    <div className="admin-products-page">
      <div className="admin-header">
        <h1>Product Management</h1>
        <button className="btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Close Form' : '+ Add New Gear'}
        </button>
      </div>

      {showAddForm && (
        <form className="add-product-form" onSubmit={handleAddProduct}>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Name" 
              required 
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} 
            />
            <input 
              type="number" 
              placeholder="Price" 
              required 
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} 
            />
          </div>
          <button type="submit" className="btn-save">Save to MongoDB</button>
        </form>
      )}

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