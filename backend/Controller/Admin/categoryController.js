const Category = require('../../Models/Admin/categorySchema');
const { NotFoundError, ValidationError } = require('../../Utils/customeError');
const {validateCategory}=require ('../../Models/validation')

const getAllCategory = async (req, res, next) => {
    const category = await Category.find();
    res.status(200).json({category});
};

const addCategory = async (req, res, next) => { 
    const { error, value } = validateCategory.validate(req.body);
    if (error) {
        return next(new ValidationError(error.details[0].message)); 
    }
    const { name } = value;
    const excisting=await Category.findOne({name})
    if(excisting){
        return next(new ValidationError("Category name already exists.")); 
    }
    // if (!req.userId) {
    //     return res.status(401).json({ message: "Unauthorized: User ID not found" });
    // }
    
    const newCategory = new Category({
        name,
    });
    await newCategory.save();
    res.status(200).json({ status: "success", message: "Post added successfully", newCategory });
};

module.exports = {getAllCategory,addCategory};
