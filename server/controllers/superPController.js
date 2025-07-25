import bcrypt from "bcryptjs";
import SuperPanelist from "../models/SuperPanelist.js";
import { sendResponse, sendServerError } from "../utils/response.js";
import { HttpStatus } from "../constants/statusCode.js";

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
      return sendResponse(
        res,
        true,
        "Email already exists",
        HttpStatus.BAD_REQUEST
      );
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
    return sendServerError(res);
  }
};
