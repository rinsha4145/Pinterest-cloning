const Posts= require('../../Models/postSchema')
const { postValidationSchema } = require('../../Models/validation')
const {NotFoundError, ValidationError}=require('../../Utils/customeError')

//get all posts
const getAllPosts = async (req, res,next) => {
    const post = await Posts.find()
    if (!post) {
        return next(new NotFoundError('User cart not found'))
    }
    res.status(200).json(post)
}

//get post by id
const getpostbyid = async(req,res,next) => {
    const onepost = await Posts.findById(req.params.id)
    if (!onepost) {
        return next(new NotFoundError('product not found'))
    }
    res.json(onepost)
}

//get pin by category

const getbycategory = async (req, res, next) => {
    try {
        const { category } = req.params; 
        console.log("Category parameter received:", category);  // logs the category from the URL

        // Perform the query
        const posts = await Posts.find({ category: category });

        // Check if posts are found
        if (!posts || posts.length === 0) {
            return next(new NotFoundError('Posts not found for this category.'));
        }

        // Send the found posts in the response
        res.json(posts);
    } catch (error) {
        // Error handling
        console.error("Error fetching posts:", error);
        return next(error);  // Propagate the error to the next middleware
    }
};


//add post by a user
const addPost = async (req, res,next) => {
    const { error, value } = postValidationSchema.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message)) 
    }
    const { title, description, category, tags  } = value;
    if (!req.file) {
        return next(new ValidationError("No file uploaded"));
    
    }
    // Ensure userId is set from the middleware
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

        res.status(200).json({status:"success", message:"pin added successfully",newPost});
};

module.exports = {getAllPosts,getpostbyid,addPost,getbycategory};
