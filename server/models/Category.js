import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
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
});

// Auto-update updatedAt on every save
categorySchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
