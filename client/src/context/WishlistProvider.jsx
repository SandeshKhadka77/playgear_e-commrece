import React, { useEffect, useMemo, useState } from 'react';
import { WishlistContext } from './WishlistContext';

const WISHLIST_STORAGE_KEY = 'wishlistItems';

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const persisted = localStorage.getItem(WISHLIST_STORAGE_KEY);
      const parsed = persisted ? JSON.parse(persisted) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const getProductKey = (product) => String(product?._id || product?.id || '');

  const isInWishlist = (productId) => wishlist.some((item) => String(item._id || item.id) === String(productId));

  const addToWishlist = (product) => {
    const key = getProductKey(product);
    if (!key) return;

    setWishlist((prev) => {
      const exists = prev.some((item) => String(item._id || item.id) === key);
      if (exists) return prev;

      return [{ ...product, _id: product._id || product.id, id: product.id || product._id }, ...prev];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => String(item._id || item.id) !== String(productId)));
  };

  const toggleWishlist = (product) => {
    const key = getProductKey(product);
    if (!key) return;

    if (isInWishlist(key)) {
      removeFromWishlist(key);
      return;
    }

    addToWishlist(product);
  };

  const clearWishlist = () => setWishlist([]);

  const value = useMemo(
    () => ({
      wishlist,
      wishlistCount: wishlist.length,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      clearWishlist,
      isInWishlist,
    }),
    [wishlist]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
