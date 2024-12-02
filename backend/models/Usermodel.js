const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    profile: String,
    mobile: String,
    empid: String,
    position: String,
    password: String,
    role: String,
    primaryid: String,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
