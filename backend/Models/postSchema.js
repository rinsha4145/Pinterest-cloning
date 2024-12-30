const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const postSchema = new Schema({
  title: { type: String,maxlength: 200 },
  description: { type: String, maxlength: 500 },
  image: { type: String, required: true },
  link: { type: String },
  category: { 
    type: Schema.Types.ObjectId, 
    ref: "Category", // Reference to Category schema
    required: true 
  },
  tags: { type: [String] },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  boardId: { type: Schema.Types.ObjectId, ref: 'Board' },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
      name: { type: String, required: true },
      comment: { type: String, required: true },
      reply: { type: [String], required: false } // Made reply optional
    }
  ],
  
  savesCount: { type: Number, default: 0 },
  viewsCount: { type: Number, default: 0 },

  likedBy: [
    { 
      type: mongoose.Schema.ObjectId, 
      ref: 'Users' // Reference to Users schema 
    }
  ],
  viewsCount: { type: Number, default: 0 },
}, { timestamps: true }); 

// Create a model from the schema
module.exports = mongoose.model('Post', postSchema);
