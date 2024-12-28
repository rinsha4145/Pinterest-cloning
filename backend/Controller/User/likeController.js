const Like=require('../../Models/User/likeSchema')
const {NotFoundError,ValidationError}=require('../../Utils/customeError')
 
const getLike = async (req, res,next) => {
    const getlikedPosts = await Like.findOne({ userId: req.userId }).populate('posts');
    return res.status(200).json({getlikedPosts});

};

const addToLike = async (req, res,next) => {
    const { postId } = req.body;   
    let like = await Like.findOne({ userId: req.userId })

    if (!like) {
        const newLike = new Like({
            userId: req.userId,
            posts: [postId]
        });
        await newLike.save()
       const updated= await newLike.populate("posts")
        return res.status(201).json({message:"post saved",updated});
        
    }
    const isPostILike = like && Array.isArray(like.posts) && like.posts.some(post => post && post.equals && post.equals(postId));

    if (!isPostILike) {
        // If not, push the product ID to the products array
        like.posts.push(postId);
        await like.save()
        liked=await like.populate('posts')
        return res.status(201).json({message:"post saved",liked});

    }
    return next(new ValidationError('post already saved', 404))   


};
const removeLike = async (req, res, next) => {
        const { postId } = req.body;

        // Check if postId is provided
        if (!postId) {
            return res.status(400).json({ message: 'Post ID is required' });
        }

        // Find the saved data using userId
        const data = await Like.findOne({ userId: req.userId }).populate('posts'); 
        if (!data) {
            return next(new NotFoundError('Not found', 404));
        }

        // Check if the postId exists in the saved posts array
        const postIndex = data.posts.findIndex(post => post._id.toString() === postId.toString());

        // If the post is not found
        if (postIndex === -1) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Remove the post from the saved posts array
        data.posts.splice(postIndex, 1);

        // Save the updated data
        await data.save();

        // Return success response
        res.status(200).json({ message: 'Removed', data });
  
};

module.exports = {getLike,addToLike,removeLike};

