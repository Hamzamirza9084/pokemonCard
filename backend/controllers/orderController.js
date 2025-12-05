import Order from '../models/Order.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Public (or Private if you enforce auth)
const addOrderItems = async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  }

  // If you have auth middleware, you can use req.user._id
  const order = new Order({
    orderItems,
    user: req.session?.user?._id || null, // Attach user if logged in
    totalPrice,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
};

export { addOrderItems };