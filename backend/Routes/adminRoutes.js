const express = require("express");
const router = express.Router();
const categorycontroller = require('../Controller/Admin/categoryController');
const tryCatch=require('../Middleware/tryCatch');


router
.get('/category',tryCatch(categorycontroller.getAllCategory))
.post('/addcategory',tryCatch(categorycontroller.addCategory))


module.exports = router; 
