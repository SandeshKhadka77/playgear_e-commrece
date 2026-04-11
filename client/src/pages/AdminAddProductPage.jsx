import React, { useState } from 'react';
import axios from 'axios';
import { FiCheckCircle, FiSave } from 'react-icons/fi';
import '../styles/admin.css';

const AdminAddProductPage = () => {
	const [form, setForm] = useState({
		name: '',
		category: '',
		description: '',
		image: '',
		price: '',
		countInStock: 10,
	});
	const [saving, setSaving] = useState(false);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	const handleChange = (key, value) => {
		setForm((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setMessage('');
		setError('');

		if (!form.name || !form.category || !form.description || !form.image || !form.price) {
			setError('Please fill all required fields.');
			return;
		}

		try {
			setSaving(true);
			await axios.post('http://localhost:5000/api/products', {
				...form,
				price: Number(form.price),
				countInStock: Number(form.countInStock),
			});

			setMessage('Product added successfully.');
			setForm({
				name: '',
				category: '',
				description: '',
				image: '',
				price: '',
				countInStock: 10,
			});
		} catch (requestError) {
			const serverMessage = requestError?.response?.data?.message || 'Could not save product.';
			setError(serverMessage);
		} finally {
			setSaving(false);
		}
	};

	return (
		<section className="admin-add-product-page">
			<header className="admin-header">
				<h1>Add Product</h1>
				<p className="admin-subtitle">Create a new product listing for the storefront.</p>
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
						placeholder="Gaming / Sports / Gym"
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

				{error && <p className="admin-alert error">{error}</p>}
				{message && <p className="admin-alert success"><FiCheckCircle /> {message}</p>}

				<button type="submit" className="btn-primary" disabled={saving}>
					<FiSave />
					<span>{saving ? 'Saving...' : 'Save Product'}</span>
				</button>
			</form>
		</section>
	);
};

export default AdminAddProductPage;
