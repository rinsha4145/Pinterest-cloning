const Post = require("../../Models/postSchema");

// delete Post
const deletePost = async (req, res) => {
  const postId = req.params.id;
  const deletedPost = await Post.findByIdAndDelete(postId);
  if (!deletedPost) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.status(200).json({ message: "Post deleted successfully", deletedPost });
};
const getPostsByDate = async (req, res) => {
  const now = new Date();
  // Define date ranges
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfToday.getDate() - startOfToday.getDay()); // Start of the current week (Sunday)
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // Start of the current month

  // Query posts based on `updatedAt`
  const postsToday = await Post.find({ createdAt: { $gte: startOfToday } });
  const postsThisWeek = await Post.find({ createdAt: { $gte: startOfWeek } });
  const postsThisMonth = await Post.find({ createdAt: { $gte: startOfMonth } });

  res.json({
    today: postsToday,
    thisWeek: postsThisWeek,
    thisMonth: postsThisMonth,
  });
};

module.exports = { deletePost, getPostsByDate };
