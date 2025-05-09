import mongoose from "mongoose";

const PollSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  pollQuestion: {
    type: String,
    required: true,
  },
  options: [
    {
      name: { type: String, required: true },
      voteCount: { type: Number, default: 0 },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming "User" is the model for users
    required: true,
  },
  created_by_name: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Poll = mongoose.model("Poll", PollSchema);

export default Poll;
