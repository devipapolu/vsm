const userModel = require("../models/Usermodel");

async function Getusers(req, res) {
  try {
    const users = await userModel.find({});

    res.status(200).json({
      message: "all users details",
      data: users,
    });
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = Getusers;
