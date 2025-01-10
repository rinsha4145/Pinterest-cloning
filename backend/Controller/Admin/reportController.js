const Post = require('../../Models/postSchema');

// Function to get all reports
const getReports = async (req, res) => {
    const reports = await Post.find({ 'reports.0': { $exists: true } })
      .populate('reports.reportedBy', 'name email' )
    res.status(200).json({reports});
};

// Function to dismiss reports of a post
const dismissReports = async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findByIdAndUpdate(
      postId,
      { $set: { reports: [] } },  // Set reports to an empty array
      { new: true }  // Return the updated post
    );

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Reports dismissed successfully', post });
  
};


module.exports = {getReports,dismissReports};
