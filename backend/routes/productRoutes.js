import express from 'express';
import { 
  getProducts, 
  getProductById, 
  deleteProduct,
  updateProduct,
  createProduct
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // Import middleware

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct); // Admin create

router.route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct) // Admin delete
  .put(protect, admin, updateProduct);   // Admin update

export default router;