import axios from "axios";
import React, { useState, useEffect } from "react";
import RemindOutlineIcon from "@rsuite/icons/RemindOutline";

const AssignRoleToEmp = ({ handleClose, GetEmployee, query }) => {
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

  // Handle input changes for editable fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitted) validateField(name, value);
  };

  // Validation rules
  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "role":
        error = value ? "" : "Role is required";
        break;
      case "password":
        error = value ? "" : "Password is required";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validateForm = () => {
    const requiredFields = ["role", "password"];
    let isValid = true;
    const newErrors = {};

    requiredFields.forEach((field) => {
      const value = formData[field];
      const error = validateField(field, value);
      if (error) {
        isValid = false;
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!validateForm()) {
      return;
    }

    try {
      // const response = await axios.post(
      //   `http://127.0.0.1:8090/api/register`,
      //   formData
      // );
      // if (response.data?.success) {
      //   alert("Employee assigned successfully!");
      //   GetEmployee();
      //   handleClose();
      // }
    } catch (error) {
      console.error("Error assigning employee:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Read-only fields for name and email */}
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

        {/* Editable fields for role and password */}
        {["role", "password"].map((field) => (
          <div key={field}>
            <label className="font-semibold">
              {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              className={`${
                errors[field] ? "border-red-500" : ""
              } mb-3 w-full px-3 py-2 border rounded-md outline-none`}
              placeholder={`Enter ${field}`}
            />
            {submitted && errors[field] && (
              <div className="text-red-500 flex items-center gap-2">
                <RemindOutlineIcon />
                {errors[field]}
              </div>
            )}
          </div>
        ))}

        {/* Action buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 text-black rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Assign
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignRoleToEmp;
