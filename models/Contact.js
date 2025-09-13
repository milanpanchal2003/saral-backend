// models/User.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: () => new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) } // yaha auto date save hoga
});

export default mongoose.model("User", userSchema);













