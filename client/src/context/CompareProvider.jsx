import React, { useEffect, useState } from 'react';
import { CompareContext } from './CompareContext';

const STORAGE_KEY = 'compareProducts';
const MAX_COMPARE_ITEMS = 3;

const normalizeProduct = (product) => ({
  ...product,
  _id: product._id || product.id,
  id: product.id || product._id,
});

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState(() => {
    try {
      const persisted = localStorage.getItem(STORAGE_KEY);
      const parsed = persisted ? JSON.parse(persisted) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(compareItems));
  }, [compareItems]);

  const isInCompare = (productId) => compareItems.some((item) => String(item._id || item.id) === String(productId));

  const removeFromCompare = (productId) => {
    setCompareItems((prev) => prev.filter((item) => String(item._id || item.id) !== String(productId)));
  };

  const addToCompare = (product) => {
    const key = String(product?._id || product?.id || '');
    if (!key) return { ok: false, reason: 'invalid' };

    if (isInCompare(key)) {
      return { ok: true, reason: 'exists' };
    }

    if (compareItems.length >= MAX_COMPARE_ITEMS) {
      return { ok: false, reason: 'limit' };
    }

    setCompareItems((prev) => [...prev, normalizeProduct(product)]);
    return { ok: true, reason: 'added' };
  };

  const toggleCompare = (product) => {
    const key = String(product?._id || product?.id || '');
    if (!key) return { ok: false, reason: 'invalid' };

    if (isInCompare(key)) {
      removeFromCompare(key);
      return { ok: true, reason: 'removed' };
    }

    return addToCompare(product);
  };

  const clearCompare = () => setCompareItems([]);

  const value = {
    compareItems,
    compareCount: compareItems.length,
    addToCompare,
    removeFromCompare,
    toggleCompare,
    clearCompare,
    isInCompare,
    maxCompareItems: MAX_COMPARE_ITEMS,
  };

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
};
