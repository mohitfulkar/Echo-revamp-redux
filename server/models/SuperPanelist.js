import mongoose from "mongoose";

const superPanelistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  contactNumber: {
    type: String,
    required: true,
  },

  socialMedia: {
    linkedIn: String,
    twitter: String,
    github: String,
    website: String,
  },

  occupation: {
    type: String,
    required: true,
  },

  areaOfExpertise: {
    type: String, // e.g., ["AI", "Education"]
    required: true,
  },

  contributionSummary: {
    type: String,
    required: true,
  },

  excellenceRating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },

  image: {
    type: String, // File path or URL to image
    default: "", // Empty if not uploaded
  },

  password: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

superPanelistSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const SuperPanelist = mongoose.model("SuperPanelist", superPanelistSchema);
export default SuperPanelist;
