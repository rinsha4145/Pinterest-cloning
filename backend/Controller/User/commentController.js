const Posts = require('../../Models/postSchema');
const commentOnPin = async (req, res) => {
    const { comment } = req.body;
    if (!comment || comment.trim() === "") {
      return res.status(400).json({ message: "Comment is required" });
    }
    const pin = await Posts.findById(req.params.id).populate('comments.user');
    if (!pin) {
      return res.status(404).json({ message: "No Pin found with this ID" });
    }

    pin.comments.push({
      user: req.userId,
      comment,
    });
    await pin.save();

    res.status(200).json({ message: "Comment added successfully",pin });
  
};

 const deleteComment = async (req, res) => {
    const pin = await Posts.findById(req.params.id);
  
    if (!pin)
      return res.status(400).json({
        message: "No Pin with this id",
      });
  
    if (!req.query.commentId)
      return res.status(404).json({
        message: "Please give comment id",
      });
  
    const commentIndex = pin.comments.findIndex(
      (item) => item._id.toString() === req.query.commentId.toString()
    );
  
    if (commentIndex === -1) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }
    const comment = pin.comments[commentIndex];

  if (comment.user.toString() === req.user._id.toString()) {
    pin.comments.splice(commentIndex, 1);

    await pin.save();

    return res.json({
      message: "Comment Deleted",
    });
  } else {
    return res.status(403).json({
      message: "You are not owner of this comment",
    });
  }
};

module.exports = {commentOnPin,deleteComment};
