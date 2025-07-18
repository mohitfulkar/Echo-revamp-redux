import { HttpStatus } from "../constants/statusCode.js";
import Responsibility from "../models/Reponsibility.js";
import { buildSearchFilter } from "../routes/queryUtils.js";
import { createDocumentService } from "../services/CRUDService.js";
import {
  formatTimestampToDate,
  formatTimestampToTime,
} from "../utils/dateUtils.js";
import { buildMeta, getPaginationOptions } from "../utils/pagination.js";
import { sendResponse, sendServerError } from "../utils/response.js";

export const createResponsibility = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    // Prepare data for the service
    const expertiseData = {
      name: name?.trim(),
      description: description || "",
      status: status,
    };

    // Call the document service
    const result = await createDocumentService({
      model: Responsibility,
      data: expertiseData,
      uniqueFields: ["name"], // Check uniqueness on name field
      successMessage: "Responsibility created successfully",
      duplicateMessage: "Responsibility already exists",
    });

    // Handle the response
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
    console.error("Error creating eesponsibility:", error);
    return sendServerError(res);
  }
};

export const getRsb = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}${req.path}`;
    const { page, limit, skip } = getPaginationOptions(req.query);
    const { searchValue } = req.query;

    const filter = {};
    if (searchValue) {
      Object.assign(filter, buildSearchFilter(searchValue, ["name"]));
    }

    const total = await Responsibility.countDocuments(filter);

    const rsb = await Responsibility.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    return sendResponse(
      res,
      true,
      "Responsibilities fetched successfully",
      200,
      {
        data: {
          pagination: buildMeta({
            total,
            page,
            limit,
            baseUrl,
            queryParams: req.query,
          }),
          rsb: rsb.map(
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
      }
    );
  } catch (error) {
    console.error("Error fetching responsibilities:", error);
    return sendServerError(res, "Internal server error", error);
  }
};

export const getRsbById = async (req, res) => {
  try {
    const responsibility = await Responsibility.findById(req.params.id);
    if (!responsibility) {
      return sendResponse(
        res,
        false,
        "Responsibility not found",
        HttpStatus.NOT_FOUND
      );
    }
    return sendResponse(
      res,
      true,
      "Responsibility fetched successfully",
      HttpStatus.OK,
      {
        data: {
          id: responsibility._id,
          name: responsibility.name,
          description: responsibility.description,
          status: responsibility.status,
          createdAt: formatTimestampToDate(responsibility.createdAt),
          updatedAt: formatTimestampToDate(responsibility.updatedAt),
          createdTime: formatTimestampToTime(responsibility.createdAt),
          updatedTime: formatTimestampToTime(responsibility.updatedAt),
        },
      }
    );
  } catch (error) {
    console.error("Error fetching responsibility:", error);
    return sendServerError(res, "Internal server error", error);
  }
};

export const updateResponsibility = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const updatedData = {
      ...(name && { name }),
      ...(description && { description }),
      ...(status && { status }),
      updatedAt: new Date(),
    };
    const updated = await Responsibility.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    if (!updated) {
      return sendResponse(
        res,
        false,
        "Responsibility not found",
        HttpStatus.NOT_FOUND
      );
    }
    return sendResponse(
      res,
      true,
      "Responsibility updated successfully",
      HttpStatus.OK,
      {
        data: updated,
      }
    );
  } catch (error) {
    console.error("Error updating responsibility:", error);
    return sendServerError(res, "Internal server error", error);
  }
};

export const deleteResponsibility = async (req, res) => {
  try {
    const deleted = await Responsibility.findByIdAndUpdate(
      req.params.id,
      { status: "INACTIVE", updatedAt: new Date() },
      { new: true }
    );
    if (!deleted) {
      return sendResponse(
        res,
        false,
        "Responsibility not found",
        HttpStatus.NOT_FOUND
      );
    }
    return sendResponse(
      res,
      true,
      "Responsibility deactivated successfully",
      HttpStatus.OK
    );
  } catch (error) {
    console.error("Error deleting responsibility:", error);
    return sendServerError(res, "Internal server error", error);
  }
};
