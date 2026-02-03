// frontend/src/components/Button.jsx

import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick,
  disabled,
  type = 'button',
  ...props 
}) {
  const baseStyles = {
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    borderRadius: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontSize: '14px',
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--accent)',
      color: '#FFFFFF',
      padding: size === 'large' ? '16px 32px' : size === 'small' ? '10px 20px' : '14px 28px',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: 'var(--accent)',
      border: '1px solid var(--accent)',
      padding: size === 'large' ? '16px 32px' : size === 'small' ? '10px 20px' : '14px 28px',
    },
    success: {
      backgroundColor: 'var(--success)',
      color: '#FFFFFF',
      padding: size === 'large' ? '16px 32px' : size === 'small' ? '10px 20px' : '14px 28px',
    },
  };

  const hoverStyles = !disabled ? {
    opacity: 0.9,
    transform: 'translateY(-1px)',
    boxShadow: 'var(--shadow-medium)',
  } : {
    opacity: 0.5,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...baseStyles,
        ...variants[variant],
        ...hoverStyles,
        ...props.style,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          Object.assign(e.target.style, hoverStyles);
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}

