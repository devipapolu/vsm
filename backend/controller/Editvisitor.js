const visitorModel = require("../models/VisitorModel");

async function Updatevisitor(req, res) {
  const id = req.params.id;
  const { name, mobile, address, visitingpurpose, visitingperson } = req.body;

  // Validate incoming data (optional but recommended)
  if (!name || !mobile || !address || !visitingpurpose || !visitingperson) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if the visitor exists
    const existingVisitor = await visitorModel.findById(id);
    if (!existingVisitor) {
      return res.status(404).json({ message: "Visitor not found." });
    }

    // Prepare update object
    const updatevisitor = {
      name,
      mobile,
      address,
      visitingpurpose,
      visitingperson,
    };

    // Update the visitor record
    const updatedVisitor = await visitorModel.updateOne(
      { _id: id },
      { $set: updatevisitor }
    );

    // Check if the update was successful
    if (updatedVisitor.modifiedCount === 0) {
      return res.status(400).json({ message: "No changes were made." });
    }

    // Send a success response
    return res.status(200).json({ message: "Visitor updated successfully." });
  } catch (error) {
    console.error("Error updating visitor:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = Updatevisitor;
