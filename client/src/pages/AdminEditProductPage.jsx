import React, { useEffect, useState } from 'react';
import { FiEdit2, FiSave } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../lib/apiClient';
import { useToast } from '../hooks/useToast';
import '../styles/admin.css';

const EMPTY_FORM = {
  name: '',
  category: '',
  description: '',
  image: '',
  price: '',
  countInStock: 0,
  rating: 0,
};

const AdminEditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/api/products/${id}`);
        setForm({
          name: data?.name || '',
          category: data?.category || '',
          description: data?.description || '',
          image: data?.image || '',
          price: Number(data?.price || 0),
          countInStock: Number(data?.countInStock || 0),
          rating: Number(data?.rating || 0),
        });
      } catch (requestError) {
        const message = requestError?.response?.data?.message || 'Could not load product.';
        setError(message);
        showToast(message, 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, showToast]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.name || !form.category || !form.description || !form.image || form.price === '') {
      const message = 'Please fill all required fields.';
      setError(message);
      showToast(message, 'error');
      return;
    }

    try {
      setSaving(true);
      await api.put(`/api/products/${id}`, {
        name: form.name,
        category: form.category,
        description: form.description,
        image: form.image,
        price: Number(form.price),
        countInStock: Number(form.countInStock),
        rating: Number(form.rating),
      });

      showToast('Product updated successfully.', 'success');
      navigate('/admin/products');
    } catch (requestError) {
      const message = requestError?.response?.data?.message || 'Could not update product.';
      setError(message);
      showToast(message, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-loader">Loading product...</div>;

  return (
    <section className="admin-add-product-page">
      <header className="admin-header">
        <div>
          <h1>Edit Product</h1>
          <p className="admin-subtitle">Update product details and inventory values.</p>
        </div>
      </header>

      <form className="admin-add-form" onSubmit={handleSubmit}>
        <label>
          <span>Product Name</span>
          <input
            type="text"
            value={form.name}
            onChange={(event) => handleChange('name', event.target.value)}
            placeholder="Product title"
          />
        </label>

        <label>
          <span>Category</span>
          <input
            type="text"
            value={form.category}
            onChange={(event) => handleChange('category', event.target.value)}
            placeholder="Gaming / Sports / Fitness"
          />
        </label>

        <label className="admin-field-full">
          <span>Description</span>
          <textarea
            rows="4"
            value={form.description}
            onChange={(event) => handleChange('description', event.target.value)}
            placeholder="Add product description"
          />
        </label>

        <label className="admin-field-full">
          <span>Image URL</span>
          <input
            type="url"
            value={form.image}
            onChange={(event) => handleChange('image', event.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </label>

        <label>
          <span>Price (Rs.)</span>
          <input
            type="number"
            min="0"
            value={form.price}
            onChange={(event) => handleChange('price', event.target.value)}
            placeholder="0"
          />
        </label>

        <label>
          <span>Stock</span>
          <input
            type="number"
            min="0"
            value={form.countInStock}
            onChange={(event) => handleChange('countInStock', event.target.value)}
          />
        </label>

        <label>
          <span>Rating (0 - 5)</span>
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={form.rating}
            onChange={(event) => handleChange('rating', event.target.value)}
          />
        </label>

        {error && <p className="admin-alert error">{error}</p>}

        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? <FiSave /> : <FiEdit2 />}
          <span>{saving ? 'Updating...' : 'Update Product'}</span>
        </button>
      </form>
    </section>
  );
};

export default AdminEditProductPage;
