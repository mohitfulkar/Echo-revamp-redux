import Category from "../models/Category.js";

// @desc Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? req.file.path : "";

    // Check for duplicate name
    const exists = await Category.findOne({ name });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Category with this name already exists",
      });
    }

    const category = await Category.create({
      name,
      description,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// @desc Get all active categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort("name");
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// @desc Get a single category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// @desc Update category
export const updateCategory = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;
    const image = req.file ? req.file.path : undefined;

    const updatedData = {
      ...(name && { name }),
      ...(description && { description }),
      ...(typeof isActive !== "undefined" && { isActive }),
      ...(image && { image }),
      updatedAt: new Date(),
    };

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// @desc Soft delete (deactivate) category
export const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndUpdate(
      req.params.id,
      { isActive: false, updatedAt: new Date() },
      { new: true }
    );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deactivated successfully",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
