import React, { useEffect, useMemo, useState } from 'react';
import { CartContext } from './CartContext';

const CART_KEY = 'cartItems';

const getProductKey = (product) => String(product?._id ?? product?.id ?? '');

const normalizeItem = (product, qty = 1) => {
  const key = getProductKey(product);

  return {
    _id: key,
    id: product.id ?? key,
    name: product.name,
    image: product.image,
    category: product.category,
    price: Number(product.price) || 0,
    qty,
  };
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(CART_KEY));
      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const key = getProductKey(product);
    if (!key) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => String(item._id ?? item.id) === key);

      if (existingItem) {
        return prevCart.map((item) => (
          String(item._id ?? item.id) === key
            ? { ...item, qty: (item.qty || 1) + 1 }
            : item
        ));
      }

      return [...prevCart, normalizeItem(product, 1)];
    });
  };

  const removeFromCart = (productId) => {
    const key = String(productId);
    setCart((prevCart) => prevCart.filter((item) => String(item._id ?? item.id) !== key));
  };

  const updateQuantity = (productId, qty) => {
    const key = String(productId);
    const nextQty = Math.max(1, Number(qty) || 1);

    setCart((prevCart) => prevCart.map((item) => (
      String(item._id ?? item.id) === key ? { ...item, qty: nextQty } : item
    )));
  };

  const clearCart = () => setCart([]);

  const totalItems = useMemo(
    () => cart.reduce((total, item) => total + (item.qty || 1), 0),
    [cart]
  );

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};