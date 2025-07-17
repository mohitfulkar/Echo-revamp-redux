import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const PanelistSchema = new mongoose.Schema(
  {
    // Personal Information
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true },
    password: { type: String, required: true },
    occupation: { type: String, required: true },

    // Professional Information
    expertise: [{ type: String, required: true, trim: true }],
    experience: { type: Number, required: true },
    contribution: { type: String, required: true },
    publications: { type: String, trim: true },
    awards: { type: String, trim: true },

    // Social Media & Online Presence
    linkedIn: { type: String, trim: true },
    twitter: { type: String, trim: true },
    github: { type: String, trim: true },
    website: { type: String, trim: true },
    otherSocialMedia: { type: String, trim: true },

    // Assignment Information
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    responsibility: [{ type: String, required: true }],
    designation: { type: String, required: true },
    assignedBy: { type: String, required: true },

    photo: { type: String },
    identityProof: [{ type: String }],
    certification: [{ type: String }],
    resume: { type: String },

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED", "SUSPENDED"],
      default: "PENDING",
    },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    approvedAt: { type: Date },
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
PanelistSchema.index({ category: 1 });
PanelistSchema.index({ status: 1 });
PanelistSchema.index({ expertise: 1 });
PanelistSchema.index({ createdAt: -1 });

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

// Append BASE_URL to file paths
function addBaseUrlToFilePaths(obj) {
  const fields = ["photo", "identityProof", "certification", "resume"];
  fields.forEach((field) => {
    if (Array.isArray(obj[field])) {
      obj[field] = obj[field].map((file) =>
        file.startsWith("http") ? file : `${BASE_URL}${file}`
      );
    }
  });
}

// Custom JSON transformation
PanelistSchema.methods.toJSON = function () {
  const obj = this.toObject({ virtuals: true });
  delete obj.password;
  delete obj.__v;
  addBaseUrlToFilePaths(obj);
  return obj;
};

// Methods
PanelistSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

PanelistSchema.methods.getPublicProfile = function () {
  const obj = this.toJSON(); // already includes base URLs
  return obj;
};

// Statics
PanelistSchema.statics.findByExpertise = function (expertise) {
  return this.find({
    expertise: { $in: [expertise] },
    status: "approved",
    isActive: true,
  });
};

PanelistSchema.statics.findByCategory = function (category) {
  return this.find({
    category: category,
    status: "approved",
    isActive: true,
  });
};

const Panelist = mongoose.model("Panelist", PanelistSchema);
export default Panelist;
