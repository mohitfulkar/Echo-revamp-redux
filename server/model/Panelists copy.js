import mongoose from "mongoose";

// const panelistSchema = new mongoose.Schema({
//   fullName: {
//     type: String,
//     required: [true, "Full name is required"],
//     trim: true,
//     minlength: [2, "Full name must be at least 2 characters long"],
//   },
//   email: {
//     type: String,
//     required: [true, "Email is required"],
//     unique: true,
//     validate: {
//       validator: validateEmail,
//       message: "Please enter a valid email address",
//     },
//     trim: true,
//   },
//   phone: {
//     type: String,
//     required: [true, "Phone number is required"],
//     validate: {
//       validator: validatePhoneNumber,
//       message: "Please enter a valid phone number in E.164 format",
//     },
//   },
//   topicOfInterest: {
//     type: String,
//     required: [true, "Topic of interest is required"],
//     trim: true,
//   },
//   occupation: {
//     type: String,
//     required: [true, "Occupation is required"],
//     trim: true,
//   },
//   secretKey: {
//     type: String,
//     required: [true, "Secret key is required"],
//   },
//   socialMedia: {
//     x: { type: String, default: "" },
//     facebook: { type: String, default: "" },
//     instagram: { type: String, default: "" },
//     website: { type: String, default: "" },
//   },
// });

// Export the Panelist model

const panelistSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  service: String,
  contribution: String,
  topicOfInterest: String,
  secretKey: String,
  socialMedia: {
    x: String,
    facebook: String,
    instagram: String,
  },
  imageUrl: String, // To store image URL or path
});

export const Panelist = mongoose.model("Panelist", panelistSchema);
