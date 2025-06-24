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

const Expertise = mongoose.model("Expertise", ExpertiseSchema);
export default Expertise;
