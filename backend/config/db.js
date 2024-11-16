const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    // Connect to MongoDB using the connection string from the environment variables
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Additional options if needed
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Re-throw the error to handle it in the server file
  }
}

module.exports = connectDB;
