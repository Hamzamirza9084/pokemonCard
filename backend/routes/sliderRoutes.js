import express from 'express';
const router = express.Router();
import { getSliders, createSlider, deleteSlider } from '../controllers/sliderController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // Adjust path if needed
import upload from '../middleware/uploadMiddleware.js'; // Your Cloudinary middleware

router.route('/')
  .get(getSliders)
  .post(protect, admin, upload.single('image'), createSlider);

router.route('/:id')
  .delete(protect, admin, deleteSlider);

export default router;