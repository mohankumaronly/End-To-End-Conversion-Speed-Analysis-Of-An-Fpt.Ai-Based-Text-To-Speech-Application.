// models/userModel.js
import mongoose from "mongoose";

const ttsRecordSchema = new mongoose.Schema({
  filename: { type: String, required: true },   // saved filename
  url: { type: String, required: true },        // public URL or path
  text: { type: String },                       // text used for TTS
  voice: { type: String },                      // requested voice
  speed: { type: Number },                      // numeric speed
  sizeBytes: { type: Number },                  // file size in bytes
  mimeType: { type: String },                   // e.g. audio/mpeg
  durationSec: { type: Number },                // audio duration in seconds
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  avatar: { type: String },
  isVerified: { type: Boolean, default: false },
  isLoggedIn: { type: Boolean, default: false },
  token: { type: String, default: null },
  otp: { type: String, default: null },
  otpExpiry: { type: Date, default: null },
  // Attach TTS records here
  ttsRecords: { type: [ttsRecordSchema], default: [] }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
export default User;
