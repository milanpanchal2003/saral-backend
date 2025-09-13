// models/User.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { 
    type: String, 
    default: () => new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
  }

});

export default mongoose.model("Contact", userSchema);













