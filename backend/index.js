require("dotenv").config();
const express = require("express");
const sql = require("mssql/msnodesqlv8");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const sendmail = require("./utils/sendMail");
const ejs = require("ejs");
const path = require("path");
const { error } = require("console");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser()); // Middleware to parse cookies

// Database config
const dbconfig = {
  server: "DESKTOP-2B1B958\\SQLEXPRESS", // Your SQL Server instance
  database: "Visitor_management_system", // Database name
  driver: "msnodesqlv8", // SQL Server driver for Node.js
  options: {
    trustedConnection: true, // Use Windows Authentication
  },
};

// JWT Secret (should be stored securely in .env file)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Change this in your environment

// 1. REGISTER USER (Without generating a token)
app.post("/register", async (req, res) => {
  const {
    userName,
    userEmail,
    password,
    role = "General",
    Mobile,
    Image,
  } = req.body;

  // Validate that userName, userEmail, and password are provided
  if (!userName || !userEmail || !password) {
    return res
      .status(400)
      .json({ message: "userName, userEmail, and password are required" });
  }

  console.log("Received Mobile:", Mobile); // Debugging the Mobile value

  try {
    // Connect to the database
    await sql.connect(dbconfig);

    // Check if the user already exists
    const checkUser = new sql.Request();
    checkUser.input("userEmail", sql.VarChar, userEmail);
    const userResult = await checkUser.query(
      `SELECT * FROM Users WHERE userEmail = @userEmail`
    );

    if (userResult.recordset.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10

    // Convert Mobile to number if it's provided
    const mobileAsNumber = Mobile ? parseFloat(Mobile) : null;

    // If the conversion of Mobile fails (NaN), return an error
    if (mobileAsNumber && isNaN(mobileAsNumber)) {
      return res.status(400).json({ message: "Invalid Mobile number format" });
    }

    // Insert the new user into the database
    const newUser = new sql.Request();
    newUser.input("userName", sql.VarChar, userName);
    newUser.input("userEmail", sql.VarChar, userEmail);
    newUser.input("Mobile", sql.Float, mobileAsNumber); // Use a number for FLOAT column
    newUser.input(
      "Image",
      sql.VarBinary,
      Image ? Buffer.from(Image, "base64") : null
    ); // Convert base64 to binary
    newUser.input("password", sql.VarChar, hashedPassword);
    newUser.input("role", sql.VarChar, role);

    await newUser.query(
      `INSERT INTO Users (userName, userEmail, Mobile, Image, password, role) 
         VALUES (@userName, @userEmail, @Mobile, @Image, @password, @role)`
    );

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: { userName, userEmail, role },
    });
  } catch (error) {
    console.error("Error executing SQL query:", error); // Log the SQL error
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  } finally {
    sql.close();
  }
});

// 2. LOGIN USER (JWT token creation)
app.post("/login", async (req, res) => {
  const { userEmail, password } = req.body;

  if (!userEmail || !password) {
    return res
      .status(400)
      .json({ message: "userEmail and password are required" });
  }

  try {
    // Connect to the database
    await sql.connect(dbconfig);

    // Check if user exists
    const checkUser = new sql.Request();
    checkUser.input("userEmail", sql.VarChar, userEmail);
    const userResult = await checkUser.query(
      `SELECT * FROM Users WHERE userEmail = @userEmail`
    );

    if (userResult.recordset.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = userResult.recordset[0];

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const payload = {
      userName: user.userName,
      userEmail: user.userEmail,
      role: user.role,
      Image: user.Image,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }); // Token expires in 1 hour

    // Set the JWT token in an HTTP-only cookie
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure flag only in production
      maxAge: 3600000, // 1 hour expiration
      sameSite: "Strict",
    });

    return res.status(200).json({
      message: "Login successful",
      success: true,
      user: {
        userName: user.userName,
        userEmail: user.userEmail,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  } finally {
    sql.close();
  }
});

// 3. PROTECTED ROUTE (Example)
const verifyToken = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied." });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token", error: true });
    }

    req.user = decoded; // Attach user info to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

app.get("/protected", verifyToken, (req, res) => {
  res
    .status(200)
    .json({ message: "This is a protected route", user: req.user });
});

// 4. LOGOUT USER (Clearing the cookie)
app.post("/logout", (req, res) => {
  res.clearCookie("auth_token"); // Clear the JWT cookie
  res.status(200).json({ message: "Logged out successfully" });
});

//Forget Password

