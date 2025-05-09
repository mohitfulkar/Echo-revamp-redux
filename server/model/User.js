import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  lname: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  votedPolls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Poll" }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", userSchema);
