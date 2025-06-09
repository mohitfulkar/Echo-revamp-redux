import { HttpStatus } from "../constants/statusCode.js";
import Category from "../models/Category.js";
import Panelist from "../models/Panelist.js";
import { getChoices } from "../utils/pollUtils/choicesUtils.js";

export const getCategories = async (req, res) => {
  await getChoices(Category, "name", "_id", res);
};

// For panelists
export const getPanelists = async (req, res) => {
  await getChoices(Panelist, "name", "_id", res);
};
