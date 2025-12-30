import express from 'express';
import { 
  authUser, 
  registerUser, 
  logoutUser, 
  getUserProfile, 
  updateUserProfile, 
  getUsers // <--- Import the new function
} from '../controllers/authController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

// --- NEW ROUTE FOR ADMIN CHAT ---
router.route('/').get(protect, admin, getUsers); 
// -------------------------------

export default router;