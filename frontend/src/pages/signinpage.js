import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slice";

const Signin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to validate password requirements
  const validatePassword = (password) => {
    // Example: Minimum 4 characters
    return password.length >= 4;
  };

  // Dynamic email validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Validate the email dynamically
    if (value && !validateEmail(value)) {
      setEmailError("Invalid email format.");
    } else {
      setEmailError("");
    }

    // Clear any general errors when the user types
    setGeneralError("");
  };

  // Dynamic password validation
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Validate the password dynamically
    if (value && !validatePassword(value)) {
      setPasswordError("Password must be at least 4 characters long.");
    } else {
      setPasswordError("");
    }

    // Clear any general errors when the user types
    setGeneralError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneralError("");

    // Final validation check before submitting
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 4 characters long.");
      setLoading(false);
      return;
    }

    try {
      // Make a POST request to login
      const response = await axios.post(
        "http://127.0.0.1:8090/api/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      const responseData = response.data;

      if (responseData.success) {
        console.log("Login Successful", response.data);

        dispatch(setUser(response?.data?.user));

        // Store the token in a cookie with an expiration time (e.g., 7 days)
        setCookie("token", responseData.token, {
          path: "/",
          expires: new Date(Date.now() + 86400000),
        });

        console.log("role", responseData.user.role);

        navigate("/");
      } else {
        setGeneralError(responseData.message || "Login failed");
      }
    } catch (error) {
      setGeneralError("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

        {/* General error message */}
        {generalError && (
          <div className="bg-red-100 text-red-800 p-2 mb-4 rounded-md">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full p-2 mt-2 border ${
                emailError ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
            {/* Reserve space for email error */}
            <div className="h-5  ">
              {emailError && (
                <p className="text-red-600 text-sm mt-1">{emailError}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`w-full p-2 mt-2 border ${
                passwordError ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
            {/* Reserve space for password error */}
            <div className="h-5">
              {passwordError && (
                <p className="text-red-600 text-sm mt-1">{passwordError}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 ${
              (loading || emailError || passwordError) &&
              "opacity-50 cursor-not-allowed"
            }`}
            disabled={loading || emailError || passwordError}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
