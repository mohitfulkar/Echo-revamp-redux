import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  voteCount: {
    type: Number,
    default: 0,
  },
});

const questionSchema = new mongoose.Schema(
  {
    pollId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["single", "multiple"],
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
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
export default Question;
