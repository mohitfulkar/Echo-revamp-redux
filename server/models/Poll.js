import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["single", "multiple"], // 'single' for single choice, 'multiple' for multiple choice
    default: "single",
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  options: {
    type: [optionSchema],
    validate: {
      validator: function (v) {
        return v.length >= 2;
      },
      message: "Each question must have at least two options.",
    },
  },
});

const pollSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    expiryDate: {
      type: Date,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    questions: {
      type: [questionSchema],
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: "A poll must have at least one question.",
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "closed"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Poll = mongoose.model("Poll", pollSchema);
export default Poll;
