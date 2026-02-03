// frontend/src/pages/Product.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import Button from '../components/Button';
import SizeSelector from '../components/SizeSelector';
import ColorSelector from '../components/ColorSelector';

export default function Product({ onAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState(0);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
        if (res.data.images && res.data.images.length > 0) {
          setMainImage(0);
        }
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    if (onAddToCart) {
      onAddToCart({
        ...product,
        size: selectedSize,
        color: selectedColor,
        quantity: 1,
      });
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>Loading...</div>;
  }

  if (!product) {
    return <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>Product not found</div>;
  }

  const images = product.images || [product.image || '/placeholder.jpg'];
  const sizes = product.sizes || ['S', 'M', 'L', 'XL'];
  const colors = product.colors || [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Gray', value: '#808080' },
  ];

  return (
    <div className="container" style={{ padding: 'var(--spacing-xl) 0' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--spacing-xl)',
      }}>
        {/* Left: Images */}
        <div>
          {/* Main Image */}
          <div style={{
            width: '100%',
            paddingTop: '125%',
            position: 'relative',
            marginBottom: 'var(--spacing-sm)',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}>
            <img
              src={images[mainImage]}
              alt={product.name}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Thumbnail Images */}
          {images.length > 1 && (
            <div style={{
              display: 'flex',
              gap: 'var(--spacing-sm)',
            }}>
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(index)}
                  style={{
                    width: '80px',
                    height: '80px',
                    padding: 0,
                    border: mainImage === index ? '2px solid var(--accent)' : '1px solid var(--border)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    backgroundColor: 'var(--card-bg)',
                  }}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '40px',
            marginBottom: 'var(--spacing-md)',
            color: 'var(--text-dark)',
          }}>
            {product.name}
          </h1>

          <p style={{
            fontSize: '32px',
            fontWeight: 700,
            color: 'var(--accent)',
            marginBottom: 'var(--spacing-md)',
          }}>
            ${product.price}
          </p>

          {product.description && (
            <p style={{
              fontSize: '16px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: 'var(--spacing-lg)',
            }}>
              {product.description}
            </p>
          )}

          {/* Size Selector */}
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <SizeSelector
              sizes={sizes}
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
            />
          </div>

          {/* Color Selector */}
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <ColorSelector
              colors={colors}
              selectedColor={selectedColor}
              onSelect={setSelectedColor}
            />
          </div>

          {/* Add to Cart Button */}
          <Button
            variant="primary"
            size="large"
            onClick={handleAddToCart}
            style={{ width: '100%', marginBottom: 'var(--spacing-md)' }}
          >
            Add to Cart
          </Button>

          {/* Product Details */}
          <div style={{
            padding: 'var(--spacing-md)',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '4px',
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              marginBottom: 'var(--spacing-sm)',
            }}>
              Product Details
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              fontSize: '14px',
              color: 'var(--text-secondary)',
            }}>
              {product.category && (
                <li style={{ marginBottom: '8px' }}>Category: {product.category}</li>
              )}
              {product.stock !== undefined && (
                <li style={{ marginBottom: '8px' }}>
                  Stock: {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

