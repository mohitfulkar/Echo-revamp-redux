import { HttpStatus } from "../constants/statusCode.js";

export const createDocumentService = async ({
  model,
  data,
  uniqueFields = [],
  successMessage = "Document created successfully",
  duplicateMessage = "Document already exists",
}) => {
  try {
    // Build query for uniqueness check
    let query = {};
    for (const field of uniqueFields) {
      if (data[field]) {
        query[field] = data[field].trim?.() || data[field];
      }
    }

    if (Object.keys(query).length > 0) {
      const existing = await model.findOne(query);
      if (existing) {
        return {
          success: false,
          status: HttpStatus.BAD_REQUEST,
          message: duplicateMessage,
        };
      }
    }

    const newDoc = new model(data);
    const savedDoc = await newDoc.save();

    return {
      success: true,
      status: HttpStatus.CREATED,
      message: successMessage,
      data: savedDoc,
    };
  } catch (error) {
    console.error("Error in createDocumentService:", error);
    throw error;
  }
};
