// frontend/src/components/CategoryCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryCard({ category, image, path }) {
  return (
    <Link
      to={path}
      style={{
        position: 'relative',
        display: 'block',
        textDecoration: 'none',
        overflow: 'hidden',
        borderRadius: '4px',
        boxShadow: 'var(--shadow-soft)',
        transition: 'all 0.3s ease',
        height: '100%',
        minHeight: '400px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-medium)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
      }}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '32px',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          }}>
            {category}
          </h2>
        </div>
      </div>
    </Link>
  );
}

