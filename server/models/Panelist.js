import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Main Panelist Schema
const PanelistSchema = new mongoose.Schema(
  {
    // Personal Information
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    contactNumber: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    occupation: {
      type: String,
      required: true,
    },

    // Professional Information
    areaOfExpertise: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],

    yearsOfExperience: {
      type: Number,
      required: true,
    },

    contributionSummary: {
      type: String,
      required: true,
    },

    publications: {
      type: String,
      trim: true,
    },

    awards: {
      type: String,
      trim: true,
    },

    // Social Media & Online Presence
    linkedIn: { type: String, trim: true },
    twitter: { type: String, trim: true },
    github: { type: String, trim: true },
    website: { type: String, trim: true },
    otherSocialMedia: { type: String, trim: true },

    // Assignment Information
    assignedCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },

    areaOfResponsibility: [
      {
        type: String,
        required: true,
      },
    ],

    designationTitle: {
      type: String,
      required: true,
    },
    assignedBy: {
      type: String,
      required: true,
    },

    photo: [{ type: String }], // Array of file paths or names
    identityProof: [{ type: String }],
    certification: [{ type: String }],
    resume: [{ type: String }],

    // System Fields
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "suspended"],
      default: "pending",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },

    approvedAt: {
      type: Date,
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "superpanelists",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
PanelistSchema.index({ email: 1 }); // only this is necessary for unique email
PanelistSchema.index({ assignedCategory: 1 });
PanelistSchema.index({ status: 1 });
PanelistSchema.index({ areaOfExpertise: 1 });
PanelistSchema.index({ createdAt: -1 });

// Virtuals
PanelistSchema.virtual("displayName").get(function () {
  return this.name;
});

// Password hashing
PanelistSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Methods
PanelistSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

PanelistSchema.methods.getPublicProfile = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

// Statics
PanelistSchema.statics.findByExpertise = function (expertise) {
  return this.find({
    areaOfExpertise: { $in: [expertise] },
    status: "approved",
    isActive: true,
  });
};

PanelistSchema.statics.findByCategory = function (category) {
  return this.find({
    assignedCategory: category,
    status: "approved",
    isActive: true,
  });
};

const Panelist = mongoose.model("Panelist", PanelistSchema);
export default Panelist;
