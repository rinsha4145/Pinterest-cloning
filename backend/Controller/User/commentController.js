const Posts = require('../../Models/postSchema');



const commentOnPin = TryCatch(async (req, res) => {
    const pin = await Posts.findById(req.params.id);
  
    if (!pin)
      return res.status(400).json({
        message: "No Pin with this id",
      });
  
    pin.comments.push({
      user: req.req.userId,
      name: req.user.name,
      comment: req.body.comment,
    });
  
    await pin.save();
  
    res.json({
      message: "Comment Added",
    });
  });

 const deleteComment = TryCatch(async (req, res) => {
    const pin = await Pin.findById(req.params.id);
  
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
});

module.exports = {commentOnPin,deleteComment};
