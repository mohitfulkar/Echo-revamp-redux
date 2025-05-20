import Poll from "../models/Poll.js";
import User from "../models/User.js";
import { sendResponse, sendServerError } from "../utils/response.js";
import { calculateMonthlyUserGrowth } from "../utils/userUtil.js";

export const getDasboardItems = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalActivePolls = await Poll.countDocuments({ status: "active" });
    const monthlyUserGrowth = await calculateMonthlyUserGrowth();
    sendResponse(res, true, "Counts fetched Successfully", 200, {
      data: {
        total_users: totalUsers,
        monthly_user_growth: monthlyUserGrowth,
        active_polls: totalActivePolls,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    sendServerError(res);
  }
};
