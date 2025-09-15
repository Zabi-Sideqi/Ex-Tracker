// backend/routes/authRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
     registerUser,
     loginUser,
     getUserInfo,

} from '../controllers/authController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);



// Get user profile
router.get('/getUser', protect, getUserInfo);

// Upload image
router.post('/images-upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    res.status(200).json({ imageUrl });
});

export default router;
