import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      default: "Voter",
      immutable: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ✅ Virtual field for status_display
UserSchema.virtual("status_display").get(function () {
  return this.isVerified ? "Active" : "Inactive";
});

const User = model("User", UserSchema);

export default User;
