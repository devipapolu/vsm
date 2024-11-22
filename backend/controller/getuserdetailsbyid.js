const employeeModel = require("../models/Employeemodel");

async function GetEmployeebyid(req, res) {
  try {
    const id = req.params.id;

    const employee = await employeeModel.find({ _id: id });

    res.status(200).json({
      message: "employee details",
      data: employee,
      success: true,
      error: false,
    });
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = GetEmployeebyid;
