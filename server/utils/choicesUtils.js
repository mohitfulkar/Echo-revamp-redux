import { HttpStatus } from "../constants/statusCode.js";
import { sendResponse, sendServerError } from "./response.js";

export const getChoices = async (model, labelKey, valueKey = "_id", res) => {
  try {
    const response = await model.find();
    const dropdownOptions = response.map((item) => ({
      label: item[labelKey],
      value: item[valueKey],
    }));
    sendResponse(res, true, "Data fetched successfully", HttpStatus.OK, {
      data: dropdownOptions,
    });
  } catch (error) {
    console.error(`Error fetching data for ${model.modelName}:`, error);
    sendServerError(res);
  }
};
