import express from 'express';
import { 
  getProducts, 
  getProductById, 
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

router.route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  // Use upload.single('image') middleware here for image uploads
  .put(protect, admin, upload.single('image'), updateProduct);

export default router;