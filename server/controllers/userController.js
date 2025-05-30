import { HttpStatus } from "../constants/statusCode.js";
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

    sendResponse(res, true, "Voters Fetched Successfully", HttpStatus.OK, {
      data: users,
    });
  } catch (error) {
    sendServerError(res, "Unable to fetch Voters");
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
    sendResponse(res, true, "Voters Fetched successfully", HttpStatus.OK, {
      data: users,
    });
  } catch (error) {
    console.error("Error fetching recent voters:", error);
    sendServerError(res, "Unable to fetch voters");
  }
};
