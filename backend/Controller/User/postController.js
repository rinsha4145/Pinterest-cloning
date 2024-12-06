const Posts= require('../../Models/postSchema')
const {NotFoundError}=require('../../Utils/customeError')


const getAllPosts = async (req, res,next) => {
    const post = await Posts.find()
    if (!post) {
        return next(new NotFoundError('User cart not found'))
    }
    res.status(200).json(post)
    // console.log(product.length)
}
module.exports = {getAllPosts};
