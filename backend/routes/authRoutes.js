import express from 'express';

import { getUsers } from '../controllers/authController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile, // Import the new controller
} from '../controllers/authController.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.route('/profile')
  .get(getUserProfile)
  .put(updateUserProfile); // Add PUT request handling

router.route('/').post(registerUser).get(protect, admin, getUsers);

export default router;

