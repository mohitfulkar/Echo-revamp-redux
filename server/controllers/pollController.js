import { query } from "express-validator";
import Poll from "../models/Poll.js";
import Question from "../models/Questions.js";
import { sendResponse, sendServerError } from "../utils/response.js";
import { buildMeta, getPaginationOptions } from "../utils/pagination.js";

export const createPoll = async (req, res) => {
  try {
    const {
      title,
      description,
      expiryDate,
      isPublic,
      questions, // array of question objects (without pollId)
      createdBy,
      status,
    } = req.body;

    // Step 1: Create the poll without questions
    const newPoll = new Poll({
      title,
      description,
      expiryDate,
      isPublic,
      createdBy,
      status,
    });

    const savedPoll = await newPoll.save();

    // Step 2: Create questions with pollId linked to saved poll
    const questionDocs = questions.map((q) => ({
      ...q,
      pollId: savedPoll._id,
    }));

    const savedQuestions = await Question.insertMany(questionDocs);

    // Step 3: Update poll's questions array with the new question IDs
    savedPoll.questions = savedQuestions.map((q) => q._id);
    await savedPoll.save();

    // Step 4: Send response with poll and questions
    sendResponse(res, true, "Poll created successfully", 201, {
      data: {
        pollData: {
          ...savedPoll.toObject(),
          questions: savedQuestions,
        },
      },
    });
  } catch (error) {
    console.error("Error creating poll:", error);
    sendServerError(res, "Failed to create poll");
  }
};

export const getAll = async (req, res) => {
  try {
    const { page, limit, skip } = getPaginationOptions(req.query);
    const { searchValue } = req.query;
    const filter = {};
    if (searchValue) {
      const regex = new RegExp(searchValue, "i"); // case-insensitive
      filter.$or = [
        { title: { $regex: regex } },
        { status: { $regex: regex } },
      ];
    }
    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: "i" };
    }
    if (req.query.status) {
      filter.status = { $regex: req.query.status };
    }
    const total = await Poll.countDocuments(filter);
    const polls = await Poll.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "questions",
        select: "-__v",
      })
      .select("-__v");

    sendResponse(res, true, "Poll Data Fetched Successfully", 200, {
      data: {
        pagination: buildMeta({ total, page, limit }),
        polls,
      },
    });
  } catch (error) {
    console.error("Error fetching polls:", error);
    sendServerError(res);
  }
};
