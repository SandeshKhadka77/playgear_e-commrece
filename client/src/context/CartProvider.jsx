import React, { useState } from 'react';
import { CartContext } from './CartContext'; // Import from the file cart context.js

// CartProvider component to wrap around parts of the app that need cart access

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Logic to add items to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if item is already in cart
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        // If it exists, increase the quantity
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // If it's new, add it with a quantity of 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
    
    // Feedback for the user 
    alert(`${product.name} added to cart!`);
  };

  // Logic to remove items
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};