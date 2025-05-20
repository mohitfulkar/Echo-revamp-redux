import Poll from "../models/Poll.js";
import User from "../models/User.js";
import { sendResponse, sendServerError } from "../utils/response.js";
// import { calculateMonthlyUserGrowth } from "../utils/userUtil.js";

export const createPoll = async (req, res) => {
  try {
    const {
      title,
      description,
      expiryDate,
      isPublic,
      questions,
      createdBy,
      status,
    } = req.body;

    const newPoll = new Poll({
      title,
      description,
      expiryDate,
      isPublic,
      questions,
      createdBy,
      status,
    });

    const savedPoll = await newPoll.save();

    sendResponse(res, true, "Poll created successfully", 201, {
      poll: savedPoll,
    });
  } catch (error) {
    console.error("Error creating poll:", error);
    sendServerError(res, "Failed to create poll");
  }
};
