import mongoose from 'mongoose';

// Define a schema for shipping address including phone for contact
const shippingAddressSchema = mongoose.Schema({
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true }, // <-- Storing phone on the order document for immutable shipping contact
});

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // <-- Enforces that a user must be logged in
  },
  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    },
  ],
  shippingAddress: { // <-- New: Shipping address details
    type: shippingAddressSchema,
    required: true,
  },
  paymentMethod: { // <-- New: Payment method selection
    type: String,
    required: true,
    enum: ['Cash on Delivery', 'UPI'], // Restrict to requested options
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  paidAt: { // Optional: useful for recording payment time for UPI
      type: Date,
  }
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;