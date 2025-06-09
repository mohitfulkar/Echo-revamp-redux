import mongoose from "mongoose";

const panelistSchema = new mongoose.Schema({
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
    type: [String], // e.g., ["AI", "Education"]
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

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  authorizedToCreatePolls: {
    type: Boolean,
    default: true,
  },

  pollsCreated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
    },
  ],

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  notes: {
    type: String, // admin/internal notes
  },

  image: {
    type: String, // File path or URL to image
    default: "", // Empty if not uploaded
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

panelistSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Panelist = mongoose.model("Panelist", panelistSchema);
export default Panelist;
