import mongoose from "mongoose";

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
    // Removed embedded `options`
  },
  { timestamps: true }
);

questionSchema.virtual("options", {
  ref: "Option",
  localField: "_id",
  foreignField: "questionId",
});

questionSchema.set("toObject", { virtuals: true });
questionSchema.set("toJSON", { virtuals: true });

const Question = mongoose.model("Question", questionSchema);
export default Question;
