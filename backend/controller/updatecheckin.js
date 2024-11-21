const visitorModel = require("../models/VisitorModel");

async function Updatecheckin(req, res) {
  try {
    await visitorModel.updateOne();
  } catch (error) {
    console.log("error", error);
  }
}
