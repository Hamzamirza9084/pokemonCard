import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setLoading(true);
    try {
      // Create order object
      const order = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item._id
        })),
        totalPrice: totalPrice,
      };

      // Send to backend
      // Note: In a real app, we'd pass the auth token automatically via axios cookie
      await api.post('/orders', order);
      
      setSuccess(true);
      clearCart();
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2 style={{ color: 'green' }}>Order Placed Successfully!</h2>
        <p>Thank you for shopping with us.</p>
        <Link to="/pokemon-tcg" style={{ textDecoration: 'underline', color: 'blue' }}>Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/pokemon-tcg">Go Shop!</Link></p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {cartItems.map((item) => (
            <div key={item._id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              borderBottom: '1px solid #eee', 
              padding: '15px 0' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                <div>
                  <h4>{item.name}</h4>
                  <p>${item.price} x {item.qty}</p>
                </div>
              </div>
              <div>
                <span style={{ fontWeight: 'bold', marginRight: '15px' }}>${(item.price * item.qty).toFixed(2)}</span>
                <button 
                  onClick={() => removeFromCart(item._id)}
                  style={{ 
                    background: '#e74c3c', 
                    color: 'white', 
                    border: 'none', 
                    padding: '5px 10px', 
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '30px', textAlign: 'right' }}>
            <h2>Total: ${totalPrice}</h2>
            <button 
              onClick={handleCheckout}
              disabled={loading}
              style={{ 
                background: '#27ae60', 
                color: 'white', 
                border: 'none', 
                padding: '12px 24px', 
                fontSize: '1.1rem', 
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;