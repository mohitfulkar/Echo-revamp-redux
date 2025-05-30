import { HttpStatus } from "../constants/statusCode.js";
import Poll from "../models/Poll.js";
import User from "../models/User.js";
import { sendResponse, sendServerError } from "../utils/response.js";
import { calculateMonthlyGrowth } from "../utils/userUtil.js";

export const getDasboardItems = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalActivePolls = await Poll.countDocuments({ status: "active" });
    const monthlyUserGrowth = await calculateMonthlyGrowth(User);
    const monthlyPollGrowth = await calculateMonthlyGrowth(Poll);
    sendResponse(res, true, "Counts fetched Successfully", HttpStatus.OK, {
      data: {
        totalUsers: totalUsers,
        monthlyUserGrowth: monthlyUserGrowth,
        totalActivePolls: totalActivePolls,
        monthlyPollGrowth: monthlyPollGrowth,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    sendServerError(res);
  }
};
