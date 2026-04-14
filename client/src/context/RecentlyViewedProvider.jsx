import React, { useEffect, useMemo, useState } from 'react';
import { RecentlyViewedContext } from './RecentlyViewedContext';

const STORAGE_KEY = 'recentlyViewedProducts';
const MAX_ITEMS = 8;

const getProductKey = (product) => String(product?._id || product?.id || '');

export const RecentlyViewedProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const persisted = localStorage.getItem(STORAGE_KEY);
      const parsed = persisted ? JSON.parse(persisted) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const trackViewedProduct = (product) => {
    const key = getProductKey(product);
    if (!key) return;

    const normalized = {
      ...product,
      _id: product._id || product.id,
      id: product.id || product._id,
    };

    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => String(item._id || item.id) !== key);
      return [normalized, ...filtered].slice(0, MAX_ITEMS);
    });
  };

  const clearRecentlyViewed = () => setRecentlyViewed([]);

  const value = useMemo(
    () => ({ recentlyViewed, trackViewedProduct, clearRecentlyViewed }),
    [recentlyViewed]
  );

  return <RecentlyViewedContext.Provider value={value}>{children}</RecentlyViewedContext.Provider>;
};
