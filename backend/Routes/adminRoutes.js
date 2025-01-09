const express = require("express");
const router = express.Router();
const admincontroller = require('../Controller/Admin/adminController');
const categorycontroller = require('../Controller/Admin/categoryController');
const usercontroller = require('../Controller/Admin/userController');

const tryCatch=require('../Middleware/tryCatch');
const { adminAuthMiddleware } = require("../Middleware/authentication");
 
router
.post('/admlogin',tryCatch(admincontroller.adminLogin))   
.post('/admlogout',adminAuthMiddleware,tryCatch(admincontroller.adminLogout))

.get('/viewusers',adminAuthMiddleware,tryCatch(usercontroller.allUsers))
.get('/viewuserbyid/:id',adminAuthMiddleware,tryCatch(usercontroller.viewUserById))
.post('/updateuser/:id',adminAuthMiddleware,tryCatch(usercontroller.blockUser))

.get('/category',tryCatch(categorycontroller.getAllCategory))
.post('/addcategory',adminAuthMiddleware,tryCatch(categorycontroller.addCategory))
.delete('/deletecategory/:id',adminAuthMiddleware,tryCatch(categorycontroller.deleteCategory))


module.exports = router; 
