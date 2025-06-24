import Expertise from "../models/Expertise.js";
import { buildSearchFilter } from "../routes/queryUtils.js";
import { createDocumentService } from "../services/CRUDService.js";
import {
  formatTimestampToDate,
  formatTimestampToTime,
} from "../utils/dateUtils.js";
import { buildMeta, getPaginationOptions } from "../utils/pagination.js";
import { sendResponse, sendServerError } from "../utils/response.js";

export const createExpertise = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;

    // Prepare data for the service
    const expertiseData = {
      name: name?.trim(),
      description: description || "",
      isActive: isActive,
    };

    // Call the document service
    const result = await createDocumentService({
      model: Expertise,
      data: expertiseData,
      uniqueFields: ["name"], // Check uniqueness on name field
      successMessage: "Expertise created successfully",
      duplicateMessage: "Expertise already exists",
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
    console.error("Error creating expertise:", error);
    return sendServerError(res);
  }
};

export const getAllExpertise = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}${req.path}`;
    const { page, limit, skip } = getPaginationOptions(req.query);
    const { searchValue } = req.query;

    const filter = {};
    if (searchValue) {
      Object.assign(filter, buildSearchFilter(searchValue, ["name"]));
    }

    const total = await Expertise.countDocuments(filter);

    const expertise = await Expertise.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // optional
    return sendResponse(res, true, "Expertise fetched successfully", 200, {
      data: {
        pagination: buildMeta({
          total,
          page,
          limit,
          baseUrl,
          queryParams: req.query,
        }),
        expertises: expertise.map(
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