app.post("/forget-password", async (req, res) => {
  const { userEmail } = req.body;

  // Validate the input
  if (!userEmail) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Connect to the database
    await sql.connect(dbconfig);

    // Check if the user exists
    const checkUser = new sql.Request();
    checkUser.input("userEmail", sql.VarChar, userEmail);
    const userResult = await checkUser.query(
      `SELECT * FROM Users WHERE userEmail = @userEmail`
    );

    if (userResult.recordset.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a random 4-digit activation code
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    // Create JWT payload with activation code and expiration time (5 minutes)
    const activationToken = jwt.sign(
      { activationCode, userEmail },
      JWT_SECRET,
      { expiresIn: "5m" } // Token expires in 5 minutes
    );

    // Prepare the data to pass to the email template
    const data = { user: userEmail, activationcode: activationCode };

    // Render the email content using EJS template
    ejs.renderFile(
      path.join(__dirname, "./mails/activation-mail.ejs"), // Make sure path is correct
      data,
      async (err, html) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: "Error rendering email template",
            error: err,
          });
        }

        try {
          // Send the email to the user with the activation code
          await sendmail({
            email: userEmail,
            subject: "Forget Passsword",
            template: "activation-mail.ejs",
            data: { ...data, html }, // Pass the rendered HTML to sendmail
          });

          // Respond to the client
          return res.status(200).json({
            success: true,
            message: `Please check your email (${userEmail}) for the activation code.`,
            activationToken,
          });
        } catch (err) {
          console.error("Error sending email:", err);
          return res.status(500).json({
            success: false,
            message: "Error sending email, please try again later.",
            error: err.message,
          });
        }
      }
    );
  } catch (err) {
    console.error("Error processing the request:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  } finally {
    sql.close(); // Always close the connection
  }
});

//check activation code
app.post("/verify-activation", async (req, res) => {
  const { activationToken, userActivationCode } = req.body;

  // Validate input
  if (!activationToken || !userActivationCode) {
    return res
      .status(400)
      .json({ message: "Activation token and activation code are required" });
  }

  try {
    // Verify the activationToken
    const decoded = jwt.verify(activationToken, JWT_SECRET);

    // Extract activation code from the decoded token
    const { activationCode, userEmail } = decoded;

    // Check if the user-provided activation code matches the one in the token
    if (activationCode !== userActivationCode) {
      return res.status(400).json({ message: "Invalid activation code" });
    }

    // The activation code is valid and the token is not expired
    // You can proceed to reset the password or allow the user to proceed
    return res.status(200).json({
      message:
        "Activation code verified successfully, you can reset your password now.",
      userEmail,
      success: true,
      error: false,
    });
  } catch (error) {
    // If the token is invalid or expired
    console.error("Error verifying token:", error);
    return res.status(400).json({
      message: "Invalid or expired activation token",
    });
  }
});

app.post("/update-password", async (req, res) => {
  const { password, confirmPassword, userEmail } = req.body;

  try {
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Please make sure the password and confirm password match.",
        success: false,
        error: true,
      });
    }

    // Optional: Additional password validation (e.g., minimum length, complexity)
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long.",
        success: false,
        error: true,
      });
    }

    // Hash the new password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // Adjust salt rounds as needed

    // Connect to the database
    await sql.connect(dbconfig); // Assuming dbconfig is set up correctly

    // Prepare the query with parameters
    const request = new sql.Request();
    request.input("userEmail", sql.VarChar, userEmail);
    request.input("password", sql.VarChar, hashedPassword);

    // Query to check if the user exists
    const result = await request.query(
      "SELECT * FROM Users WHERE userEmail = @userEmail"
    );

    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
        error: true,
      });
    }

    // Update the password in the database
    await request.query(
      "UPDATE Users SET password = @password WHERE userEmail = @userEmail"
    );

    res.json({
      message: "Password updated successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({
      message: "An error occurred while updating the password.",
      success: false,
      error: true,
    });
  }
});

//delete user
app.delete("/deleteuser/:email", async (req, res) => {
  const email = req.params.email; // Extract user email from URL parameters

  try {
    await sql.connect(dbconfig); // Establish the database connection

    const checkUser = new sql.Request();
    checkUser.input("userEmail", sql.VarChar, email); // Pass the email from the request to the SQL query

    // Perform the DELETE query
    const result = await checkUser.query(
      `DELETE FROM Users WHERE userEmail = @userEmail`
    );

    if (result.rowsAffected[0] > 0) {
      // If one or more rows are affected, user was deleted successfully
      res.status(200).send({ message: "User deleted successfully" });
    } else {
      // If no rows were affected, no user was found with that email
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});
