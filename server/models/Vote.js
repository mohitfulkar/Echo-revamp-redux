import mongoose from "mongoose";

export const voteSchema = new mongoose.Schema({
  voter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Panelist", // assuming panelists vote
    required: true,
  },
  vote: {
    type: String,
    enum: ["approve", "reject"],
    required: true,
  },
  votedAt: {
    type: Date,
    default: Date.now,
  },
});

export const voteCountSchema = new mongoose.Schema(
  {
    approve: { type: Number, default: 0 },
    reject: { type: Number, default: 0 },
  },
  { _id: false }
);
