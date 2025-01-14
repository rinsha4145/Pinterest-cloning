const Category = require("../../Models/Admin/categorySchema");
const { NotFoundError, ValidationError } = require("../../Utils/customeError");
const { validateCategory } = require("../../Models/validation");

// get all category
const getAllCategory = async (req, res, next) => {
  const category = await Category.find();
  res.status(200).json({ category });
};

// add category
const addCategory = async (req, res, next) => {
  const { error, value } = validateCategory.validate(req.body);
  if (error) {
    return next(new ValidationError(error.details[0].message));
  }
  const { name } = value;
  const excisting = await Category.findOne({ name });
  if (excisting) {
    return next(new ValidationError("Category name already exists."));
  }
  const newCategory = new Category({
    name,
  });
  await newCategory.save();
  res
    .status(200)
    .json({
      status: "success",
      message: "Post added successfully",
      newCategory,
    });
};

// delete category
const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return next(new NotFoundError("Category not found."));
  }
  await Category.findByIdAndDelete(id);
  res
    .status(200)
    .json({ status: "success", message: "Category deleted successfully" });
};

// get category by id
const getCategoryById = async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return next(new NotFoundError("Category not found."));
  }
  res.status(200).json({ category });
};

// update category
const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { error, value } = validateCategory.validate(req.body);
  if (error) {
    return next(new ValidationError(error.details[0].message));
  }
  const category = await Category.findById(id);
  if (!category) {
    return next(new NotFoundError("Category not found."));
  }
  const updatedCategory = await Category.findByIdAndUpdate(id, value, {
    new: true,
  });
  res
    .status(200)
    .json({
      status: "success",
      message: "Category updated successfully",
      updatedCategory,
    });
};
module.exports = {
  getAllCategory,
  addCategory,
  deleteCategory,
  getCategoryById,
  updateCategory,
};
