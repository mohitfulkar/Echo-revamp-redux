import Responsibility from "../models/Reponsibility.js";
import { buildSearchFilter } from "../routes/queryUtils.js";
import { createDocumentService } from "../services/CRUDService.js";
import { formatTimestampToDate, formatTimestampToTime } from "../utils/dateUtils.js";
import { buildMeta, getPaginationOptions } from "../utils/pagination.js";
import { sendResponse, sendServerError } from "../utils/response.js";

export const createResponsibility = async (req, res) => {
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
          isActive: result.data.isActive,
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
          rsb: rsb.map(({ name, description, image, createdAt, isActive }) => ({
            name,
            description,
            image,
            createdDate: formatTimestampToDate(createdAt),
            createdTime: formatTimestampToTime(createdAt),
            isActive,
            statusDisplay: isActive ? "ACTIVE" : "INACTIVE",
          })),
        },
      }
    );
  } catch (error) {
    console.error("Error fetching responsibilities:", error);
    return sendServerError(res, "Internal server error", error);
  }
};
