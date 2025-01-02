const Posts = require('../../Models/postSchema');
const { postValidationSchema } = require('../../Models/validation');
const { NotFoundError, ValidationError } = require('../../Utils/customeError');
const Category = require('../../Models/Admin/categorySchema');
const mongoose = require("mongoose");

// Get all posts
const getAllPosts = async (req, res, next) => {
        const posts = await Posts.find().populate("category") // Fetch posts without authentication checks
        res.status(200).json(posts);
};

// Get post by ID
const getpostbyid = async (req, res, next) => {
    const onepost = await Posts.findById(req.params.id).populate("category owner comments.user");   
    if (!onepost) {
        return next(new NotFoundError('Post not found'));  
    }   
    res.json({onepost});  
};      

// Get posts by category 
const getbycategory = async (req, res, next) => {
    const { category } = req.params; 
    const categoryDoc = await Category.findOne({ name: category }); 
    const posts = await Posts.find({ category: categoryDoc._id  }).populate("category"); 
    if (!categoryDoc) {
        return next(new NotFoundError('Category not found.'));
    }
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
    const { title, description, category, tags, link } = value;
    if (!req.file) {
        return next(new ValidationError("No file uploaded")); 
    }
    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized: User ID not found" });
    }

    // Ensure category is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(category)) {
        return next(new ValidationError("Invalid category ID"));
    }

    const data = await Category.findById(category);  // Use findById instead of findOne when passing an ObjectId directly
    if (!data) {
        return next(new ValidationError("Category not found"));
    }

    let name = data.name;
    console.log("Category", data.name);

    // Query by object with correct field name
    const existingCategory = await Category.findOne({ _id: category });
    console.log("existingCategory", existingCategory);

    if (!existingCategory) {
        return next(new ValidationError("Category does not exist"));
    }

    const validatedTags = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());
    const image = req.file?.path;
    const newPost = new Posts({
        title,
        description,
        category: existingCategory._id,  // Use the ObjectId of the category
        image,
        tags: validatedTags, 
        link,
        owner: req.userId,
    });

    await newPost.save();
    console.log(newPost);
    res.status(200).json({ status: "success", message: "Post added successfully", newPost });
};

 
//get the posts created by the owner 
const getPostByOwner=async(req,res,next)=>{
    const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const posts = await Posts.find({ owner: userId }).populate("category");
    // if (posts.length === 0) {
    //     return res.status(404).json({ message: "No posts found for this user." });
    // }
   
    // Return the posts in the response
    return res.status(200).json({posts});  
   
}

// View all creted for a specific user
const getCreatedByUserId = async (req, res, next) => {
    const { id } = req.params; // Extract id from req.params

        const posts = await Posts.find({ owner: id });


        if (!posts) {
            return res.status(404).json({ error: 'Posts not found' });
        }

        res.status(200).json({posts});
   
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


module.exports = { getAllPosts, getpostbyid, addPost, getbycategory,postUpdate,deletePost,getPostByOwner,getCreatedByUserId };
 