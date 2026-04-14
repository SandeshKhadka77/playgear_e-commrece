import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import { useCompare } from '../hooks/useCompare';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';
import StateBlock from '../components/StateBlock';
import '../styles/compare.css';

const ComparePage = () => {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  if (compareItems.length === 0) {
    return (
      <section className="compare-shell">
        <StateBlock
          title="No products selected"
          message="Add up to 3 products from product cards to compare side by side."
          actionLabel="Browse products"
          actionTo="/products"
        />
      </section>
    );
  }

  return (
    <section className="compare-shell">
      <div className="compare-head">
        <h1>Compare Products</h1>
        <button
          type="button"
          className="compare-clear-btn"
          onClick={() => {
            clearCompare();
            showToast('Comparison list cleared.', 'info');
          }}
        >
          Clear Compare
        </button>
      </div>

      <div className="compare-table-wrap">
        <table className="compare-table">
          <thead>
            <tr>
              <th>Attribute</th>
              {compareItems.map((item) => (
                <th key={item._id || item.id}>
                  <Link to={`/product/${item._id || item.id}`}>{item.name}</Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Image</td>
              {compareItems.map((item) => (
                <td key={`img-${item._id || item.id}`}>
                  <img src={item.image} alt={item.name} className="compare-thumb" />
                </td>
              ))}
            </tr>
            <tr>
              <td>Category</td>
              {compareItems.map((item) => (
                <td key={`cat-${item._id || item.id}`}>{item.category || '-'}</td>
              ))}
            </tr>
            <tr>
              <td>Price</td>
              {compareItems.map((item) => (
                <td key={`price-${item._id || item.id}`}>Rs. {Number(item.price || 0).toLocaleString()}</td>
              ))}
            </tr>
            <tr>
              <td>Rating</td>
              {compareItems.map((item) => (
                <td key={`rating-${item._id || item.id}`}>{Number(item.rating || 0).toFixed(1)}</td>
              ))}
            </tr>
            <tr>
              <td>Stock</td>
              {compareItems.map((item) => (
                <td key={`stock-${item._id || item.id}`}>{Number(item.countInStock ?? 0)}</td>
              ))}
            </tr>
            <tr>
              <td>Actions</td>
              {compareItems.map((item) => (
                <td key={`action-${item._id || item.id}`}>
                  <div className="compare-actions">
                    <button
                      type="button"
                      className="compare-cart-btn"
                      onClick={() => {
                        addToCart(item);
                        showToast(`${item.name} added to cart.`, 'success');
                      }}
                    >
                      <FiShoppingBag />
                      <span>Add</span>
                    </button>
                    <button
                      type="button"
                      className="compare-remove-btn"
                      onClick={() => {
                        removeFromCompare(item._id || item.id);
                        showToast(`${item.name} removed from compare.`, 'info');
                      }}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ComparePage;
