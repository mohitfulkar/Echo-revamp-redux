import { HttpStatus } from "../constants/statusCode.js";
import Option from "../models/Options.js";
import Poll from "../models/Poll.js";
import User from "../models/User.js";
import {
  calculateActivePollGrowth,
  calculateUserGrowth,
  calculateVoteGrowth,
} from "../utils/dashboardUtils.js";
import { sendResponse, sendServerError } from "../utils/response.js";

export const getDasboardItems = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalActivePolls = await Poll.countDocuments({ status: "active" });
    const totalVoteCounts = await Option.aggregate([
      { $group: { _id: null, totalVotes: { $sum: "$voteCount" } } },
    ]);
    const totalVotes = totalVoteCounts[0]?.totalVotes || 0;
    const [monthlyUserGrowth, monthlyPollGrowth, voteGrowth] =
      await Promise.all([
        calculateUserGrowth(),
        calculateActivePollGrowth(),
        calculateVoteGrowth(),
      ]);

    sendResponse(res, true, "Counts fetched Successfully", HttpStatus.OK, {
      data: {
        totalUsers: totalUsers,
        monthlyUserGrowth: monthlyUserGrowth,
        totalActivePolls: totalActivePolls,
        monthlyPollGrowth: monthlyPollGrowth,
        totalVotes: totalVotes,
        monthlyVoteGrowth: voteGrowth,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    sendServerError(res);
  }
};
