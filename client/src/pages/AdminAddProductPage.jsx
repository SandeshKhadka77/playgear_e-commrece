import React, { useState } from 'react';

const AdminAddProductPage = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: 'Gaming',
    countInStock: 0,
    description: '',
  });

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const response = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await response.json();
      setImage(data.path);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // FIX: Using handleChange in the inputs below
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // FIX: Using userInfo here for authorization
    if (!userInfo) return alert("Please login as Admin");

    try {
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`, // userInfo is now USED
        },
        body: JSON.stringify({ ...product, image }),
      };
      const response = await fetch('/api/products', config);
      if (response.ok) alert('Gear added successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Add Sports/Gaming/Gym Gear</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* FIX: Attaching handleChange to the input */}
        <input 
          name="name" 
          placeholder="Product Name" 
          onChange={handleChange} 
          className="border p-2 w-full" 
        />
        
        <input 
          type="file" 
          onChange={uploadFileHandler} 
          className="block"
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Product
        </button>
      </form>
    </div>
  );
};

export default AdminAddProductPage;