const employeeModel = require("../models/Employeemodel");

async function GetEmployees(req, res) {
  try {
    await employeeModel.find({}).then((documents) => {
      res.send(documents);
    });
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = GetEmployees;
