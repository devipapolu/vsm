async function userDetailsController(req, res) {
  try {
    const token = req.cookies.token || "";
    console.log("Token from cookies:", token); // Log the token for debugging

    const user = await getuserDetailsfromtoken(token);

    return res.status(200).json({
      message: "User details",
      data: user,
      success: true,
    });
  } catch (error) {
    console.error("Error retrieving user details:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = userDetailsController;
