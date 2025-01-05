const Post = require('../../Models/postSchema'); // Import Post model
const mongoose = require("mongoose");

// like a post
const likePost = async (req, res, next) => {
  const { postId } = req.body;  
  const userId = req.userId; 
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }
    const post = await Post.findById(postId);   

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.likedBy.includes(userId)) {
      return res.status(400).json({ message: 'You have already liked this post' });
    }
    post.likedBy.push(userId);
    await post.save(); 
    return res.status(200).json({ message: 'Post liked successfully', post });
};

//unlike a post
const unlikePost = async (req, res, next) => {
    const { postId } = req.body;  
    const userId = req.userId;  
      const post = await Post.findById(postId);  
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      if (!post.likedBy.includes(userId)) {
        return res.status(400).json({ message: 'You have not liked this post' });
      }
  
      post.likedBy.pull(userId);
      await post.save(); 
      return res.status(200).json({ message: 'Post unliked successfully', post });
    
  };

//get all liked posts by the current userid
  const getLikedPosts = async (req, res, next) => {
    const userId = req.userId; 
    const likedPosts = await Post.find({ likedBy: userId }).populate('owner', 'name email');  // Find posts where the userId is in the likedBy array
  
    if (likedPosts.length === 0) {
      return res.status(404).json({ message: 'No liked posts found' });
    }
  
    return res.status(200).json({ likedPosts });
   
  };
  
module.exports = { getLikedPosts,likePost,unlikePost };
