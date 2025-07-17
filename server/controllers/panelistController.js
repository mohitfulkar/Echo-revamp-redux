import Panelist from "../models/Panelist.js";
import { sendResponse, sendServerError } from "../utils/response.js";
import { HttpStatus } from "../constants/statusCode.js";
import { getPaginationOptions, buildMeta } from "../utils/pagination.js";
import { buildSearchFilter, getBaseURL } from "../routes/queryUtils.js";
import Poll from "../models/Poll.js";
import { uploadFilesToS3 } from "../services/S3Service.js";
import Expertise from "../models/Expertise.js";
import { getDetailById, populateIdsWithDetails } from "../utils/dbUtils.js";
import Responsibility from "../models/Reponsibility.js";
import Designation from "../models/Designation.js";

/**
 * Create a new panelist
 */

const buildPanelistFilter = (query) => {
  const { searchValue, category, status } = query;
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

  if (category) filter.category = category;
  if (status) filter.status = status;

  return filter;
};

const enrichPanelistWithPolls = async (panelistId) => {
  const polls = await Poll.find({ createdBy: panelistId }).lean();

  const pollsWithQuestions = await Promise.all(
    polls.map(async (poll) => {
      const questions = await Question.find({ pollId: poll._id }).lean();
      return { ...poll, questions };
    })
  );

  return pollsWithQuestions;
};

export const getPanelist = async (req, res) => {
  try {
    const baseUrl = getBaseURL(req);
    const { page, limit, skip } = getPaginationOptions(req.query);
    const filter = buildPanelistFilter(req.query);

    const total = await Panelist.countDocuments(filter);

    const panelists = await Panelist.find(filter)
      .populate({ path: "category", select: "name _id" })
      .skip(skip)
      .limit(limit)
      .lean();

    const panelistsWithDetails = await Promise.all(
      panelists.map(async (panelist) => {
        const polls = await enrichPanelistWithPolls(panelist._id);

        // Populate expertise details
        const expertiseData = await populateIdsWithDetails(
          Expertise,
          panelist.expertise,
          ["_id", "name"]
        );
        const rsbData = await populateIdsWithDetails(
          Responsibility,
          panelist.responsibility,
          ["_id", "name"]
        );

        const desginationData = await getDetailById(
          Designation,
          panelist?.designation,
          ["name"]
        );

        return {
          ...panelist,
          expertise: expertiseData, // now array of { _id, name }
          rsb: rsbData,
          designation: desginationData,
          polls,
        };
      })
    );

    return sendResponse(
      res,
      true,
      "Panelists fetched successfully",
      HttpStatus.OK,
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
          expertise: panelist.expertise,
          experience: panelist.experience,
          contribution: panelist.contribution,
          publications: panelist.publications,
          awards: panelist.awards,
          category: panelist.category,
          rsb: panelist.responsibility,
          designation: panelist.designation,
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

export const updatePanelist = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Panelist ID is required" });
    }

    const updateData = {};

    // Whitelisted fields
    const allowedFields = [
      "name",
      "email",
      "contactNumber",
      "password",
      "occupation",
      "experience",
      "contribution",
      "publications",
      "awards",
      "linkedIn",
      "twitter",
      "github",
      "website",
      "otherSocialMedia",
      "category",
      "designation",
      "assignedBy",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // Normalize array fields
    if (req.body.expertise !== undefined) {
      updateData.expertise = Array.isArray(req.body.expertise)
        ? req.body.expertise
        : [req.body.expertise];
    }

    if (req.body.rsb !== undefined) {
      updateData.responsibility = Array.isArray(req.body.rsb)
        ? req.body.rsb
        : [req.body.rsb];
    }

    // Helper to combine uploaded files + existing file URLs
    const getFileFieldData = (field) => {
      const uploaded = uploadedFiles[field] || [];
      const existing = [];

      const bodyField = req.body[field];
      if (Array.isArray(bodyField)) {
        bodyField.forEach((entry) => {
          try {
            const parsed =
              typeof entry === "string" ? JSON.parse(entry) : entry;
            if (parsed?.url) {
              existing.push(parsed.url);
            }
          } catch (err) {
            console.warn(`Failed to parse file entry for ${field}`, entry);
          }
        });
      }

      return [...existing, ...uploaded]; // Merge existing + new
    };

    // Handle file uploads
    const uploadedFiles = {};
    if (req.files && Object.keys(req.files).length > 0) {
      for (const field in req.files) {
        const filesArray = req.files[field];
        if (Array.isArray(filesArray) && filesArray.length > 0) {
          const result = await uploadFilesToS3(filesArray, field);
          if (result[field]) {
            uploadedFiles[field] = result[field]; // URLs
          }
        }
      }
    }

    // Append merged file data
    const fileFields = ["identityProof", "resume", "certification", "photo"];
    fileFields.forEach((field) => {
      if (req.body[field] || uploadedFiles[field]) {
        updateData[field] = getFileFieldData(field);
      }
    });

    const updatedPanelist = await Panelist.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPanelist) {
      return res.status(404).json({ message: "Panelist not found" });
    }

    return res.status(200).json({
      message: "Panelist updated successfully",
      data: updatedPanelist.getPublicProfile(),
    });
  } catch (error) {
    console.error("Error updating panelist:", error);
    return sendServerError(res, error.message);
  }
};
