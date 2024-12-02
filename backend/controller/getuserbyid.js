const userModel = require("../models/Usermodel");

async function Getuserbyprimary(req, res) {
  const id = req.params.id;
  try {
    const user = await userModel.findOne({
      $or: [{ primaryid: id }, { _id: id }],
    });

    if (user) {
      res.status(200).json({
        success: true,
        data: user,
      });
    }
    if (!user) {
      res.status(204).json({
        success: false,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = Getuserbyprimary;
