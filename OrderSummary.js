import React from 'react';
import { useNavigate } from 'react-router-dom';

function OrderSummary({ cart }) {
  const navigate = useNavigate();

  const formatCurrency = (amount) => `₹${(amount || 0).toFixed(2)}`;

  const { subtotal, totalQuantity } = cart.reduce(
    (acc, item) => {
      const cleanPrice = String(item.price).replace(/[₹,]/g, '').trim();
      const itemPrice = parseFloat(cleanPrice) || 0;
      const itemQuantity = parseInt(item.quantity) || 0;

      acc.subtotal += itemPrice * itemQuantity;
      acc.totalQuantity += itemQuantity;

      return acc;
    },
    { subtotal: 0, totalQuantity: 0 }
  );

  const TAX_RATE = 0.01; // 1% GST
  const tax = subtotal * TAX_RATE;
  const grandTotal = subtotal + tax;

  const handleCheckout = () => {
    navigate('/track');
  };

  return (
    <div
      className="order-summary-card"
      style={{
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        background: '#fff',
        width: '300px',
      }}
    >
      <h3 className="order-title" style={{ marginBottom: '10px' }}>
        🛒 Your Order
      </h3>

      <div style={{ marginBottom: '10px' }}>
        {cart.length === 0 ? (
          <p style={{ color: '#888', fontSize: '14px' }}>No items in cart.</p>
        ) : (
          cart.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '4px',
                fontSize: '14px',
              }}
            >
              <span>{item.name}</span>
              <span>x{item.quantity}</span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))
        )}
      </div>

      <hr />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '10px 0',
          fontWeight: 'bold',
        }}
      >
        <span>{totalQuantity} Items</span>
        <span>x{totalQuantity}</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>

      <hr />

      <div style={{ fontSize: '14px', marginBottom: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Subtotal:</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Tax (1% GST):</span>
          <span>{formatCurrency(tax)}</span>
        </div>
      </div>

      <hr />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontWeight: 'bold',
          fontSize: '15px',
        }}
      >
        <span>Grand Total:</span>
        <span>{formatCurrency(grandTotal)}</span>
      </div>

      {/* 🟡 Yellow Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={totalQuantity === 0}
        style={{
          marginTop: '15px',
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: totalQuantity === 0 ? '#ccc' : '#FFD700',
          color: '#000',
          fontWeight: 'bold',
          cursor: totalQuantity === 0 ? 'not-allowed' : 'pointer',
          transition: 'background 0.3s ease',
        }}
      >
        Proceed to Checkout (to Payment Table)
      </button>
    </div>
  );
}

export default OrderSummary;
