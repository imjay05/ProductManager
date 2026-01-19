import React from 'react';

// ProductCard Component - Displays product information using props
const ProductCard = ({ product, onDelete, onEdit }) => {
  return (
    <div className="product-card">
      <div className="product-header">
        <h3 className="product-name">{product.name}</h3>
        <span className="product-category">{product.category}</span>
      </div>
      
      <p className="product-description">{product.description}</p>
      
      <div className="product-footer">
        <div className="product-price-container">
          <span className="price-label">Price</span>
          <span className="product-price">${product.price.toFixed(2)}</span>
        </div>
        
        <div className="product-actions">
          <button
            onClick={() => onEdit(product)}
            className="btn btn-warning btn-small"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onDelete(product._id)}
            className="btn btn-danger btn-small"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
      
      <div className="product-meta">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {new Date(product.createdAt).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        })}
      </div>
    </div>
  );
};

export default ProductCard;