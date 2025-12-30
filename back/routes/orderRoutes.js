import express from 'express';
import { addOrderItems, getOrders, updateOrderToDelivered, getOrderStats } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, addOrderItems) // Users create orders
    .get(protect, admin, getOrders); // Admins see all orders

router.route('/stats').get(protect, admin, getOrderStats); // For the Graph
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered); // Mark "Done"

export default router;