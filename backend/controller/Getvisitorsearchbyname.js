const visitorModel = require("../models/VisitorModel");

async function Getvisitorsbyname(req, res) {
  const { query } = req.body;

  try {
    const users = await visitorModel.find({
      name: { $regex: query, $options: "i" },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = Getvisitorsbyname;
