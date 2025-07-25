import Expertise from "../models/Expertise.js";
import { buildSearchFilter } from "../routes/queryUtils.js";
import { createDocumentService } from "../services/CRUDService.js";
import {
  formatTimestampToDate,
  formatTimestampToTime,
} from "../utils/dateUtils.js";
import { buildMeta, getPaginationOptions } from "../utils/pagination.js";
import { sendResponse, sendServerError } from "../utils/response.js";

// @desc Create a new expertise
export const createExpertise = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const expertiseData = {
      name: name?.trim(),
      description: description || "",
      status: status,
    };
    // Call the document service
    const result = await createDocumentService({
      model: Expertise,
      data: expertiseData,
      uniqueFields: ["name"], // Check uniqueness on name field
      successMessage: "Expertise created successfully",
      duplicateMessage: "Expertise with this name already exists",
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
    console.error("Error creating expertise:", error);
    return sendServerError(res, "Internal server error", error);
  }
};

// @desc Get all expertises
export const getAllExpertise = async (req, res) => {
  try {
    const { page, limit, skip } = getPaginationOptions(req.query);
    const { searchValue } = req.query;
    const filter = {};
    if (searchValue) {
      Object.assign(filter, buildSearchFilter(searchValue, ["name", "status"]));
    }
    const total = await Expertise.countDocuments(filter);
    const expertises = await Expertise.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    return sendResponse(res, true, "Expertises fetched successfully", 200, {
      data: {
        pagination: buildMeta({
          total,
          page,
          limit,
          baseUrl: `${req.protocol}://${req.get("host")}${req.path}`,
          queryParams: req.query,
        }),
        expertises: expertises.map(
          ({ _id, name, description, status, createdAt, updatedAt }) => ({
            id: _id,
            name,
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
    console.error("Error fetching expertises:", error);
    return sendServerError(res, "Internal server error", error);
  }
};

// @desc Get a single expertise by ID
export const getExpertiseById = async (req, res) => {
  try {
    const expertise = await Expertise.findById(req.params.id);
    if (!expertise) {
      return sendResponse(res, false, "Expertise not found", 404);
    }
    return sendResponse(res, true, "Expertise fetched successfully", 200, {
      data: expertise,
    });
  } catch (error) {
    console.error("Error fetching expertise:", error);
    return sendServerError(res, "Internal server error", error);
  }
};

// @desc Update expertise
export const updateExpertise = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const updatedData = {
      ...(name && { name }),
      ...(description && { description }),
      ...(status && { status }),
      updatedAt: new Date(),
    };
    const updated = await Expertise.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    if (!updated) {
      return sendResponse(res, false, "Expertise not found", 404);
    }
    return sendResponse(res, true, "Expertise updated successfully", 200, {
      data: updated,
    });
  } catch (error) {
    console.error("Error updating expertise:", error);
    return sendServerError(res, "Internal server error", error);
  }
};

// @desc Soft delete (deactivate) expertise
export const deleteExpertise = async (req, res) => {
  try {
    const deleted = await Expertise.findByIdAndUpdate(
      req.params.id,
      { status: "INACTIVE", updatedAt: new Date() },
      { new: true }
    );
    if (!deleted) {
      return sendResponse(res, false, "Expertise not found", 404);
    }
    return sendResponse(res, true, "Expertise deactivated successfully", 200);
  } catch (error) {
    console.error("Error deleting expertise:", error);
    return sendServerError(res, "Internal server error", error);
  }
};
