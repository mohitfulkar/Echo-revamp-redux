import { HttpStatus } from "../constants/statusCode.js";
import Category from "../models/Category.js";
import Expertise from "../models/Expertise.js";
import Panelist from "../models/Panelist.js";
import Responsibility from "../models/Reponsibility.js";
import Designation from "../models/Designation.js";
import { getChoices } from "../utils/choicesUtils.js";

export const getCategories = async (req, res) => {
  await getChoices(Category, "name", "_id", res);
};

// For panelists
export const getPanelists = async (req, res) => {
  await getChoices(Panelist, "name", "_id", res);
};

export const getExpertises = async (req, res) => {
  await getChoices(Expertise, "name", "_id", res);
};

export const getRsb = async (req, res) => {
  await getChoices(Responsibility, "name", "_id", res);
};

export const getDesignations = async (req, res) => {
  await getChoices(Designation, "name", "_id", res);
};
