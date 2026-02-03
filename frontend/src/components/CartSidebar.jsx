// frontend/src/components/CartSidebar.jsx

import React from 'react';
import Button from './Button';

export default function CartSidebar({ isOpen, onClose, cartItems, onRemoveItem, onUpdateQuantity }) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: isOpen ? 0 : '-500px',
          width: '400px',
          maxWidth: '90vw',
          height: '100vh',
          backgroundColor: 'var(--bg-primary)',
          boxShadow: '-4px 0 16px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          transition: 'right 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{
          padding: 'var(--spacing-md)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '20px',
            color: 'var(--text-dark)',
          }}>
            Shopping Cart
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: 'var(--text-dark)',
              padding: '4px 8px',
            }}
          >
            ×
          </button>
        </div>

        {/* Cart Items */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: 'var(--spacing-md)',
        }}>
          {cartItems.length === 0 ? (
            <p style={{
              color: 'var(--text-secondary)',
              textAlign: 'center',
              marginTop: 'var(--spacing-xl)',
            }}>
              Your cart is empty
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: 'var(--spacing-sm)',
                  padding: 'var(--spacing-sm) 0',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {/* Image */}
                <img
                  src={item.image || '/placeholder.jpg'}
                  alt={item.name}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    backgroundColor: 'var(--card-bg)',
                  }}
                />

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: '4px',
                    color: 'var(--text-dark)',
                  }}>
                    {item.name}
                  </h4>
                  {item.size && (
                    <p style={{
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      marginBottom: '4px',
                    }}>
                      Size: {item.size}
                    </p>
                  )}
                  {item.color && (
                    <p style={{
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      marginBottom: '8px',
                    }}>
                      Color: {item.color}
                    </p>
                  )}

                  {/* Quantity Controls */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                  }}>
                    <button
                      onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, item.quantity - 1)}
                      style={{
                        width: '24px',
                        height: '24px',
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--bg-primary)',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      −
                    </button>
                    <span style={{ fontSize: '14px', minWidth: '20px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, item.quantity + 1)}
                      style={{
                        width: '24px',
                        height: '24px',
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--bg-primary)',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      +
                    </button>
                  </div>

                  <p style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--accent)',
                  }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => onRemoveItem && onRemoveItem(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)',
                    fontSize: '20px',
                    padding: '4px',
                    alignSelf: 'flex-start',
                  }}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{
            padding: 'var(--spacing-md)',
            borderTop: '1px solid var(--border)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 'var(--spacing-md)',
            }}>
              <span style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--text-dark)',
              }}>
                Subtotal:
              </span>
              <span style={{
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--accent)',
              }}>
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <Button
              variant="primary"
              style={{ width: '100%' }}
              onClick={() => {
                // Navigate to checkout
                console.log('Checkout');
              }}
            >
              Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

