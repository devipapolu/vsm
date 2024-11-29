const employeeModel = require("../models/Employeemodel");

async function DeleteEmployeebyid(req, res) {
  const id = req.params.id;

  try {
    const employee = await employeeModel.findById({ _id: id });

    if (!employee) {
      return res.status(204).json({ message: "Visitor not found." });
    }

    await employeeModel.deleteOne({ _id: id });

    return res.status(200).json({
      message: "Employee deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = DeleteEmployeebyid;
