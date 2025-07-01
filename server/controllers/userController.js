import { HttpStatus } from "../constants/statusCode.js";
import Category from "../models/Category.js";
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

export const createPanelist = async (req, res) => {
  try {
    const {
      name,
      email,
      contactNumber,
      password,
      occupation,
      areaOfExpertise,
      yearsOfExperience,
      contributionSummary,
      publications,
      awards,
      assignedCategory,
      areaOfResponsibility,
      designationTitle,
      assignedBy,
      linkedIn,
      twitter,
      github,
      website,
      otherSocialMedia,
    } = req.body;

    // Normalize expertise to array
    const expertiseArray = Array.isArray(areaOfExpertise)
      ? areaOfExpertise
      : [areaOfExpertise];

    const responsibilityArray = Array.isArray(areaOfResponsibility)
      ? areaOfResponsibility
      : areaOfResponsibility
      ? [areaOfResponsibility]
      : [];

    const getFilenames = (field) =>
      req.files?.[field]?.map((file) => file.path) || [];

    const identityProof = getFilenames("identityProof");
    const resume = getFilenames("resume");
    const certification = getFilenames("certification");
    const photo = getFilenames("photo"); // Check for existing panelist

    const existing = await Panelist.findOne({ email });
    if (existing) {
      return sendResponse(
        res,
        false,
        "A panelist with this email already exists",
        HttpStatus.BAD_REQUEST
      );
    }

    const panelist = await Panelist.create({
      name,
      email,
      contactNumber,
      password,
      occupation,
      areaOfExpertise: expertiseArray,
      yearsOfExperience,
      contributionSummary,
      publications,
      awards,
      assignedCategory, // ← Move to root level
      areaOfResponsibility: responsibilityArray, // ← Move to root level
      designationTitle, // ← Move to root level
      assignedBy, // ← Move to root level
      linkedIn,
      twitter,
      github,
      website,
      otherSocialMedia,
      identityProof,
      resume,
      certification,
      photo,
    });

    return sendResponse(
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
    return sendServerError(res);
  }
};

export const getPanelist = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}${req.path}`;
    const { page, limit, skip } = getPaginationOptions(req.query);
    const { searchValue, assignedCategory, status } = req.query;
    console.log("assignedCategory", assignedCategory);
    console.log("status", status);

    // Search across name, email, occupation, and expertise
    const filter = {};
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

    if (assignedCategory) {
      filter.assignedCategory = assignedCategory; // expecting category id
    }

    if (status) {
      filter.status = status; // pending/approved/rejected
    }

    const total = await Panelist.countDocuments(filter);
    console.log("total", total);
    // Fetch panelists with assignedCategory populated
    const panelists = await Panelist.find(filter)
      .populate({ path: "assignedCategory", select: "name _id" })
      .lean();

    // For each panelist, fetch polls by createdBy (panelist _id), and questions by pollId
    const panelistsWithDetails = await Promise.all(
      panelists.map(async (panelist) => {
        // Fetch polls created by this panelist
        const polls = await (await import("../models/Poll.js")).default
          .find({ createdBy: panelist._id })
          .lean();
        // For each poll, fetch questions
        const pollsWithQuestions = await Promise.all(
          polls.map(async (poll) => {
            const questions = await (
              await import("../models/Questions.js")
            ).default
              .find({ pollId: poll._id })
              .lean();
            return { ...poll, questions };
          })
        );
        return {
          ...panelist,
          assignedCategory: panelist.assignedCategory, // already populated
          polls: pollsWithQuestions,
        };
      })
    );

    return sendResponse(res, true, "Panelists fetched successfully", 200, {
      data: {
        pagination: buildMeta({
          total,
          page,
          limit,
          baseUrl,
          queryParams: req.query,
        }),
        panelists: panelistsWithDetails,
      },
    });
  } catch (error) {
    console.error("Error fetching panelists:", error);
    return sendServerError(res);
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

    // Log all keys from req.body
    Object.keys(req.body).forEach((key) => {
      console.log(`createSuperPanelist req.body[${key}]:`, req.body[key]);
    });

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
