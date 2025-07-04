import { HttpStatus } from "../constants/statusCode.js";
import User from "../models/User.js";
import { buildSearchFilter } from "../routes/queryUtils.js";
import { buildMeta, getPaginationOptions } from "../utils/pagination.js";
import { sendResponse, sendServerError } from "../utils/response.js";
import bcrypt from "bcryptjs";

export const fetchAllUsers = async (req, res) => {
  try {
    const { isVerified, status, role } = req.query;
    const { page, limit, skip } = getPaginationOptions(req.query);
    const { searchValue } = req.query;
    const filter = {};
    Object.assign(
      filter,
      buildSearchFilter(searchValue, ["fullName", "email"])
    );
    if (assignedCategory) {
      filter.assignedCategory = {
        $regex: req.query.assignedCategory,
        $options: "i",
      };
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
      data: { pagination: buildMeta({ total, page, limit }), voter: users },
    });
  } catch (error) {
    sendServerError(res, "Unable to fetch Voters");
  }
};
