const visitorModel = require("../models/VisitorModel");

async function Updatecheckout(req, res) {
  try {
    // Update the visitor(s) with the new checkin time and set checkin to true
    const result = await visitorModel.updateOne(
      { _id: req.params.id }, // or any condition to find the correct visitor
      {
        $set: {
          checkouttime: new Date(), // Set checkinTime to the current time
          checkout: true, // Set checkin status to true
        },
      }
    );

    if (result.nModified > 0) {
      res.status(200).send("Check-in updated successfully");
    } else {
      res.status(204).send("Visitor not found or already checked-in");
    }
  } catch (error) {
    console.error("Error updating check-in:", error);
    res.status(500).send("Server Error");
  }
}

module.exports = Updatecheckout;
