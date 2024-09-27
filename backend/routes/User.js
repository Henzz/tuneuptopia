import express from 'express';
import { body, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import { User } from '../models/User.js';

const router = express.Router();

// Create User
router.post('/', async (req, res) => {
  try {
    if (
      (!req.body.username,
      !req.body.email,
      !req.body.password,
      !req.body.firstName,
      !req.body.lastName)
    ) {
      return res.status(400).send({
        success: false,
        msg: 'Send all required fields: username, email, password, firstName, lastName',
      });
    }

    const newUser = {
      username: req.body.username,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: 'user',
    };

    const existingUser = await User.findOne({ email: newUser.email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        msg: 'Email already exists',
      });
    }

    const addedData = await User.create(newUser);
    return res.status(201).send({
      success: true,
      data: addedData,
      msg: 'Successfully created',
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      success: false,
      msg: err.message,
    });
  }
});

// Get Users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});

    return res.status(200).send({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      success: false,
      msg: err.message,
    });
  }
});

// Get User by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ObjectId is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        msg: 'Invalid user ID format',
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: 'User not found',
      });
    }

    return res.status(200).send({
      success: true,
      data: user,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      success: false,
      msg: err.message,
    });
  }
});

// Update user
router.put(
  '/:id',
  [
    body('username').optional().isLength({ min: 3, max: 30 }).trim(),
    body('email').optional().isEmail().normalizeEmail(),
    body('password').optional().isLength({ min: 6 }),
    body('firstName').optional().isLength({ max: 50 }).trim(),
    body('lastName').optional().isLength({ max: 50 }).trim(),
  ],
  async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const updateData = req.body;

    // Check if the ObjectId is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    try {
      // Find user by ID
      const user = await User.findById(id)
        .lean()
        .select('-createdAt -updatedAt');
      if (!user) {
        return res.status(404).json({
          success: false,
          msg: 'User not found',
        });
      }

      // Check if username already exists
      const existingUser = await User.findOne({ username: updateData.username });
      if (existingUser && existingUser._id != id) {
        return res.status(400).json({
          success: false,
          msg: 'Username already in use',
          data: existingUser
        });
      }

      // Check for changes
      const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true, // Return the updated user
        runValidators: true, // Validate the update against the schema
      })
        .lean()
        .select('-createdAt -updatedAt');

      // If no fields were changed, return a 204 No Content response
      if (
        !updatedUser ||
        JSON.stringify(updatedUser) === JSON.stringify(user)
      ) {
        return res.status(204).send(); // No content
      }

      // Return the updated user
      return res.status(200).json({
        success: true,
        data: updatedUser,
        msg: 'Successfully updated',
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        success: false,
        msg: err.message,
      });
    }
  }
);

// Delete user
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // Check if the ObjectId is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      msg: 'Invalid user ID format',
    });
  }

  try {
    // Find and delete the user by ID
    const user = await User.findByIdAndDelete(id);

    // If the user is not found, return a 404 response
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: 'User not found',
      });
    }

    // Return the success response
    return res.status(200).json({
      success: true,
      msg: 'Successfully deleted',
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      success: false,
      msg: err.message,
    });
  }
});

export default router;
