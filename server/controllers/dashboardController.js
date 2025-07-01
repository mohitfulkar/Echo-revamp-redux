import { HttpStatus } from "../constants/statusCode.js";
import Option from "../models/Options.js";
import Poll from "../models/Poll.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import Expertise from "../models/Expertise.js";
import {
  calculateActivePollGrowth,
  calculateUserGrowth,
  calculateVoteGrowth,
} from "../utils/dashboardUtils.js";
import { sendResponse, sendServerError } from "../utils/response.js";
import Responsibility from "../models/Reponsibility.js";
import Designation from "../models/Designation.js";

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

    return sendResponse(
      res,
      true,
      "Counts fetched Successfully",
      HttpStatus.OK,
      {
        data: {
          totalUsers: totalUsers,
          monthlyUserGrowth: monthlyUserGrowth,
          totalActivePolls: totalActivePolls,
          monthlyPollGrowth: monthlyPollGrowth,
          totalVotes: totalVotes,
          monthlyVoteGrowth: voteGrowth,
        },
      }
    );
  } catch (error) {
    console.error("Error fetching stats:", error);
    return sendServerError(res);
  }
};

export const categorySummary = async (req, res) => {
  try {
    const statuses = ["ACTIVE", "EXPIRED", "INACTIVE", "PENDING"];
    const counts = await Category.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    const summary = {};
    let total = 0;
    statuses.forEach((status) => {
      const found = counts.find((c) => c._id === status);
      summary[status] = found ? found.count : 0;
      total += summary[status];
    });
    summary.total = total;
    sendResponse(
      res,
      true,
      "Category status summary fetched successfully",
      HttpStatus.OK,
      {
        data: summary,
      }
    );
  } catch (error) {
    console.error("Error fetching category summary:", error);
    sendServerError(res);
  }
};

export const expertiseSummary = async (req, res) => {
  try {
    const statuses = ["ACTIVE", "EXPIRED", "INACTIVE", "PENDING"];
    const counts = await Expertise.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    const summary = {};
    let total = 0;
    statuses.forEach((status) => {
      const found = counts.find((c) => c._id === status);
      summary[status] = found ? found.count : 0;
      total += summary[status];
    });
    summary.total = total;
    sendResponse(
      res,
      true,
      "Expertise status summary fetched successfully",
      HttpStatus.OK,
      {
        data: summary,
      }
    );
  } catch (error) {
    console.error("Error fetching expertise summary:", error);
    sendServerError(res);
  }
};
export const rsbSummary = async (req, res) => {
  try {
    const statuses = ["ACTIVE", "EXPIRED", "INACTIVE", "PENDING"];
    const counts = await Responsibility.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    const summary = {};
    let total = 0;
    statuses.forEach((status) => {
      const found = counts.find((c) => c._id === status);
      summary[status] = found ? found.count : 0;
      total += summary[status];
    });
    summary.total = total;
    return sendResponse(
      res,
      true,
      "Reponsibility status summary fetched successfully",
      HttpStatus.OK,
      {
        data: summary,
      }
    );
  } catch (error) {
    console.error("Error fetching reponsibility summary:", error);
    return sendServerError(res);
  }
};
export const designationSummary = async (req, res) => {
  try {
    const statuses = ["ACTIVE", "EXPIRED", "INACTIVE", "PENDING"];
    const counts = await Designation.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    const summary = {};
    let total = 0;
    statuses.forEach((status) => {
      const found = counts.find((c) => c._id === status);
      summary[status] = found ? found.count : 0;
      total += summary[status];
    });
    summary.total = total;
    return sendResponse(
      res,
      true,
      "Designation status summary fetched successfully",
      HttpStatus.OK,
      {
        data: summary,
      }
    );
  } catch (error) {
    console.error("Error fetching designation summary:", error);
    return sendServerError(res);
  }
};
