import { HttpStatus } from "../constants/statusCode.js";
import Panelist from "../models/Panelist.js";
import SuperPanelist from "../models/SuperPanelist.js";
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
      password,
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
      password,
    });
    sendResponse(
      res,
      true,
      "Panelist created successfully",
      HttpStatus.CREATED,
      {
        data: {
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
        },
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

    // Search across name, email, occupation, and expertise
    if (searchValue) {
      Object.assign(
        filter,
        buildSearchFilter(searchValue, [
          "name",
          "email",
          "occupation",
          "areaOfExpertise",
        ])
      );
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

export const getPanelistByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const panelists = await Panelist.find({ category: categoryId });
    sendResponse(res, true, "Panelist fetched successfully", HttpStatus.OK, {
      data: panelists,
    });
  } catch (error) {
    console.error("Error fetching panelists by category:", error);
    sendServerError(res);
  }
};

export const createSuperPanelist = async (req, res) => {
  try {
    const {
      name,
      email,
      contactNumber,
      socialMedia,
      occupation,
      areaOfExpertise,
      contributionSummary,
      excellenceRating,
      image,
      password,
    } = req.body;

    // Check if email already exists
    const existingPanelist = await SuperPanelist.findOne({ email });
    if (existingPanelist) {
      return sendResponse(res, true, "Email already exists", 400);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the super panelist
    const newPanelist = new SuperPanelist({
      name,
      email,
      contactNumber,
      socialMedia,
      occupation,
      areaOfExpertise,
      contributionSummary,
      excellenceRating,
      image,
      password: hashedPassword,
    });

    await newPanelist.save();

    return sendResponse(
      res,
      true,
      "Super Panelist created successfully",
      HttpStatus.CREATED,
      { data: newPanelist }
    );
  } catch (error) {
    console.error("Error creating super panelist:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
