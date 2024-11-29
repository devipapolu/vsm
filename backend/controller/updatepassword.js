const userModel = require("../models/Usermodel");
const bcrypt = require("bcryptjs");

async function ResetPassword(req, res) {
  try {
    const id = req.params.id;
    const { oldPassword, password } = req.body;

    // Find the user in the database by ID
    const user = await userModel.findOne({ _id: id });

    if (!user) {
      return res.status(204).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordCorrect) {
      return res.status(205).json({
        message: "Old password is incorrect",
        error: true,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await userModel.updateOne(
      { _id: id },
      { $set: { password: hashedPassword } }
    );

    // Send success response
    return res.status(200).json({
      message: "Password updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = ResetPassword;
