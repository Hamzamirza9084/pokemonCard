import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import api from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // State for Shipping Details and Payment Method
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '' 
  });
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  // Handle Input Changes
  const handleInputChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault(); 
    
    if (cartItems.length === 0) return;

    // Basic Form Validation (Client side)
    if (!shippingAddress.address || !shippingAddress.city) {
      alert('Please fill in all shipping address details.');
      return;
    }

    setLoading(true);
    try {
      const orderPayload = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item._id
        })),
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        totalPrice: totalPrice,
      };

      const res = await api.post('/orders', orderPayload);
      
      if (res.status === 201) {
        setSuccess(true);
        clearCart();
      }

    } catch (error) {
      console.error('Checkout failed:', error);
      
      const status = error.response ? error.response.status : null;
      const message = error.response?.data?.message || '';

      // 1. Handle "Not Authorized" -> Redirect to Login
      if (status === 401) {
        alert('You must be logged in to place an order.');
        navigate('/login');
      } 
      // 2. Handle "Missing Phone Number" -> Redirect to Profile [NEW LOGIC]
      else if (message === 'Please update your profile with a phone number before placing an order.') {
        alert(message);
        navigate('/profile'); 
      }
      // 3. Handle other errors
      else {
        alert(message || 'Failed to place order. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2 style={{ color: 'green' }}>Order Placed Successfully!</h2>
        <p>Payment Method: {paymentMethod}</p>
        <p>We will contact you at: {shippingAddress.phone}</p>
        <Link to="/" style={{ textDecoration: 'underline', color: 'blue' }}>Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Go Shop!</Link></p>
      ) : (
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          
          {/* LEFT COLUMN: Cart Items */}
          <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                    style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: Shipping & Payment Form */}
          <div style={{ flex: 1, border: '1px solid #ddd', padding: '20px', borderRadius: '8px', height: 'fit-content' }}>
            <h2>Shipping Details</h2>
            <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
              <input 
                type="text" 
                name="address" 
                placeholder="Address" 
                value={shippingAddress.address} 
                onChange={handleInputChange} 
                required 
                style={{ padding: '10px' }}
              />
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  name="city" 
                  placeholder="City" 
                  value={shippingAddress.city} 
                  onChange={handleInputChange} 
                  required 
                  style={{ padding: '10px', flex: 1 }}
                />
                <input 
                  type="text" 
                  name="postalCode" 
                  placeholder="Postal Code" 
                  value={shippingAddress.postalCode} 
                  onChange={handleInputChange} 
                  required 
                  style={{ padding: '10px', flex: 1 }}
                />
              </div>

              <input 
                type="text" 
                name="country" 
                placeholder="Country" 
                value={shippingAddress.country} 
                onChange={handleInputChange} 
                required 
                style={{ padding: '10px' }}
              />

              {/* Note: Phone is now optional here because we use the Profile phone number, 
                  but you can keep it to allow users to specify a shipping-specific contact */}
              <input 
                type="tel" 
                name="phone" 
                placeholder="Shipping Contact Number" 
                value={shippingAddress.phone} 
                onChange={handleInputChange} 
                // required // Removed required here if relying strictly on Profile phone
                style={{ padding: '10px' }}
              />

              <hr style={{ margin: '20px 0' }} />

              <h2>Payment Method</h2>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    value="Cash on Delivery" 
                    checked={paymentMethod === 'Cash on Delivery'} 
                    onChange={(e) => setPaymentMethod(e.target.value)} 
                  />
                  Cash on Delivery
                </label>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    value="UPI" 
                    checked={paymentMethod === 'UPI'} 
                    onChange={(e) => setPaymentMethod(e.target.value)} 
                  />
                  UPI
                </label>
              </div>

              <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                <h3>Total: ${totalPrice}</h3>
              </div>

              <button 
                type="submit"
                disabled={loading}
                style={{ 
                  background: '#27ae60', 
                  color: 'white', 
                  border: 'none', 
                  padding: '12px 24px', 
                  fontSize: '1.1rem', 
                  borderRadius: '4px', 
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;