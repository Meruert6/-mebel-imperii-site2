// frontend/src/components/ProductCard.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

export default function ProductCard({ product, onAddToCart }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const images = product.images || [product.image || '/placeholder.jpg'];
  const hasMultipleImages = images.length > 1;

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-primary)',
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-soft)',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        if (hasMultipleImages) {
          setImageIndex(1);
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setImageIndex(0);
      }}
    >
      <Link
        to={`/product/${product._id || product.id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        {/* Image Container */}
        <div style={{
          position: 'relative',
          width: '100%',
          paddingTop: '125%', // 4:5 aspect ratio
          overflow: 'hidden',
          backgroundColor: 'var(--card-bg)',
        }}>
          <img
            src={images[imageIndex]}
            alt={product.name}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'opacity 0.3s ease',
            }}
          />
        </div>

        {/* Product Info */}
        <div style={{
          padding: 'var(--spacing-md)',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            fontWeight: 500,
            marginBottom: '8px',
            color: 'var(--text-dark)',
          }}>
            {product.name}
          </h3>
          <p style={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--accent)',
            marginBottom: 'var(--spacing-sm)',
          }}>
            ${product.price}
          </p>
        </div>
      </Link>

      {/* Add to Cart Button - appears on hover */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          bottom: 'var(--spacing-md)',
          left: 'var(--spacing-md)',
          right: 'var(--spacing-md)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}>
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              if (onAddToCart) {
                onAddToCart(product);
              }
            }}
            style={{ width: '100%' }}
          >
            Add to Cart
          </Button>
        </div>
      )}
    </div>
  );
}
