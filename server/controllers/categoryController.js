import Category from "../models/Category.js";
import {
  formatTimestampToDate,
  formatTimestampToTime,
} from "../utils/dateUtils.js";
import { buildMeta, getPaginationOptions } from "../utils/pagination.js";
import { sendResponse, sendServerError } from "../utils/response.js";

// @desc Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? req.file.path : "";

    // Check for duplicate name
    const exists = await Category.findOne({ name });
    if (exists) {
      return sendResponse(
        res,
        false,
        "Category with this name already exists",
        409
      );
    }

    const category = await Category.create({
      name,
      description,
      image,
    });

    return sendResponse(res, true, "Category created successfully", 201, {
      data: category,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return sendServerError(res, "Internal server error", error);
  }
};

// @desc Get all active categories
export const getAllCategories = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}${req.path}`;
    const { page, limit, skip } = getPaginationOptions(req.query);
    const { searchValue } = req.query;

    const filter = {};
    if (searchValue) {
      Object.assign(filter, buildSearchFilter(searchValue, ["name"]));
    }

    const total = await Category.countDocuments(filter);

    const categories = await Category.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // optional
    return sendResponse(res, true, "Categories fetched successfully", 200, {
      data: {
        pagination: buildMeta({
          total,
          page,
          limit,
          baseUrl,
          queryParams: req.query,
        }),
        categories: categories.map(
          ({ name, description, image, createdAt, isActive }) => ({
            name,
            description,
            image,
            createdDate: formatTimestampToDate(createdAt),
            createdTime: formatTimestampToTime(createdAt),
            isActive,
            statusDisplay: isActive ? "ACTIVE" : "INACTIVE",
          })
        ),
      },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return sendServerError(res, "Internal server error", error);
  }
};

// @desc Get a single category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return sendResponse(res, false, "Category not found", 404);
    }
    return sendResponse(res, true, "Category fetched successfully", 200, {
      data: category,
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    return sendServerError(res, "Internal server error", error);
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
      return sendResponse(res, false, "Category not found", 404);
    }

    return sendResponse(res, true, "Category updated successfully", 200, {
      data: updated,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return sendServerError(res, "Internal server error", error);
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
      return sendResponse(res, false, "Category not found", 404);
    }

    return sendResponse(res, true, "Category deactivated successfully", 200);
  } catch (error) {
    console.error("Error deleting category:", error);
    return sendServerError(res, "Internal server error", error);
  }
};
