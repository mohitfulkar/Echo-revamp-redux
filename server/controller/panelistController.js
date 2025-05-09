import { Panelist } from "../model/Panelists.js";
import "dotenv/config";
import { commanService } from "../services/commanService.js";

export const getPanelist = async (req, res) => {
  try {
    const result = await commanService.getAll(Panelist);
    res.status(200).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "An error occurred while processing the request.",
    });
  }
};
export const getPanelistSummary = async (req, res) => {
  try {
    const result = await commanService.getAll(Panelist, req.query);
    const items = result?.data;
    const filteredData = items.map((item) => ({
      id: item._id,
      fullName: item.fullName,
      photo: item.photo,
      phone: item.phone,
      email: item.email,
    }));
    // Send the response
    res.status(200).json({
      message: result.message,
      data: filteredData,
    });
  } catch (error) {
    console.error("Error in getPanelistSummary:", error);
    res.status(500).json({
      message:
        error.message || "An error occurred while processing the request.",
    });
  }
};
export const getPanelistSummarybyId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await commanService.getItemById(Panelist, id);
    const item = {
      id: result.data._id,
      fullName: result.data.fullName,
      photo: result.data.photo,
      phone: result.data.phone,
      email: result.data.email,
    };

    // Send the response
    res.status(200).json({
      message: result.message,
      data: item,
    });
  } catch (error) {
    console.error("Error in getPanelistSummary:", error);
    res.status(500).json({
      message:
        error.message || "An error occurred while processing the request.",
    });
  }
};

export const getPanelistById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await commanService.getItemById(Panelist, id);
    res.status(200).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "An error occurred while processing the request.",
    });
  }
};

export const addPanelist = async (req, res) => {
  try {
    const photo = req.file.filename;
    const payload = {
      ...req.body,
      photo,
    };
    const total = await Panelist.countDocuments();
    if (total === 3) {
      return res
        .status(400)
        .json({ message: "Cannot add more than 3 panelists" });
    }

    const result = await commanService.create(Panelist, payload);
    res.status(201).json({ message: result.message, data: result.data });
  } catch (error) {
    console.error("Error in add panelist:", error);
    // Send appropriate error response
    const status = error.name === "ValidationError" ? 400 : 500;

    res
      .status(status)
      .json({ message: error.message || "Internal server error" });
  }
};
