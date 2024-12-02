const userModel = require("../models/Usermodel");

async function Deleteuserbyprimary(req, res) {
  const id = req.params.id;
  try {
    const user = await userModel.findOne({ primaryid: id });

    if (!user) {
      return res.json({
        message: "user not found",
        error: true,
      });
    }

    await userModel.deleteOne({ primaryid: id });

    res.json({
      message: "user deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = Deleteuserbyprimary;
