const visitorModel = require("../models/VisitorModel");

async function Getvisitors(req, res) {
  try {
    await visitorModel.find({}).then((documents) => {
      res.send(documents);
    });
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = Getvisitors;
