const Saved=require('../../Models/User/savedSchema')
const {NotFoundError,ValidationError}=require('../../Utils/customeError')
 
const getSaved = async (req, res,next) => {
    const getsaved = await Saved.findOne({ userId: req.userId }).populate('posts');
    return res.status(200).json({getsaved});

};


const addToSaved = async (req, res,next) => {
    const { postId } = req.body;   
    let save = await Saved.findOne({ userId: req.userId })

    if (!save) {
        const newsaved = new Saved({
            userId: req.userId,
            posts: [postId]
        });
        await newsaved.save()
       const updatedsave= await newsaved.populate("posts")
        return res.status(201).json({message:"post saved",updatedsave});
        
    }
    const isPostISaved = save && Array.isArray(save.posts) && save.posts.some(post => post && post.equals && post.equals(postId));

    if (!isPostISaved) {
        // If not, push the product ID to the products array
        save.posts.push(postId);
        await save.save()
        saved=await save.populate('posts')
        return res.status(201).json({message:"post saved",saved});

    }
    return next(new ValidationError('post already saved', 404))


};
const removeSaved = async (req, res, next) => {
    
        const { postId } = req.body;

        // Check if postId is provided
        if (!postId) {
            return res.status(400).json({ message: 'Post ID is required' });
        }

        // Find the saved data using userId
        const data = await Saved.findOne({ userId: req.userId }).populate('posts');
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

module.exports = {getSaved,addToSaved,removeSaved};

