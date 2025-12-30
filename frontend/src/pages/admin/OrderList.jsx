import React, { useEffect, useState } from 'react';
import api from '../../api/axios'; // Adjust path if necessary

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  
  // NEW: State to track which order ID is currently expanded
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders');
      setOrders(data);
    } catch (error) {
      alert("Not authorized");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const deliverHandler = async (id) => {
    try {
      await api.put(`/orders/${id}/deliver`, {});
      fetchOrders();
    } catch (error) {
      console.error(error);
      alert("Could not update delivery status");
    }
  };

  // NEW: Toggle function
  const toggleDetails = (id) => {
    if (expandedOrderId === id) {
      setExpandedOrderId(null); // Close if already open
    } else {
      setExpandedOrderId(id); // Open specific ID
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Orders Management</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', background: '#eee' }}>
            <th style={{ padding: '10px' }}>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            // We use React.Fragment because we are returning TWO rows per order
            <React.Fragment key={order._id}>
              {/* --- MAIN SUMMARY ROW --- */}
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>₹{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    <span style={{ color: 'green', fontWeight: 'bold' }}>Paid</span>
                  ) : (
                    <span style={{ color: 'red', fontWeight: 'bold' }}>Not Paid</span>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <span style={{ color: 'green', fontWeight: 'bold' }}>Delivered</span>
                  ) : (
                    <span style={{ color: 'orange', fontWeight: 'bold' }}>Pending</span>
                  )}
                </td>
                <td>
                  {/* Button to Toggle Details */}
                  <button
                    onClick={() => toggleDetails(order._id)}
                    style={{
                      marginRight: '10px',
                      cursor: 'pointer',
                      padding: '5px 10px',
                      background: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px'
                    }}
                  >
                    {expandedOrderId === order._id ? 'Hide Details' : 'View Details'}
                  </button>

                  {!order.isDelivered && (
                    <button
                      onClick={() => deliverHandler(order._id)}
                      style={{
                        cursor: 'pointer',
                        padding: '5px 10px',
                        background: '#333',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px'
                      }}
                    >
                      Mark Done
                    </button>
                  )}
                </td>
              </tr>

              {/* --- EXPANDED DETAILS ROW --- */}
              {expandedOrderId === order._id && (
                <tr style={{ background: '#f9f9f9' }}>
                  {/* colSpan=7 ensures this cell takes up the full width of the table */}
                  <td colSpan="7" style={{ padding: '20px', borderBottom: '2px solid #ccc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                      
                      {/* Section 1: Order Items */}
                      <div style={{ flex: 2, minWidth: '300px' }}>
                        <h3 style={{ marginTop: 0 }}>Items Ordered</h3>
                        <table style={{ width: '100%', border: '1px solid #ddd' }}>
                          <tbody>
                            {order.orderItems.map((item, index) => (
                              <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '5px' }}>
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                                  />
                                </td>
                                <td style={{ padding: '5px' }}>{item.name}</td>
                                <td style={{ padding: '5px' }}>{item.qty} x ₹{item.price} = <b>₹{item.qty * item.price}</b></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Section 2: Shipping Info */}
                      <div style={{ flex: 1, minWidth: '250px', background: '#fff', padding: '15px', border: '1px solid #ddd' }}>
                        <h3 style={{ marginTop: 0 }}>Shipping Address</h3>
                        <p><strong>Address:</strong> {order.shippingAddress.address}</p>
                        <p><strong>City:</strong> {order.shippingAddress.city} {order.shippingAddress.postalCode}</p>
                        <p><strong>Country:</strong> {order.shippingAddress.country}</p>
                        <p><strong>Phone:</strong> {order.shippingAddress.phone}</p>
                      </div>

                      {/* Section 3: Payment Info */}
                      <div style={{ flex: 1, minWidth: '250px', background: '#fff', padding: '15px', border: '1px solid #ddd' }}>
                        <h3 style={{ marginTop: 0 }}>Payment Info</h3>
                        <p><strong>Method:</strong> {order.paymentMethod}</p>
                        <p><strong>Status:</strong> {order.isPaid ? `Paid at ${order.paidAt?.substring(0, 10)}` : 'Not Paid'}</p>
                        <p><strong>Delivered:</strong> {order.isDelivered ? `Delivered at ${order.deliveredAt?.substring(0, 10)}` : 'Not Delivered'}</p>
                      </div>

                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;