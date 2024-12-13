const Posts = require('../../Models/postSchema');
const { postValidationSchema } = require('../../Models/validation');
const { NotFoundError, ValidationError } = require('../../Utils/customeError');

// Get all posts
const getAllPosts = async (req, res, next) => {
        const posts = await Posts.find(); // Fetch posts without authentication checks
        res.status(200).json(posts);
};

// Get post by ID
const getpostbyid = async (req, res, next) => {
    const onepost = await Posts.findById(req.params.id);
    if (!onepost) {
        return next(new NotFoundError('Post not found'));
    }
    res.json(onepost);
};

// Get posts by category
const getbycategory = async (req, res, next) => {
    const { category } = req.params; 
    const posts = await Posts.find({ category: category });
    if (!posts || posts.length === 0) {
        return next(new NotFoundError('Posts not found for this category.'));
    }
    res.json({posts});
};

// Add post by a user
const addPost = async (req, res, next) => {
    const { error, value } = postValidationSchema.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message)); 
    }
    const { title, description, category, tags } = value;
    if (!req.file) {
        return next(new ValidationError("No file uploaded"));
    }
    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized: User ID not found" });
    }
    const image = req.file?.path;
    const newPost = new Posts({
        title,
        description,
        category,
        image,
        tags, 
        owner: req.userId,
    });
    await newPost.save();
    res.status(200).json({ status: "success", message: "Post added successfully", newPost });
};

//update a post by the owner
const postUpdate = async (req, res, next) => {
    const { error, value } = postValidationSchema.validate(req.body);
    if (error) {
        console.log(error.details[0].message)
        return next(new ValidationError('Validation failed', 400));
    }
    if (req.file) {
        value.image = req.file.path;
    }
    
    const updatedPost = await Posts.findByIdAndUpdate(req.params.id, value, { new: true });   
    if (!updatedPost) {
        return next(new NotFoundError('Post not found with this ID', 404));
    }
    if (updatedPost.owner.toString() !== req.userId.toString())
        return res.status(403).json({
          message: "Unauthorized",
        });

    return res.status(200).json({updatedPost});
};

//delete a post by its owner
const deletePost=async(req,res,next)=>{
    const deleteProduct = await Posts.findByIdAndDelete(req.params.id)
    console.log(deleteProduct)
    if (!deleteProduct) {
        return next(new NotFoundError('Product with this ID is not found', 404))
    }
    if (deleteProduct.owner.toString() !== req.userId.toString())
        return res.status(403).json({
          message: "Unauthorized",
        });
    // await cloudinary.v2.uploader.destroy(deleteProduct.image.id);

    // await Cart.updateMany(
    //     { 'products.productId': req.params.id },
    //     { $pull: { products: { productId: req.params.id } } }
    // )

    res.status(200).json("Post deleted successfully");
}


module.exports = { getAllPosts, getpostbyid, addPost, getbycategory,postUpdate,deletePost };
 