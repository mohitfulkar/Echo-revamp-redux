import { HttpStatus } from "../constants/statusCode.js";
import User from "../models/User.js";
import { buildMeta, getPaginationOptions } from "../utils/pagination.js";
import { sendResponse, sendServerError } from "../utils/response.js";

export const fetchAllUsers = async (req, res) => {
  try {
    const { isVerified, status, role } = req.query;
    const { page, limit, skip } = getPaginationOptions(req.query);
    const { searchValue } = req.query;
    const filter = {};
    if (searchValue) {
      const regex = new RegExp(searchValue, "i"); // case-insensitive
      filter.$or = [
        { fullName: { $regex: regex } },
        { email: { $regex: regex } },
      ];
    }
    if (isVerified) {
      filter.isVerified = { $regex: req.query.isVerified, $options: "i" };
    }
    if (status) {
      filter.status = { $regex: req.query.status };
    }
    if (role) {
      filter.role = { $regex: req.query.role };
    }
    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-__v");

    sendResponse(res, true, "Users Fetched Successfully", HttpStatus.OK, {
      pagination: buildMeta({ total, page, limit }),
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
