import Poll from "../models/Poll.js";
import User from "../models/User.js";
import { sendResponse, sendServerError } from "../utils/response.js";

export const fetchAllUsers = async (req, res) => {
  try {
    const { isVerified, status, role } = req.query;

    // Build filter conditionally
    const filter = {
      ...(isVerified !== undefined && { isVerified: isVerified === "true" }),
      ...(status && { status }),
      ...(role && { role }),
    };
    const users = await User.find(filter);

    sendResponse(res, true, "Voters Fetched Successfully", 200, {
      data: users,
    });
  } catch (error) {
    sendResponse(res, false, "Failed to fetch users", 500, {
      error: error.message,
    });
  }
};

export const getRecentUsers = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const users = await User.find({
      createdAt: { $gte: startDate },
    });
    sendResponse(res, true, "Voters Fetched successfully", 200, {
      data: users,
    });
  } catch (error) {
    console.error("Error fetching recent users:", error);
    sendResponse(res, false, "Failed to fetch users", 500, {
      error: error.message,
    });
  }
};
