const userModel = require("../models/Usermodel");

async function Deleteuserbyid(req, res) {
  const id = req.params.id;
  try {
    const user = await userModel.find({ _id: id });
    if (!user) {
      res.json({
        message: "user not found",
        error: true,
      });
    }

    await userModel.deleteOne({ _id: id });

    return res.json({
      message: "user deleted",
      success: true,
    });
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = Deleteuserbyid;
