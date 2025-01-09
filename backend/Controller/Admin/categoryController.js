const Category = require('../../Models/Admin/categorySchema');
const { NotFoundError, ValidationError } = require('../../Utils/customeError');
const {validateCategory}=require ('../../Models/validation')

//get all category
const getAllCategory = async (req, res, next) => {
    const category = await Category.find();
    res.status(200).json({category});
};

//add category
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
    const newCategory = new Category({
        name,
    });
    await newCategory.save();
    res.status(200).json({ status: "success", message: "Post added successfully", newCategory });
};

//delete category
const deleteCategory = async (req, res, next) => {
    const { id } = req.params; // Extract the category ID from request parameters

    try {
        // Find the category by ID
        const category = await Category.findById(id);

        // If category does not exist, throw a NotFoundError
        if (!category) {
            return next(new NotFoundError("Category not found."));
        }

        // Delete the category
        await Category.findByIdAndDelete(id);

        res.status(200).json({ status: "success", message: "Category deleted successfully" });
    } catch (error) {
        // Pass any errors to the error-handling middleware
        next(error);
    }
};
module.exports = {getAllCategory,addCategory,deleteCategory};
