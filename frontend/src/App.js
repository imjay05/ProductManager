import React, { useState, useEffect } from 'react';
import './App.css';

// Card Component - Displays product information
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

// Main App Component
export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'General'
  });

  const API_URL = 'http://localhost:5000/api/products';

  // Fetch products from backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Create or Update product
  const handleSubmit = async () => {
    try {
      const url = editingProduct 
        ? `${API_URL}/${editingProduct._id}` 
        : API_URL;
      
      const method = editingProduct ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price)
        }),
      });

      if (!response.ok) throw new Error('Failed to save product');

      await fetchProducts();
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete product');

      await fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      category: product.category
    });
    setShowForm(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      category: 'General'
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  return (
    <div className="app-container">
      <div className="app-wrapper">
        {/* Header */}
        <header className="app-header">
          <div className="header-title">
            <span className="header-emoji">🛍️</span>
            <h1>Product Manager</h1>
          </div>
          <p className="header-subtitle">
            <span className="status-dot"></span>
            Full-Stack MERN Application
          </p>
          
          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card blue">
              <div className="stat-label">Total Products</div>
              <div className="stat-value">{products.length}</div>
            </div>
            <div className="stat-card green">
              <div className="stat-label">Total Value</div>
              <div className="stat-value">
                ${products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
              </div>
            </div>
            <div className="stat-card purple">
              <div className="stat-label">Categories</div>
              <div className="stat-value">
                {new Set(products.map(p => p.category)).size}
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary"
          >
            {showForm ? (
              <>✕ Close Form</>
            ) : (
              <>+ Add New Product</>
            )}
          </button>
        </header>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="form-container">
            <h2 className="form-title">
              {editingProduct ? '✏️ Edit Product' : '✨ Add New Product'}
            </h2>
            
            <div className="form-group">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="form-input"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Enter product description"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="General">General</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Food">Food</option>
                <option value="Books">Books</option>
              </select>
            </div>

            <div className="form-actions">
              <button onClick={handleSubmit} className="btn btn-success">
                {editingProduct ? '💾 Update Product' : '✨ Add Product'}
              </button>
              <button onClick={resetForm} className="btn btn-secondary">
                ✕ Cancel
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="error-container">
            <div className="error-content">
              <span className="error-icon">⚠️</span>
              <div className="error-text">
                <strong>Error:</strong> {error}
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-text">Loading products...</div>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            {products.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <p className="empty-title">No products yet</p>
                <p className="empty-subtitle">Click "Add New Product" to get started!</p>
              </div>
            ) : (
              <div className="products-grid">
                {products.map(product => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}