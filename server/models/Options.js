import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
  {
    pollId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      required: true,
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    voteCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Option = mongoose.model("Option", optionSchema);
export default Option;
