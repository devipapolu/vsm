require("dotenv").config();

const express = require("express");
const userSignupController = require("../controller/userController");
const USersign = require("../controller/signin");
const verifyTokenAndCheckActivation = require("../controller/ActivatonToken"); // Import the middleware
const getuserDetailsfromtoken = require("../controller/ActivatonToken");
const userDetailsController = require("../controller/getuser");
const RegisterEmployee = require("../controller/regemployee");
const GetEmployees = require("../controller/getemployees");

const router = express.Router();

router.post("/register", userSignupController);
router.post("/login", USersign);

router.get("/getuser", userDetailsController);

router.post("/regemployee", RegisterEmployee);

router.get("/employees", GetEmployees);

module.exports = router;
