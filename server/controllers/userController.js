import { HttpStatus } from "../constants/statusCode.js";
import Panelist from "../models/Panelist.js";
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
      data: { pagination: buildMeta({ total, page, limit }), voter: users },
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

export const createPanelist = async (req, res) => {
  try {
    const {
      name,
      email,
      contactNumber,
      occupation,
      areaOfExpertise,
      contributionSummary,
      excellenceRating,
      category,
      authorizedToCreatePolls,
    } = req.body;

    // Handle socialMedia (parse if sent as JSON string via form-data)
    let socialMedia = {};
    if (req.body.socialMedia) {
      try {
        socialMedia =
          typeof req.body.socialMedia === "string"
            ? JSON.parse(req.body.socialMedia)
            : req.body.socialMedia;
      } catch (err) {
        sendResponse(
          res,
          false,
          "Invalid JSON format for socialMedia",
          HttpStatus.BAD_REQUEST
        );
      }
    }

    // Normalize areaOfExpertise to array if needed
    const expertiseArray = Array.isArray(areaOfExpertise)
      ? areaOfExpertise
      : [areaOfExpertise];

    // Check for existing panelist
    const existing = await Panelist.findOne({ email });
    if (existing) {
      sendResponse(
        res,
        false,
        "A panelist with this email already exists",
        HttpStatus.BAD_REQUEST
      );
    }

    // Handle uploaded image (if available)
    const imagePath = req.file ? req.file.path : "";

    const panelist = await Panelist.create({
      name,
      email,
      contactNumber,
      socialMedia,
      occupation,
      areaOfExpertise: expertiseArray,
      contributionSummary,
      excellenceRating,
      image: imagePath,
      category,
      authorizedToCreatePolls,
    });
    sendResponse(
      res,
      true,
      "Panelist created successfully",
      HttpStatus.CREATED,
      {
        data: panelist,
      }
    );
  } catch (error) {
    console.error("Error creating panelist:", error);
    sendServerError(res);
  }
};

export const getPanelist = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}${req.path}`;
    const { page, limit, skip } = getPaginationOptions(req.query);
    const { searchValue, category, status, authorized } = req.query;

    const filter = {};

    // Search across name, email, occupation, and expertise
    if (searchValue) {
      const regex = new RegExp(searchValue, "i");
      filter.$or = [
        { name: { $regex: regex } },
        { email: { $regex: regex } },
        { occupation: { $regex: regex } },
        { areaOfExpertise: { $regex: regex } },
      ];
    }

    if (category) {
      filter.category = category; // expecting category id
    }

    if (status) {
      filter.status = status; // pending/approved/rejected
    }

    if (typeof authorized !== "undefined") {
      filter.authorizedToCreatePolls = authorized === "true";
    }

    const total = await Panelist.countDocuments(filter);

    const panelists = await Panelist.aggregate([
      { $match: filter },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $unwind: { path: "$categoryInfo", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "polls",
          localField: "_id",
          foreignField: "createdBy",
          as: "pollsCreated",
        },
      },

      {
        $project: {
          __v: 0,
          "categoryInfo.__v": 0,
          "pollsCreated.__v": 0,
          "pollsCreated.questions": 0, // omit large fields if needed
        },
      },
    ]);

    sendResponse(res, true, "Panelists fetched successfully", 200, {
      data: {
        pagination: buildMeta({
          total,
          page,
          limit,
          baseUrl,
          queryParams: req.query,
        }),
        panelists,
      },
    });
  } catch (error) {
    console.error("Error fetching panelists:", error);
    sendServerError(res);
  }
};
