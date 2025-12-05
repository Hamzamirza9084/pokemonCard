import Order from '../models/Order.js';
import User from '../models/User.js'; // <-- New: Import User model

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (Now explicitly checking session)
const addOrderItems = async (req, res) => {
  const userId = req.session?.user?._id;
  
  // 1. Enforce Login ("without login user cannot order")
  if (!userId) {
    res.status(401).json({ message: 'Not authorized, please log in to place an order' });
    return;
  }
  
  // Destructure new fields from the request body (assuming client sends shipping details)
  const { 
    orderItems, 
    shippingAddress, // Expected to be { address, city, postalCode, country }
    paymentMethod, 
    totalPrice 
  } = req.body;

  // Basic validation
  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  }
  
  // Payment method validation
  if (!paymentMethod || (paymentMethod !== 'Cash on Delivery' && paymentMethod !== 'UPI')) {
    res.status(400).json({ message: 'Invalid payment method. Choose either "Cash on Delivery" or "UPI".' });
    return;
  }

  // Fetch the logged-in user's details to get the phone number
  const user = await User.findById(userId);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  
  // 2. Validate and attach user phone detail
  if (!user.phone) {
    // Optional: Force user to update profile before ordering
    res.status(400).json({ message: 'Please update your profile with a phone number before placing an order.' });
    return;
  }
  
  // Complete shipping address validation
  if (!shippingAddress || !shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
    res.status(400).json({ message: 'Missing shipping address details' });
    return;
  }
  
  const order = new Order({
    orderItems,
    user: userId, // Attach logged-in user's ID
    shippingAddress: { // Attach shipping details from request and user's phone from DB
        ...shippingAddress,
        phone: user.phone, 
    },
    paymentMethod, // Attach payment method
    totalPrice,
    // Set isPaid and paidAt based on payment method
    isPaid: paymentMethod === 'UPI', 
    paidAt: paymentMethod === 'UPI' ? new Date() : null,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
};

export { addOrderItems };