// models/AreaOfExpertise.js
import mongoose from "mongoose";

const ReponsibilitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Responsibility = mongoose.model("Responsibility", ReponsibilitySchema);
export default Responsibility;
