// frontend/src/pages/Cart.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function Cart({ cartItems, onRemoveItem, onUpdateQuantity }) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  return (
    <div className="container" style={{ padding: 'var(--spacing-xl) 0' }}>
      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '32px',
        marginBottom: 'var(--spacing-xl)',
      }}>
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
          <p style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--spacing-md)',
          }}>
            Your cart is empty
          </p>
          <Link to="/">
            <Button variant="primary">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: 'var(--spacing-xl)',
        }}>
          {/* Cart Items */}
          <div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: 'var(--spacing-md)',
                  padding: 'var(--spacing-md)',
                  borderBottom: '1px solid var(--border)',
                  marginBottom: 'var(--spacing-md)',
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: '4px',
                  boxShadow: 'var(--shadow-soft)',
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
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 500,
                    marginBottom: '8px',
                    color: 'var(--text-dark)',
                  }}>
                    {item.name}
                  </h3>
                  {item.size && (
                    <p style={{
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      marginBottom: '4px',
                    }}>
                      Size: {item.size}
                    </p>
                  )}
                  {item.color && (
                    <p style={{
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      marginBottom: 'var(--spacing-sm)',
                    }}>
                      Color: {item.color}
                    </p>
                  )}

                  {/* Quantity Controls */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)',
                    marginBottom: 'var(--spacing-sm)',
                  }}>
                    <button
                      onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, item.quantity - 1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--bg-primary)',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      −
                    </button>
                    <span style={{
                      fontSize: '16px',
                      minWidth: '30px',
                      textAlign: 'center',
                      fontWeight: 500,
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, item.quantity + 1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--bg-primary)',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      +
                    </button>
                  </div>

                  <p style={{
                    fontSize: '20px',
                    fontWeight: 700,
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
                    fontSize: '24px',
                    padding: '4px',
                    alignSelf: 'flex-start',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'var(--accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'var(--text-secondary)';
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{
            backgroundColor: 'var(--card-bg)',
            padding: 'var(--spacing-md)',
            borderRadius: '4px',
            height: 'fit-content',
            position: 'sticky',
            top: '100px',
            boxShadow: 'var(--shadow-soft)',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '24px',
              marginBottom: 'var(--spacing-md)',
            }}>
              Order Summary
            </h2>

            <div style={{
              borderBottom: '1px solid var(--border)',
              paddingBottom: 'var(--spacing-sm)',
              marginBottom: 'var(--spacing-sm)',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
              }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal:</span>
                <span style={{ fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
                <span style={{ color: 'var(--text-secondary)' }}>Shipping:</span>
                <span style={{ fontWeight: 600 }}>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 'var(--spacing-md)',
              fontSize: '20px',
              fontWeight: 700,
            }}>
              <span>Total:</span>
              <span style={{ color: 'var(--accent)' }}>${total.toFixed(2)}</span>
            </div>

            <Button
              variant="primary"
              style={{ width: '100%', marginBottom: 'var(--spacing-sm)' }}
              onClick={() => {
                // Navigate to checkout
                console.log('Checkout');
              }}
            >
              Checkout
            </Button>

            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button variant="secondary" style={{ width: '100%' }}>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

