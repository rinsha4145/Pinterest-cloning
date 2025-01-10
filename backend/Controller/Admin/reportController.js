const Post = require('../../Models/postSchema');

// Function to get all reports
const getReports = async (req, res) => {
  try {
    // Fetch reports along with the reportedBy user details
    const reports = await Post.find({ 'reports.0': { $exists: true } })
      .populate('reports.reportedBy', 'name email' )  // Populate the reportedBy field with user details
      // .select('title description reports');  // Select only the necessary fields

    res.status(200).json({reports});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error });
  }
};

module.exports = {getReports};
