const Post = require('../../Models/postSchema');
const deletePost = async (req, res) => {
    try {
      // Extract post ID from request parameters
      const postId = req.params.id;
  
      // Find and delete the post by ID
      const deletedPost = await Post.findByIdAndDelete(postId);
  
      // Check if the post was found and deleted
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Respond with a success message
      res.status(200).json({ message: 'Post deleted successfully', deletedPost });
    } catch (error) {
      // Handle errors
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  module.exports = {deletePost};
  