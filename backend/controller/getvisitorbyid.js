const visitorModel = require("../models/VisitorModel");

async function Getvisitorbyid(req, res) {
  const id = req.params.id;
  try {
    await visitorModel.find({ _id: id }).then((documents) => {
      res.send(documents);
    });
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = Getvisitorbyid;
