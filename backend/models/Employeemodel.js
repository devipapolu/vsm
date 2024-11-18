const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    profile: String,
    mobile: String,
    empid: Number,
  },
  {
    timestamps: true,
  }
);

const employeeModel = mongoose.model("employee", employeeSchema);

module.exports = employeeModel;
