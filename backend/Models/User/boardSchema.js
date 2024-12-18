const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema for the Board with timestamps
const boardSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 100,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
}, { timestamps: true }); // Add timestamps option to automatically handle createdAt and updatedAt

// Create a model from the schema
const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
