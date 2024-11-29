const userModel = require("../models/Usermodel");

async function Usersearchbyname(req, res) {
  const { query } = req.body;

  try {
    const users = await userModel.find({
      name: { $regex: query, $options: "i" },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error during search:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while searching for users." });
  }
}

module.exports = Usersearchbyname;
