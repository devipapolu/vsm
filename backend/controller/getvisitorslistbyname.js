const visitorModel = require("../models/VisitorModel");

async function Getvisitorbyname(req, res) {
  try {
    const name = req.params.name;
    const employee = await visitorModel.find({ visitingperson: name });

    res.json({
      message: "visitors by name",
      success: true,
      error: false,
      data: employee,
    });
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = Getvisitorbyname;
