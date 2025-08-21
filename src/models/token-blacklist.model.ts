import mongoose from "mongoose";

const tokenBlacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // Automatically delete after 1 hour (matching token expiry)
  },
});

export default mongoose.model("TokenBlacklist", tokenBlacklistSchema);
