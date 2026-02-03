// frontend/src/pages/Category.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import api from '../api';
import ProductCard from '../components/ProductCard';

export default function Category({ onAddToCart }) {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    size: '',
    color: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = { category };
        if (searchParams.get('sale') === 'true') {
          params.onSale = true;
        }
        const response = await api.get('/products', { params });
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, searchParams]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredProducts = products.filter(product => {
    if (filters.priceMin && product.price < parseFloat(filters.priceMin)) return false;
    if (filters.priceMax && product.price > parseFloat(filters.priceMax)) return false;
    if (filters.size && !product.sizes?.includes(filters.size)) return false;
    return true;
  });

  return (
    <div className="container" style={{ padding: 'var(--spacing-xl) 0' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '250px 1fr',
        gap: 'var(--spacing-xl)',
      }}>
        {/* Filters Sidebar */}
        <aside style={{
          backgroundColor: 'var(--card-bg)',
          padding: 'var(--spacing-md)',
          borderRadius: '4px',
          height: 'fit-content',
          position: 'sticky',
          top: '100px',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '20px',
            marginBottom: 'var(--spacing-md)',
          }}>
            Filters
          </h3>

          {/* Price Filter */}
          <div style={{ marginBottom: 'var(--spacing-md)' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: 'var(--spacing-sm)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Price
            </label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                type="number"
                placeholder="Min"
                value={filters.priceMin}
                onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.priceMax}
                onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              />
            </div>
          </div>

          {/* Size Filter */}
          <div style={{ marginBottom: 'var(--spacing-md)' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: 'var(--spacing-sm)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Size
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['S', 'M', 'L', 'XL'].map(size => (
                <button
                  key={size}
                  onClick={() => handleFilterChange('size', filters.size === size ? '' : size)}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: filters.size === size ? '2px solid var(--accent)' : '1px solid var(--border)',
                    backgroundColor: filters.size === size ? 'var(--accent)' : 'var(--bg-primary)',
                    color: filters.size === size ? '#FFFFFF' : 'var(--text-dark)',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: 'var(--spacing-sm)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Color
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['#000000', '#FFFFFF', '#808080', '#000080'].map(color => (
                <button
                  key={color}
                  onClick={() => handleFilterChange('color', filters.color === color ? '' : color)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: color,
                    border: filters.color === color ? '3px solid var(--accent)' : '2px solid var(--border)',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '32px',
            marginBottom: 'var(--spacing-md)',
            textTransform: 'capitalize',
          }}>
            {category || 'All Products'}
          </h1>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
              Loading...
            </div>
          ) : (
            <div className="grid grid-3" style={{ gap: 'var(--spacing-md)' }}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
              <p style={{ color: 'var(--text-secondary)' }}>No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

