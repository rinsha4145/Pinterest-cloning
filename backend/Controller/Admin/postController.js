const Post = require('../../Models/postSchema');
const deletePost = async (req, res) => {
      const postId = req.params.id;
      const deletedPost = await Post.findByIdAndDelete(postId);
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json({ message: 'Post deleted successfully', deletedPost });  
  };
  
  module.exports = {deletePost};
  