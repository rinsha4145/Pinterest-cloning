const Post = require('../../Models/postSchema'); // Import Post model

const likePost = async (req, res, next) => {
  const { postId } = req.body;  // Get postId from request body
  const userId = req.userId;  // Assuming the userId is available in req.userId from authentication middleware

  try {
    const post = await Post.findById(postId);  // Find the post by ID

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user has already liked the post
    if (post.likedBy.includes(userId)) {
      return res.status(400).json({ message: 'You have already liked this post' });
    }

    // Add the userId to the likedBy array
    post.likedBy.push(userId);
    await post.save();  // Save the updated post

    return res.status(200).json({ message: 'Post liked successfully', post });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error liking the post' });
  }
};


const unlikePost = async (req, res, next) => {
    const { postId } = req.body;  // Get postId from request body
    const userId = req.userId;  // Assuming the userId is available in req.userId from authentication middleware
  
    try {
      const post = await Post.findById(postId);  // Find the post by ID
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Check if the user has liked the post
      if (!post.likedBy.includes(userId)) {
        return res.status(400).json({ message: 'You have not liked this post' });
      }
  
      // Remove the userId from the likedBy array
      post.likedBy.pull(userId);
      await post.save();  // Save the updated post
  
      return res.status(200).json({ message: 'Post unliked successfully', post });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error unliking the post' });
    }
  };

  const getLikedPosts = async (req, res, next) => {
    const userId = req.userId;  // Assuming the userId is available in req.userId from authentication middleware
  
    try {
      const likedPosts = await Post.find({ likedBy: userId }).populate('owner', 'name email');  // Find posts where the userId is in the likedBy array
  
      if (likedPosts.length === 0) {
        return res.status(404).json({ message: 'No liked posts found' });
      }
  
      return res.status(200).json({ likedPosts });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching liked posts' });
    }
  };
  
module.exports = { getLikedPosts,likePost,unlikePost };
