import Category from "../models/Category.js";
import { buildSearchFilter } from "../routes/queryUtils.js";
import { createDocumentService } from "../services/CRUDService.js";
import {
  formatTimestampToDate,
  formatTimestampToTime,
} from "../utils/dateUtils.js";
import { buildMeta, getPaginationOptions } from "../utils/pagination.js";
import { sendResponse, sendServerError } from "../utils/response.js";

// @desc Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    const categoryData = {
      name: name?.trim(),
      description: description || "",
      status: status,
    };

    const result = await createDocumentService({
      model: Category,
      data: categoryData,
      uniqueFields: ["name"], // Check uniqueness on name field
      successMessage: "Category created successfully",
      duplicateMessage: "Category already exists",
    });

    if (result.success) {
      return sendResponse(res, true, result.message, result.status, {
        data: {
          id: result.data._id,
          name: result.data.name,
          description: result.data.description,
          status: result.data.status,
        },
      });
    } else {
      return sendResponse(res, false, result.message, result.status);
    }
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
      Object.assign(filter, buildSearchFilter(searchValue, ["name", "status"]));
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
          ({ _id, name, description, createdAt, status, updatedAt }) => ({
            id: _id,
            name: name,
            description,
            status,
            createdDate: formatTimestampToDate(createdAt),
            updatedDate: formatTimestampToDate(updatedAt),
            createdTime: formatTimestampToTime(createdAt),
            updatedTime: formatTimestampToTime(updatedAt),
            status,
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
    const { name, description, status } = req.body;

    const updatedData = {
      ...(name && { name }),
      ...(description && { description }),
      ...(status && { status }),
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

    return sendResponse(res, true, "Category deactivated successfully", 200, {
      data: deleted,
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return sendServerError(res, "Internal server error", error);
  }
};
