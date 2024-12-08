const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const postSchema = new Schema({
  title: {type: String,required: true,maxlength: 200},
  description: {type: String,maxlength: 500},
  image: {type: String,required: true},
  link: {type: String},
  category: {type: String,enum: ['Food', 'Fashion', 'Travel', 'DIY', 'Tech', 'Home', 'Other'],required: true},
  tags: {type: [String]},
  userId: {type:mongoose.Schema.ObjectId,ref: 'Users',required: true},
  boardId: {type: Schema.Types.ObjectId,ref: 'Board',},
  likesCount: {type: Number,default: 0},
  commentsCount: {type: Number,default: 0},
  savesCount: {type: Number,default: 0},
  viewsCount: {type: Number,default: 0},
  createdAt: {type: Date,default: Date.now }
});

// Create a model from the schema
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
