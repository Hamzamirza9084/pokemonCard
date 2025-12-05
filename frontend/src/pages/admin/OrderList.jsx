import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
        const { data } = await api.get('/orders');
        setOrders(data);
    } catch (error) { alert("Not authorized"); }
  };

  useEffect(() => { fetchOrders(); }, []);

 const deliverHandler = async (id) => {
    try {
      // FIX: Use 'api' instead of 'axios'
      // FIX: Use the 'id' argument instead of 'orderId'
      // FIX: Removed undefined 'config'
      await api.put(`/orders/${id}/deliver`, {});
      
      // Refresh the list
      fetchOrders();
    } catch (error) {
      console.error(error);
      alert("Could not update delivery status");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Orders</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{textAlign:'left', background:'#eee'}}>
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED (Done/Left)</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} style={{borderBottom:'1px solid #ddd'}}>
              <td>{order._id}</td>
              <td>{order.user && order.user.name}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>${order.totalPrice}</td>
              <td>
                  {order.isPaid ? <span style={{color:'green'}}>Paid</span> : <span style={{color:'red'}}>Not Paid</span>}
              </td>
              <td>
                  {order.isDelivered ? 
                    <span style={{color:'green'}}>Done (Delivered)</span> : 
                    <span style={{color:'orange'}}>Left (Pending)</span>
                  }
              </td>
              <td>
                {!order.isDelivered && (
                  <button onClick={() => deliverHandler(order._id)} style={{background:'#333', color:'white'}}>
                    Mark as Done
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default OrderList;