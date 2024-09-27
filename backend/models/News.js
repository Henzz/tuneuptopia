import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    publishedDate: {
      type: Date,
      default: Date.now, // Automatically set to current date
    },
    isPublished: {
      type: Boolean,
      default: false, // Flag to indicate if the news article is published
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create a model from the schema
export const News = mongoose.model('News', newsSchema);
