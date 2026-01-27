import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ProductsPage.css'; 

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCartHandler = (product) => {
    // Get existing cart from LocalStorage or start empty
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Check if item already exists
    const existItem = cartItems.find((x) => x._id === product._id);

    if (existItem) {
      alert(`${product.name} is already in your cart!`);
    } else {
      // Add new product to the list
      cartItems.push({ ...product, qty: 1 });
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      alert(`${product.name} added to cart!`);
    }
  };

  if (loading) return <div className="loader">Loading PlayGear Store...</div>;

  return (
    <div className="shop-container">
      <h2 className="shop-title">Premium Gear</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="image-container">
               <img src={product.image} alt={product.name} />
            </div>
            <div className="product-details">
              <h3>{product.name}</h3>
              <p className="category">{product.category}</p>
              <p className="price">Rs. {product.price}</p>
              <button 
                className="add-to-cart-btn"
                onClick={() => addToCartHandler(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;