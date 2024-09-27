import express from 'express';
import { body, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import { News } from '../models/News.js';

const router = express.Router();

// Create a new news article
router.post('/', async (req, res) => {
  const { title, content, author, publishedDate, isPublished } = req.body;

  try {
    if ((!title, !content, !author, !publishedDate, !isPublished)) {
      return res.status(400).send({
        success: false,
        msg: 'Send all required fields: title, content, author, publishedDate, isPublished',
      });
    }

    const newArticle = {
      title,
      content,
      author,
      publishedDate,
      isPublished,
    };

    const addedData = await News.create(newArticle);
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

// Get all news articles
router.get('/', async (req, res) => {
  try {
    const articles = await News.find({});

    return res.status(200).send({
      success: true,
      count: articles.length,
      data: articles,
    });
  } catch (error) {
    console.log(err.message);
    return res.status(500).send({
      success: false,
      msg: err.message,
    });
  }
});

// Get a single news article by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // Check if the ObjectId is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      msg: 'Invalid format',
    });
  }

  try {
    const article = await News.findById(id);
    if (!article) {
      return res.status(404).json({
        success: false,
        msg: 'Article not found',
      });
    }

    return res.status(200).send({
      success: true,
      data: article,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      success: false,
      msg: err.message,
    });
  }
});

// Update a news article by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // Check if the ObjectId is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid format' });
  }

  try {
    const article = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select('-createdAt -updatedAt');
    if (!article) {
      return res.status(404).json({
        success: false,
        msg: 'Article not found',
      });
    }

    // Check for changes
    const updatedData = await News.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated user
      runValidators: true, // Validate the update against the schema
    })
      .lean()
      .select('-createdAt -updatedAt');

    // If no fields were changed, return a 204 No Content response
    if (JSON.stringify(updatedData) === JSON.stringify(article)) {
      return res.status(204).json(); // No content
    }

    // Return the updated user
    return res.status(200).json({
      success: true,
      data: updatedData,
      msg: 'Successfully updated',
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      success: false,
      msg: err.message,
    });
  }
});

// Delete a news article by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // Check if the ObjectId is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      msg: 'Invalid format',
    });
  }

  try {
    const article = await News.findByIdAndDelete(id);
    if (!article) {
      return res.status(404).json({
        success: false,
        msg: 'Article not found',
      });
    }

    // Return the success response
    return res.status(200).json({
      success: true,
      msg: 'Successfully deleted',
    });
    // res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: 'Error deleting article', error });
  }
});

// Export the router
export default router;
