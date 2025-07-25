// utils/pollUtils/poll.js - Specific helper functions using the generic helper

import Option from "../models/Options.js";
import User from "../models/User.js";
import {
  calculateMonthlyGrowth,
  calculateDetailedGrowth,
} from "./growthCalculator.js";
import Poll from "../models/Poll.js";

/**
 * Calculate vote count growth (your original function, now using the generic helper)
 */
export const calculateVoteGrowth = async () => {
  return await calculateMonthlyGrowth(Option, {
    field: "voteCount", // Sum the voteCount field
    dateField: "createdAt",
  });
};

/**
 * Calculate detailed vote growth with additional data
 */
export const calculateDetailedVoteGrowth = async () => {
  return await calculateDetailedGrowth(Option, {
    field: "voteCount",
    dateField: "createdAt",
  });
};

/**
 * Calculate user growth (count of new users)
 */
export const calculateUserGrowth = async () => {
  return await calculateMonthlyGrowth(User, {
    // No field specified = count documents
    dateField: "createdAt",
  });
};

/**
 * Calculate poll growth (count of new polls)
 */
export const calculatePollGrowth = async () => {
  return await calculateMonthlyGrowth(Poll, {
    dateField: "createdAt",
  });
};

/**
 * Calculate active poll growth
 */
export const calculateActivePollGrowth = async () => {
  return await calculateMonthlyGrowth(Poll, {
    dateField: "createdAt",
    additionalMatch: { status: "active" },
  });
};

/**
 * Calculate vote growth for a specific question
 */
export const calculateQuestionVoteGrowth = async (questionId) => {
  return await calculateMonthlyGrowth(Option, {
    field: "voteCount",
    dateField: "createdAt",
    additionalMatch: { questionId },
  });
};

/**
 * Calculate vote growth for specific poll
 */
export const calculatePollVoteGrowth = async (pollId) => {
  return await calculateMonthlyGrowth(Option, {
    field: "voteCount",
    dateField: "createdAt",
    additionalMatch: { pollId },
  });
};

/**
 * Calculate quarterly growth (3 months comparison)
 */
export const calculateQuarterlyVoteGrowth = async () => {
  return await calculateMonthlyGrowth(Option, {
    field: "voteCount",
    dateField: "createdAt",
    monthsBack: 3,
  });
};

/**
 * Get comprehensive dashboard growth stats
 */
export const getDashboardGrowthStats = async () => {
  try {
    const [
      userGrowth,
      pollGrowth,
      activePollGrowth,
      voteGrowth,
      detailedVoteGrowth,
    ] = await Promise.all([
      calculateUserGrowth(),
      calculatePollGrowth(),
      calculateActivePollGrowth(),
      calculateVoteGrowth(),
      calculateDetailedVoteGrowth(),
    ]);

    return {
      userGrowth,
      pollGrowth,
      activePollGrowth,
      voteGrowth,
      detailedVoteGrowth,
    };
  } catch (error) {
    console.error("Error getting dashboard growth stats:", error);
    return {
      userGrowth: 0,
      pollGrowth: 0,
      activePollGrowth: 0,
      voteGrowth: 0,
      detailedVoteGrowth: {
        current: { value: 0, period: "N/A" },
        previous: { value: 0, period: "N/A" },
        growth: {
          absolute: 0,
          percentage: 0,
          isPositive: false,
          trend: "stable",
        },
      },
    };
  }
};
