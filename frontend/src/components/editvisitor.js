import { Button, Select } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Editvisitor = ({ handleClose, editid, getvisitors, getload }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false); // Add a loading state
  const [formData, setFormdata] = useState({
    name: "",
    mobile: "",
    address: "",
    visitingpurpose: "",
    visitingperson: "",
    photo: "",
  });

  // Options for the purpose of visit
  const purposeVisitOptions = [
    { value: "Business", label: "Business" },
    { value: "Personal", label: "Personal" },
  ];

  // Employee options for the "Visiting Person" dropdown
  const employeeOptions = employees.map((employee) => ({
    value: employee.name,
    label: employee.name,
  }));

  // Fetch visitor data by ID when the component mounts or editid changes
  const Getvisitorbyid = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8090/api/getvisitorbyid/${editid}`
      );

      const data = Array.isArray(response.data)
        ? response.data[0]
        : response.data;

      setFormdata({
        name: data.name || "",
        mobile: data.mobile || "",
        address: data.address || "",
        visitingpurpose: data.visitingpurpose || "",
        visitingperson: data.visitingperson || "",
        photo: data.photo || "",
      });
    } catch (error) {
      console.error("Error fetching visitor data:", error);
    }
  };

  // Fetch employees data for the select dropdown
  const GetEmployees = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await axios.get("http://127.0.0.1:8090/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle select changes for visiting person and purpose
  const handleSelectChange = (name, value) => {
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("formsubmit", formData);
    try {
      const response = await axios.put(
        `http://127.0.0.1:8090/api/updatevisitor/${editid}`,
        formData
      );

      const responseData = response.data;

      if (responseData.message === "No changes were made.") {
        alert(" no changes made");
      }

      if (responseData.message === "Visitor updated successfully.") {
        alert("updated sucessfully");
        getvisitors();
        getload();
      }

      handleClose();
    } catch (error) {
      console.error("Error updating visitor:", error);
    }
  };

  // Fetch data on mount or when editid changes
  useEffect(() => {
    if (editid) {
      Getvisitorbyid();
    }
    GetEmployees();
  }, [editid]);

  return (
    <div>
      <form
        className="flex flex-col gap-3 lg:w-1/2 m-auto"
        onSubmit={handleSubmit}
      >
        {/* Fullname Input */}
        <div>
          <label className="font-semibold">Fullname:</label>
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 border rounded-md outline-none"
            placeholder="Enter Fullname"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        {/* Mobile Input */}
        <div>
          <label className="font-semibold">Mobile:</label>
          <input
            type="text"
            name="mobile"
            className="w-full px-3 py-2 border rounded-md outline-none"
            placeholder="Enter Mobile"
            value={formData.mobile}
            onChange={handleInputChange}
          />
        </div>

        {/* Address Input */}
        <div>
          <label className="font-semibold">Address:</label>
          <input
            type="text"
            name="address"
            className="w-full px-3 py-2 border rounded-md outline-none"
            placeholder="Enter Address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        {/* Visiting Person Select */}
        <div>
          <label className="font-semibold">Visiting Person:</label>
          <Select
            className="w-full h-10 border rounded-md"
            value={formData.visitingperson}
            onChange={(value) => handleSelectChange("visitingperson", value)}
            showSearch
            listHeight={200}
            placeholder="Select visiting person"
            options={employeeOptions}
            loading={loading} // Pass the loading state to show the loading spinner
          />
        </div>

        {/* Purpose of Visit Select */}
        <div>
          <label className="font-semibold">Purpose of visit:</label>
          <Select
            className="w-full h-10 rounded-md"
            value={formData.visitingpurpose}
            onChange={(value) => handleSelectChange("visitingpurpose", value)}
            listHeight={200}
            placeholder="Select Purpose"
            options={purposeVisitOptions}
          />
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-row gap-4">
          <div className="btn btn-light w-full" onClick={handleClose}>
            Cancel
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Update Visitor
          </button>
        </div>
      </form>
    </div>
  );
};

export default Editvisitor;
