require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userModel = require("../models/Usermodel");

const getuserDetailsfromtoken = async (token) => {
  if (!token) {
    console.log("No token provided or token is not a string");
    return {
      message: "Session expired",
      logout: true,
    };
  }

  try {
    console.log("Token received:", token); // Log the token for debugging

    // Verify and decode the token
    const decoded = jwt.verify(token, "sdfghjkjhgfdsfghj");
    console.log("Decoded token:", decoded); // Log the decoded token for debugging

    // Check if the userId is valid
    if (!mongoose.Types.ObjectId.isValid(decoded.userId)) {
      // Use decoded.userId here
      console.log("Invalid ObjectId:", decoded.userId);
      return {
        message: "Invalid user ID",
        logout: true,
      };
    }

    // Find the user based on the decoded userId
    const user = await userModel.findById(decoded.userId).select("-password");

    if (!user) {
      console.log("User not found for ID:", decoded.userId);
      return {
        message: "User not found",
        logout: true,
      };
    }

    // Return the user details
    return user;
  } catch (error) {
    console.error("Error in getuserDetailsfromtoken:", error);

    if (error.name === "TokenExpiredError") {
      return {
        message: "Session expired",
        logout: true,
      };
    }

    return {
      message: "Invalid token",
      logout: true,
    };
  }
};

module.exports = getuserDetailsfromtoken;
