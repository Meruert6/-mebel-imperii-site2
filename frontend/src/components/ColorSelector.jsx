// frontend/src/components/ColorSelector.jsx

import React from 'react';

export default function ColorSelector({ 
  colors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Gray', value: '#808080' },
    { name: 'Navy', value: '#000080' },
  ], 
  selectedColor, 
  onSelect 
}) {
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
        Color
      </label>
      <div style={{
        display: 'flex',
        gap: 'var(--spacing-sm)',
        flexWrap: 'wrap',
      }}>
        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() => onSelect && onSelect(color.value)}
            title={color.name}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: color.value,
              border: selectedColor === color.value 
                ? '3px solid var(--accent)' 
                : '2px solid var(--border)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: selectedColor === color.value ? 'var(--shadow-soft)' : 'none',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
              e.target.style.boxShadow = 'var(--shadow-soft)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              if (selectedColor !== color.value) {
                e.target.style.boxShadow = 'none';
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

