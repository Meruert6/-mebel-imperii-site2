// frontend/src/components/SizeSelector.jsx

import React from 'react';

export default function SizeSelector({ sizes = ['S', 'M', 'L', 'XL'], selectedSize, onSelect }) {
  return (
    <div>
      <label style={{
        display: 'block',
        marginBottom: 'var(--spacing-sm)',
        fontSize: '14px',
        fontWeight: 500,
        color: 'var(--text-dark)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}>
        Size
      </label>
      <div style={{
        display: 'flex',
        gap: 'var(--spacing-sm)',
        flexWrap: 'wrap',
      }}>
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect && onSelect(size)}
            style={{
              width: '48px',
              height: '48px',
              border: selectedSize === size ? '2px solid var(--accent)' : '1px solid var(--border)',
              backgroundColor: selectedSize === size ? 'var(--accent)' : 'var(--bg-primary)',
              color: selectedSize === size ? '#FFFFFF' : 'var(--text-dark)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              borderRadius: '4px',
            }}
            onMouseEnter={(e) => {
              if (selectedSize !== size) {
                e.target.style.borderColor = 'var(--accent)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedSize !== size) {
                e.target.style.borderColor = 'var(--border)';
              }
            }}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

