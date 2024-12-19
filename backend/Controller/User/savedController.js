const Saved=require('../../Models/User/savedSchema')
const {NotFoundError,ValidationError}=require('../../Utils/customeError')
 
const getSaved = async (req, res,next) => {
    const getsaved = await Saved.findOne({ userId: req.userId }).populate('posts');
    if (!getsaved) {
        const newSave = new Saved({
            userId: req.userId,
            posts: [],
        });

        await newSave.save(); 
        return res.status(200).json({newSave});
    }
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

const removeSaved = async (req, res,next) => {
    const { postId } = req.body;
    const data = await Saved.findOne({ userId: req.userId }).populate('posts')
    if (!data) {
        return next(new NotFoundError('Not found', 404))
    }
    const posttindex = data.posts.findIndex(pro => pro._id.toString() == postId.toString())
    console.log("posttindex",posttindex)
    if(posttindex === -1){return res.status(404).json({message:"item not found"})}
    data.posts.splice(posttindex, 1)
    

    await data.save()
    res.status(200).json({message:"removed",data})
}

module.exports = {getSaved,addToSaved,removeSaved};

