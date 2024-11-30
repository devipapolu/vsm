const employeeModel = require("../models/Employeemodel");

async function Editemployee(req, res) {
  const id = req.params.id;
  const { name, email, profile, mobile, empid, position } = req.body;
  try {
    const existingVisitor = await employeeModel.findById(id);
    if (!existingVisitor) {
      return res.status(404).json({ message: "Employee not found." });
    }

    const updateemployee = {
      name,
      email,
      profile,
      mobile,
      empid,
      position,
    };

    const UpdateEmployee = await employeeModel.updateOne(
      { _id: id },
      updateemployee
    );

    if (UpdateEmployee.modifiedCount === 0) {
      return res.status(204).json({ message: "No changes were made." });
    }

    // Send a success response
    return res
      .status(200)
      .json({ message: "Employee updated successfully.", success: true });
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = Editemployee;
