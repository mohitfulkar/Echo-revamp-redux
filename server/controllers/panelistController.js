import Panelist from "../models/Panelist.js";
import { sendResponse, sendServerError } from "../utils/response.js";
import { HttpStatus } from "../constants/statusCode.js";
import { getPaginationOptions, buildMeta } from "../utils/pagination.js";
import { buildSearchFilter } from "../routes/queryUtils.js";

/**
 * Create a new panelist
 */
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
      assignedCategory,
      areaOfResponsibility: responsibilityArray,
      designationTitle,
      assignedBy,
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
