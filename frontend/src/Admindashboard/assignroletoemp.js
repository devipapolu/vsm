import axios from "axios";
import React, { useState, useEffect } from "react";
import RemindOutlineIcon from "@rsuite/icons/RemindOutline";
import { Select, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const AssignRoleToEmp = ({ handleClose, GetEmployee, query, updated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profile: "",
    mobile: "",
    empid: "",
    position: "",
    role: "",
    password: "",
    primaryid: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [saveloader, setSaveloader] = useState(false);

  // Fetch employee data by ID
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8090/api/getempbyid/${query}`
        );
        const employeeData = response.data?.data?.[0];
        if (employeeData) {
          setFormData({
            name: employeeData.name || "",
            email: employeeData.email || "",
            profile: employeeData.profile || "",
            mobile: employeeData.mobile || "",
            empid: employeeData.empid || "",
            position: employeeData.position || "",
            role: "",
            password: "",
            primaryid: employeeData._id || "",
          });
        } else {
          console.error("No employee data found.");
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployee();
  }, [query]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (submitted) {
      validateField(name, value);
    }
  };

  // Validation logic
  const validateField = (field, value) => {
    let error = "";

    if (field === "role" && !value) {
      error = "Role is required.";
    }

    if (field === "password") {
      if (!value) {
        error = "Password is required.";
      } else if (value.length < 8) {
        error = "Password must be at least 8 characters long.";
      } else if (!/[A-Z]/.test(value)) {
        error = "Password must include at least one uppercase letter.";
      } else if (!/[0-9]/.test(value)) {
        error = "Password must include at least one number.";
      } else if (!/[!@#$%^&*]/.test(value)) {
        error = "Password must include at least one special character.";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.role) {
      newErrors.role = "Role is required.";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else {
      validateField("password", formData.password);
      if (errors.password) valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      setSaveloader(true);
      try {
        const response = await axios.post(
          `http://127.0.0.1:8090/api/register`,
          formData
        );
        if (response.data?.success) {
          updated();
          GetEmployee();
          handleClose();
          setSaveloader(false);
        }
      } catch (error) {
        console.error("Error assigning employee:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  const ROLEoptions = [
    { value: "Admin", label: "Admin" },
    { value: "GENERAL", label: "Receptionist" },
  ];

  const handleSelectRole = (value) => {
    setFormData((prev) => ({ ...prev, role: value }));
    if (submitted) validateField("role", value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Read-only fields */}
        {["name", "email"].map((field) => (
          <div key={field}>
            <label className="font-semibold">
              {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              readOnly
              className="mb-3 w-full px-3 py-2 border rounded-md outline-none bg-gray-100"
            />
          </div>
        ))}

        {/* Role selection */}
        <div>
          <label className="font-semibold">Role:</label>
          <Select
            className={`${
              errors.role ? "border-red-500 " : "mb-4"
            }  w-full h-10 rounded-md`}
            placeholder="Select Role"
            onChange={handleSelectRole}
            options={ROLEoptions}
          />
          {submitted && errors.role && (
            <div className="text-red-500 flex items-center gap-2">
              <RemindOutlineIcon />
              {errors.role}
            </div>
          )}
        </div>

        {/* Password input */}
        <div>
          <label className="font-semibold">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`${
              errors.password ? "border-red-500" : ""
            } w-full px-3 py-2 border rounded-md outline-none`}
            placeholder="Enter password"
          />
          {submitted && errors.password && (
            <div className="text-red-500 flex items-center gap-2">
              <RemindOutlineIcon />
              {errors.password}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 text-black rounded"
          >
            Cancel
          </button>

          {saveloader ? (
            <button
              type="button"
              disabled={true}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Assign{" "}
              <Spin
                indicator={
                  <LoadingOutlined spin className=" text-white ms-2" />
                }
              />
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Assign
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AssignRoleToEmp;