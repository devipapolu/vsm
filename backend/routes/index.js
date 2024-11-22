require("dotenv").config();

const express = require("express");
const USersign = require("../controller/signin");
const verifyTokenAndCheckActivation = require("../controller/ActivatonToken"); // Import the middleware
const userDetailsController = require("../controller/getuser");
const RegisterEmployee = require("../controller/regemployee");
const GetEmployees = require("../controller/getemployees");
const Employeesearchbyname = require("../controller/emplyeesearchbyname");
const UserSignup = require("../controller/userController");
const Addvisitor = require("../controller/addvisitor");
const Getvisitors = require("../controller/getvisitors");
const Updatecheckin = require("../controller/updatecheckin");
const Updatecheckout = require("../controller/updatecheckout");
const GetEmployeebyid = require("../controller/getuserdetailsbyid");

const router = express.Router();

router.post("/register", UserSignup);
router.post("/login", USersign);

router.post("/getuser", userDetailsController);

router.post("/regemployee", RegisterEmployee);

router.get("/employees", GetEmployees);

router.post("/searchemployee", Employeesearchbyname);

//add visitor
router.post("/addvisitor", Addvisitor);

//get visitors
router.get("/getvisitors", Getvisitors);

//update checkin
router.put("/chekin/:id", Updatecheckin);

//update checkout
router.put("/checkout/:id", Updatecheckout);

//Get employee by id
router.get("/getempbyid/:id", GetEmployeebyid);

module.exports = router;
