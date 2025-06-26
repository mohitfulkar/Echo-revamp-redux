// models/AreaOfExpertise.js
import mongoose from "mongoose";

const ExpertiseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      trim: true,
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
  },
  {
    timestamps: true,
  }
);

// Auto-update updatedAt on every save
ExpertiseSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Expertise = mongoose.model("Expertise", ExpertiseSchema);
export default Expertise;
