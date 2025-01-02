const express = require("express");
const router = express.Router();  
const userController = require('../Controller/User/userController');
const postcontroller = require('../Controller/User/postController');
const savedcontroller = require('../Controller/User/savedController');
const boardcontroller = require('../Controller/User/boardController');
const likecontroller = require('../Controller/User/likeController');
const commentcontroller = require('../Controller/User/commentController');

const tryCatch=require('../Middleware/tryCatch');
const upload = require("../Middleware/imageUpload");
const { userAuthMiddleware } = require("../Middleware/authentication");
const {  forgotpass } = require("../Controller/forgotPassword");
const { resetpass } = require("../Controller/resetPassword");
const { changePass } = require("../Controller/changePassword");

 

router
 .post('/signup',tryCatch(userController.userReg))
 .post('/login',tryCatch(userController.userLogin))   
 .post('/logout',userAuthMiddleware,tryCatch(userController.userLogout))
 .get('/me',userAuthMiddleware,tryCatch(userController.profileView))
 .put('/editprofile',userAuthMiddleware,upload.single('profileimage'),tryCatch(userController.editProfile))
 .get('/profile/:id',userAuthMiddleware,tryCatch(userController.userProfile))
 .post('/follow/:id',userAuthMiddleware,tryCatch(userController.followUnfollow)) 
 .post('/forgot-password',tryCatch(forgotpass))
 .post('/reset-password/:id/:token',tryCatch(resetpass))
 .put('/change-password',userAuthMiddleware,tryCatch(changePass))



 .get('/all',tryCatch(postcontroller.getAllPosts))
 .get('/post/:id',tryCatch(postcontroller.getpostbyid))
 .get('/posts/:category',tryCatch(postcontroller.getbycategory)) 
 .post('/addpost',userAuthMiddleware,upload.single('image'),tryCatch(postcontroller.addPost))
 .put('/updatepost/:id',userAuthMiddleware,upload.single('image'),tryCatch(postcontroller.postUpdate)) 
 .delete('/deletepost/:id',userAuthMiddleware,tryCatch(postcontroller.deletePost))
 .get('/postss',userAuthMiddleware,tryCatch(postcontroller.getPostByOwner))
 .get('/getposts/:id',userAuthMiddleware,tryCatch(postcontroller.getCreatedByUserId))


 .get('/saves',userAuthMiddleware,tryCatch(savedcontroller.getSaved))   
 .post('/addtosave',userAuthMiddleware,tryCatch(savedcontroller.addToSaved))  
 .delete('/removesaved',userAuthMiddleware,tryCatch(savedcontroller.removeSaved))
 
 .get('/viewlike',userAuthMiddleware,tryCatch(likecontroller.getLikedPosts))   
 .post('/like',userAuthMiddleware,tryCatch(likecontroller.likePost))  
 .delete('/unlike',userAuthMiddleware,tryCatch(likecontroller.unlikePost))
 
 .post('/createboard',userAuthMiddleware,tryCatch(boardcontroller.createBoard))  
 .post('/addtoboarad',userAuthMiddleware,tryCatch(boardcontroller.addToBoard))    
 .get('/viewbyid/:id',tryCatch(boardcontroller.viewBoardById))  
 .get('/viewboards',userAuthMiddleware,tryCatch(boardcontroller.getAllBoards))  
 .get('/board/:id',userAuthMiddleware,tryCatch(boardcontroller.getBoardsByUserId))  
 .put('/updateboard/:id',userAuthMiddleware,tryCatch(boardcontroller.updateBoardById))  
 .put('/updateboard/:id',userAuthMiddleware,tryCatch(boardcontroller.updateBoardById))  
 .delete('/deleteboard/:id',userAuthMiddleware,tryCatch(boardcontroller.deleteBoardById))  
 .delete('/removepost',userAuthMiddleware,tryCatch(boardcontroller.removeFromBoard))  





 .get('/viewcomment/:id',userAuthMiddleware,tryCatch(commentcontroller.getCommentById))  
 .post('/comment/:id',userAuthMiddleware,tryCatch(commentcontroller.commentOnPin)) 
 .delete('/deletecomment/:id',userAuthMiddleware,tryCatch(commentcontroller.deleteComment))
 .put('/editcomment/:id',userAuthMiddleware,tryCatch(commentcontroller.editComment))














 
module.exports = router; 
                   