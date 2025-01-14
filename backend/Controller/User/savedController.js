const Saved=require('../../Models/User/savedSchema')  
const {NotFoundError,ValidationError}=require('../../Utils/customeError')
 
// get all the saved posts
const getSaved = async (req, res,next) => {
    const getsaved = await Saved.findOne({ userId: req.userId }).populate('posts'); 
    return res.status(200).json({getsaved}); 

};

// add a post to save
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
        save.posts.push(postId);
        await save.save()
        saved=await save.populate('posts')
        return res.status(201).json({message:"post saved",saved});

    }
    return next(new ValidationError('post already saved', 404))   

};
const removeSaved = async (req, res, next) => {
        const { postId } = req.body;
        if (!postId) {
            return res.status(400).json({ message: 'Post ID is required' });
        }

        const data = await Saved.findOne({ userId: req.userId }).populate('posts'); 
        if (!data) {
            return next(new NotFoundError('Not found', 404));
        }

        const postIndex = data.posts.findIndex(post => post._id.toString() === postId.toString());
        if (postIndex === -1) {
            return res.status(404).json({ message: 'Item not found' });
        }
        data.posts.splice(postIndex, 1);
        await data.save();
        res.status(200).json({ message: 'Removed', data });
  
};

module.exports = {getSaved,addToSaved,removeSaved};

