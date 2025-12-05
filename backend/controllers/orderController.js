import Order from '../models/Order.js';
import User from '../models/User.js'; 

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  try {
    const userId = req.session?.user?._id;
    
    // 1. Enforce Login
    if (!userId) {
      return res.status(401).json({ message: 'Not authorized, please log in to place an order' });
    }
    
    const { 
      orderItems, 
      shippingAddress, 
      paymentMethod, 
      totalPrice 
    } = req.body;

    // 2. Validate Items
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }
    
    // 3. Validate Payment Method
    if (!paymentMethod || (paymentMethod !== 'Cash on Delivery' && paymentMethod !== 'UPI')) {
      return res.status(400).json({ message: 'Invalid payment method.' });
    }

    // 4. Fetch user for phone number
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // 5. Validate Phone
    const contactPhone = user.phone || shippingAddress?.phone;
    if (!contactPhone) {
      return res.status(400).json({ message: 'Phone number is required for shipping.' });
    }
    
    // 6. Validate Address
    if (!shippingAddress || !shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
      return res.status(400).json({ message: 'Complete shipping address is required' });
    }

    // Construct the Order
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x.product || x._id, // Handle cases where frontend might send _id instead of product
      })),
      user: userId,
      shippingAddress: { 
          address: shippingAddress.address,
          city: shippingAddress.city,
          postalCode: shippingAddress.postalCode,
          country: shippingAddress.country,
          phone: contactPhone
      },
      paymentMethod: paymentMethod, 
      totalPrice: Number(totalPrice),
      isPaid: paymentMethod === 'UPI', 
      paidAt: paymentMethod === 'UPI' ? new Date() : null,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);

  } catch (error) {
    console.error("Create Order Error:", error); // Log the specific error to console
    res.status(500).json({ message: error.message || 'Failed to create order' });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
  // 1. Find the EXISTING order
  const order = await Order.findById(req.params.id);

  if (order) {
    // 2. Update fields
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    // 3. Save (This triggers the validation error if the fetched 'order' is missing data)
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

// @desc    Get daily sales stats for graph
// @route   GET /api/orders/stats
// @access  Private/Admin
const getOrderStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await Order.aggregate([
      { $match: { createdAt: { $gte: lastYear } } }, 
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$totalPrice",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { addOrderItems, getOrders, updateOrderToDelivered, getOrderStats };