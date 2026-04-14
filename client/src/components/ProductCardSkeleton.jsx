import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <article className="product-skeleton" aria-hidden="true">
      <div className="skeleton skeleton-image" />
      <div className="skeleton-content">
        <div className="skeleton skeleton-line title" />
        <div className="skeleton skeleton-line" />
        <div className="skeleton skeleton-line short" />
      </div>
    </article>
  );
};

export default ProductCardSkeleton;
