import Designation from "../models/Designation.js";
import { createDocumentService } from "../services/CRUDService.js";
import { sendResponse, sendServerError } from "../utils/response.js";

export const createDesignation = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;

    // Prepare data for the service
    const designationData = {
      name: name?.trim(),
      description: description || "",
      isActive: isActive,
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
