const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const router = require("./routes");
const cookieParser = require("cookie-parser");

const app = express();
const corsOptions = {
  origin: "http://localhost:3001", // Frontend URL
  credentials: true, // Allow cookies to be sent with requests
};

app.use(cors(corsOptions)); // Enable CORS with credentials

const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("Connected to database");
  });
});
