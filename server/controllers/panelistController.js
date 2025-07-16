import Panelist from "../models/Panelist.js";
import { sendResponse, sendServerError } from "../utils/response.js";
import { HttpStatus } from "../constants/statusCode.js";
import { getPaginationOptions, buildMeta } from "../utils/pagination.js";
import { buildSearchFilter, getBaseURL } from "../routes/queryUtils.js";
import Poll from "../models/Poll.js";
import { uploadFilesToS3 } from "../services/S3Service.js";

/**
 * Create a new panelist
 */

export const getPanelist = async (req, res) => {
  try {
    const baseUrl = getBaseURL(req);
    const { page, limit } = getPaginationOptions(req.query);
    const { searchValue, category, status } = req.query;

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

    if (category) {
      filter.category = category; // expecting category id
    }

    if (status) {
      filter.status = status; // pending/approved/rejected
    }

    const total = await Panelist.countDocuments(filter);
    // Fetch panelists with assignedCategory populated
    const panelists = await Panelist.find(filter)
      .populate({ path: "category", select: "name _id" })
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
          category: panelist.category, // already populated
          polls: pollsWithQuestions,
        };
      })
    );

    return sendResponse(
      res,
      true,
      "Panelists fetched successfully",
      HttpStatus.CREATED,
      {
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
      }
    );
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

export const getPanelistById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the panelist by ID and populate assignedCategory
    const panelist = await Panelist.findById(id)
      .populate({ path: "category", select: "name _id" })
      .lean();

    if (!panelist) {
      return sendResponse(
        res,
        false,
        "Panelist not found",
        HttpStatus.NOT_FOUND
      );
    }

    // Fetch polls created by this panelist and get only poll name and _id
    const polls = await Poll.find({ createdBy: panelist._id })
      .select("title _id")
      .lean();

    return sendResponse(
      res,
      true,
      "Panelist fetched successfully",
      HttpStatus.OK,
      {
        data: {
          name: panelist.name,
          email: panelist.email,
          contactNumber: panelist.contactNumber,
          password: panelist.password,
          occupation: panelist.occupation,
          areaOfExpertise: panelist.expertise,
          yearsOfExperience: panelist.experience,
          contributionSummary: panelist.contribution,
          publications: panelist.publications,
          awards: panelist.awards,
          assignedCategory: panelist.category,
          areaOfResponsibility: panelist.responsibility,
          designationTitle: panelist.designation,
          assignedBy: panelist.assignedBy,
          linkedIn: panelist.linkedIn,
          twitter: panelist.twitter,
          github: panelist.github,
          website: panelist.website,
          otherSocialMedia: panelist.otherSocialMedia,
          identityProof: panelist.identityProof,
          resume: panelist.resume,
          certification: panelist.certification,
          photo: panelist.photo,
          polls: polls, // Array of { _id, name }
        },
      }
    );
  } catch (error) {
    console.error("Error while fetching panelist by id", error);
    return sendServerError(res);
  }
};

export const createPanelist = async (req, res) => {
  try {
    // Extract text fields
    const {
      name,
      email,
      contactNumber,
      password,
      occupation,
      experience,
      contribution,
      publications,
      awards,
      linkedIn,
      twitter,
      github,
      website,
      otherSocialMedia,
      category,
      designation,
      assignedBy,
    } = req.body;

    const uploadedFiles = {};

    // Handle multiple files per field and upload all at once
    for (const field in req.files) {
      const filesArray = req.files[field];
      if (Array.isArray(filesArray) && filesArray.length > 0) {
        // uploadFilesToS3 returns { [folder]: [urls] }
        const result = await uploadFilesToS3(filesArray, field);
        uploadedFiles[field] = result[field]; // get array of URLs for this field
      } else {
        uploadedFiles[field] = [];
      }
    }
    console.log("uploadedFiles", uploadedFiles);
    // Expertise and responsibility might be arrays or single values
    const expertise = Array.isArray(req.body.expertise)
      ? req.body.expertise
      : req.body.expertise
      ? [req.body.expertise]
      : [];
    const responsibility = Array.isArray(req.body.rsb)
      ? req.body.rsb
      : req.body.rsb
      ? [req.body.rsb]
      : [];

    // Create new panelist document
    const panelist = new Panelist({
      name,
      email,
      contactNumber,
      password,
      occupation,
      expertise,
      experience,
      contribution,
      publications,
      awards,
      linkedIn,
      twitter,
      github,
      website,
      otherSocialMedia,
      category,
      responsibility,
      designation,
      assignedBy,
      identityProof: uploadedFiles.identityProof || [],
      resume: uploadedFiles.resume || [],
      certification: uploadedFiles.certification || [],
      photo: uploadedFiles.photo || [],
    });

    await panelist.save();

    return res.status(201).json({
      message: "Panelist created successfully",
      data: panelist.getPublicProfile(),
    });
  } catch (error) {
    console.error("Error creating panelist:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
