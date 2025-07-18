import Designation from "../models/Designation.js";
import { createDocumentService } from "../services/CRUDService.js";
import { sendResponse, sendServerError } from "../utils/response.js";
import { HttpStatus } from "../constants/statusCode.js";
import { buildSearchFilter } from "../routes/queryUtils.js";
export const createDesignation = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    // Prepare data for the service
    const designationData = {
      name: name?.trim(),
      description: description || "",
      status: status,
    };

    // Call the document service
    const result = await createDocumentService({
      model: Designation,
      data: designationData,
      uniqueFields: ["name"], // Check uniqueness on name field
      successMessage: "Designation created successfully",
      duplicateMessage: "Designation already exists",
    });

    // Handle the response
    if (result.success) {
      return sendResponse(res, true, result.message, result.status, {
        data: {
          id: result.data._id,
          name: result.data.name,
          description: result.data.description,
          isActive: result.data.isActive,
        },
      });
    } else {
      return sendResponse(res, false, result.message, result.status);
    }
  } catch (error) {
    console.error("Error creating designation:", error);
    return sendServerError(res);
  }
};

import {
  formatTimestampToDate,
  formatTimestampToTime,
} from "../utils/dateUtils.js";
import { buildMeta, getPaginationOptions } from "../utils/pagination.js";

export const getDesignation = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}${req.path}`;
    const { page, limit, skip } = getPaginationOptions(req.query);
    const { searchValue } = req.query;

    const filter = {};
    if (searchValue) {
      Object.assign(filter, buildSearchFilter(searchValue, ["name"]));
    }

    const total = await Designation.countDocuments(filter);
    const designation = await Designation.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return sendResponse(res, true, "Designations fetched successfully", 200, {
      data: {
        pagination: buildMeta({
          total,
          page,
          limit,
          baseUrl,
          queryParams: req.query,
        }),
        designation: designation.map(
          ({ _id, name, description, status, createdAt, updatedAt }) => ({
            id: _id,
            name,
            description,
            status,
            createdDate: formatTimestampToDate(createdAt),
            updatedDate: formatTimestampToDate(updatedAt),
            createdTime: formatTimestampToTime(createdAt),
            updatedTime: formatTimestampToTime(updatedAt),
          })
        ),
      },
    });
  } catch (error) {
    console.error("Error fetching designations:", error);
    return sendServerError(res, "Internal server error", error);
  }
};

export const getDesignationById = async (req, res) => {
  try {
    const designation = await Designation.findById(req.params.id);
    if (!designation) {
      return sendResponse(
        res,
        false,
        "Designation not found",
        HttpStatus.NOT_FOUND
      );
    }
    return sendResponse(
      res,
      true,
      "Designation fetched successfully",
      HttpStatus.OK,
      {
        data: {
          id: designation._id,
          name: designation.name,
          description: designation.description,
          status: designation.status,
          createdAt: formatTimestampToDate(designation.createdAt),
          updatedAt: formatTimestampToDate(designation.updatedAt),
          createdTime: formatTimestampToTime(designation.createdAt),
          updatedTime: formatTimestampToTime(designation.updatedAt),
        },
      }
    );
  } catch (error) {
    console.error("Error fetching designation:", error);
    return sendServerError(res, "Internal server error", error);
  }
};

export const updateDesignation = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const updatedData = {
      ...(name && { name }),
      ...(description && { description }),
      ...(status && { status }),
      updatedAt: new Date(),
    };
    const updated = await Designation.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    if (!updated) {
      return sendResponse(
        res,
        false,
        "Designation not found",
        HttpStatus.NOT_FOUND
      );
    }
    return sendResponse(
      res,
      true,
      "Designation updated successfully",
      HttpStatus.OK,
      {
        data: updated,
      }
    );
  } catch (error) {
    console.error("Error updating designation:", error);
    return sendServerError(res, "Internal server error", error);
  }
};

export const deleteDesignation = async (req, res) => {
  try {
    const deleted = await Designation.findByIdAndUpdate(
      req.params.id,
      { status: "INACTIVE", updatedAt: new Date() },
      { new: true }
    );
    if (!deleted) {
      return sendResponse(
        res,
        false,
        "Designation not found",
        HttpStatus.NOT_FOUND
      );
    }
    return sendResponse(
      res,
      true,
      "Designation deactivated successfully",
      HttpStatus.OK
    );
  } catch (error) {
    console.error("Error deleting designation:", error);
    return sendServerError(res, "Internal server error", error);
  }
};
