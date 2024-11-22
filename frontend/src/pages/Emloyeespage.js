import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchIcon from "@rsuite/icons/Search";
import { InputGroup, Input, Modal, Button, ButtonToolbar } from "rsuite";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";

const Emloyeespage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [cookies] = useCookies(["token"]);
  const navigatedetailspage = useNavigate();

  // Redirect to signin if token is missing or user is not logged in
  useEffect(() => {
    if (!cookies.token || !user.name) {
      navigate("/signin");
    }
  }, [cookies.token, user.name, navigate]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    empid: "",
    profile: "",
    position: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all employees from the backend
  const GetEmployees = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8090/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Handle search query change
  const handleQuerychange = async (value) => {
    setSearchQuery(value);

    if (value === "") {
      // If the search query is empty, fetch all employees
      GetEmployees();
    } else {
      // If there is a search query, fetch filtered employees based on query
      const response = await axios.post(
        "http://127.0.0.1:8090/api/searchemployee",
        {
          query: value,
        }
      );

      console.log("employee", response.data);

      setEmployees(response.data); // Update employees with search results
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Dynamically update the corresponding field in the state
    }));
  };

  function opendetails(value) {
    navigatedetailspage(`/employedetails/?query=${value}`);
  }
  // Handle file input change (profile picture)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          profile: reader.result, // Store base64 string
        }));
      };
      reader.readAsDataURL(file); // Read the file as base64
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8090/api/regemployee",
        formData
      );
      const responseData = response.data;

      if (responseData.message === "employee already exists") {
        alert("Employee already exists.");
      }

      if (responseData.success) {
        alert("Employee created successfully!");
        GetEmployees(); // Refresh employee list
        setFormData({
          name: "",
          email: "",
          mobile: "",
          empid: "",
          profile: "",
          position: "",
        });
        handleClose(); // Close modal after submission
      }
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  useEffect(() => {
    GetEmployees(); // Fetch all employees when component mounts
  }, []);

  return (
    <div style={{}} className="">
      <Header />
      <div className="lg:px-28 md:px-2 sm:px-2 w-full">
        <div className="font-bold font-sans text-2xl mt-3 w-full">
          Employees
        </div>

        <div className="lg:flex lg:flex-row lg:items-center lg:justify-between w-full mt-5">
          {/* Search Input and Add Employee Button */}
          <div className="flex flex-col md:flex-row lg:flex-row w-full mt-16 lg:mt-10">
            {/* Search Input */}
            <div className="lg:w-5/6 md:w-4/5 sm:w-full pr-4">
              <InputGroup style={{ width: "100%", height: 40 }}>
                <InputGroup.Addon className="bg-slate-100">
                  <SearchIcon />
                </InputGroup.Addon>
                <Input
                  className="bg-slate-100 w-full focus:outline-none"
                  placeholder="Search Employees..."
                  value={searchQuery} // Bind the input to searchQuery state
                  onChange={handleQuerychange} // Handle change
                />
              </InputGroup>
            </div>

            {/* Add Employee Button (unchanged code) */}
            <div className="  lg:w-1/6 md:w-1/5 sm:w-full flex justify-end lg:mt-0 lg:block sm:hidden md:block hidden ">
              <button
                onClick={handleOpen}
                className="bg-blue-500 text-white py-2 px-4 w-full rounded-md hover:bg-blue-600"
                style={{ marginTop: 0, height: 38 }}
              >
                Add Employee
              </button>
            </div>
            <div className="lg:w-1/6 md:w-1/5 sm:w-full flex justify-start lg:mt-0 lg:hidden md:hidden sm:block ">
              <ButtonToolbar
                onClick={handleOpen}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                style={{ marginTop: 10, height: 38 }}
              >
                Add Employee
              </ButtonToolbar>
            </div>
          </div>
        </div>

        {/* Add Employee Modal */}
        <Modal open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>
              <div className="font-bold">Add a New Employee</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              {/* Employee fields */}
              <input
                type="number"
                name="empid"
                value={formData.empid}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Employee ID"
                required
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Name"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Email"
                required
              />
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Mobile"
                required
              />
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Position"
                required
              />
              <input
                type="file"
                name="profile"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose} appearance="subtle">
              Cancel
            </Button>
            <Button type="submit" onClick={handleSubmit} appearance="primary">
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Employee List */}

        <div className=" pb-10  mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {employees?.length > 0 ? (
            employees.map((employee) => (
              <div
                key={employee._id}
                onClick={() => opendetails(employee._id)}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Profile Image Section */}
                <div className="relative h-48 border-b-4 border-gray-100 p-2">
                  <img
                    alt="profile"
                    src={employee.profile}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>

                {/* Employee Info Section */}
                <div className="px-4 py-3 text-start space-y-2">
                  <h3 className="text-2xl font-semibold text-gray-800 truncate">
                    {employee.name}
                  </h3>
                  <p className="text-sm text-gray-600">{employee.email}</p>
                  <p className="text-sm text-gray-600">{employee.mobile}</p>
                  <p className="text-sm text-gray-600 font-medium text-gray-700">
                    {employee.empid}
                  </p>
                </div>

                {/* Hovered Border */}
                <div className="p-3 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-100 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button className="text-white bg-indigo-600 py-1 px-3 rounded-md text-sm font-semibold transform hover:scale-105 transition duration-200">
                    View Profile
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full text-center text-lg text-gray-500 p-6">
              No employees found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Emloyeespage;
