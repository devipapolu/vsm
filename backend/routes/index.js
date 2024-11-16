require("dotenv").config();

const express = require("express");
const userSignupController = require("../controller/userController");
const USersign = require("../controller/signin");
const verifyTokenAndCheckActivation = require("../controller/ActivatonToken"); // Import the middleware
const getuserDetailsfromtoken = require("../controller/ActivatonToken");
const userDetailsController = require("../controller/getuser");

const router = express.Router();

router.post("/register", userSignupController);
router.post("/login", USersign);

router.get("/getuser", userDetailsController);

module.exports = router;
