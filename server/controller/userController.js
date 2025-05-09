// controllers/itemController.js
import { User } from "../model/User.js"; // Import the model
import { commanService } from "../services/commanService.js"; // Import your common service

export const getItems = async (req, res) => {
  try {
    // Get the items from the common service
    const items = await commanService.getItems(User);

    // Return the items in the response
    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (err) {
    console.error("Error fetching items:", err);
    // Return an error response in case of failure
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching items.",
      error: err.message,
    });
  }
};
export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    // Get the items from the common service
    const items = await commanService.getItemById(User, id);

    if (!items) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      ...items,
    });
  } catch (err) {
    console.error("Error fetching items:", err);
    // Return an error response in case of failure
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching items.",
      error: err.message,
    });
  }
};
