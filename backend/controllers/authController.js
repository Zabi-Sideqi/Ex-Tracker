// backend/controllers/authController.js
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Generate JWT token
export const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};
//Register User
// Register User
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, profilePhoto } = req.body;

    // Validation: check for missing fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    // Validation: check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    // Skicka in plain password – modellen sköter hashningen
    const user = new User({
      username,
      email,
      password,
      profilePhoto: profilePhoto || '',
    });

    await user.save();

    const token = generateToken(user);

    // Return token + safe user object (no password)
    res.status(201).json({
      
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePhoto: user.profilePhoto,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      token
    });
  } catch (error) {
    console.error('registerUser error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    //Validation: check for missing fields
    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = generateToken(user);
    res.status(200).json({
       
       user: {
         id: user._id,
         username: user.username,
         email: user.email,
         profilePhoto: user.profilePhoto,
         createdAt: user.createdAt,
         updatedAt: user.updatedAt
       },
       token
    });
};


// Get User Info
export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('getUserInfo error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};