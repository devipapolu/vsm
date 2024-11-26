const visitorModel = require("../models/VisitorModel");

async function Deletevisitor(req, res) {
  const id = req.params.id;

  try {
    // Find the visitor first (optional, but useful for returning the visitor's info)
    const visitor = await visitorModel.findById(id);

    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found." });
    }

    // Delete the visitor
    await visitorModel.deleteOne({ _id: id });

    // Respond with a success message
    return res.json({
      message: `${visitor.name} deleted successfully`,
      success: true,
      // Use template literals for concatenation
    });
  } catch (error) {
    console.error("Error deleting visitor:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = Deletevisitor;
