import mongoose from "mongoose";
const panelistSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  service: String,
  contribution: String,
  topicOfInterest: String,
  secretKey: String,
  x: String,
  facebook: String,
  instagram: String,
  photo: String, // To store image URL or path
});

export const Panelist = mongoose.model("Panelist", panelistSchema);
