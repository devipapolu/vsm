import { Button, Select } from "antd";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam"; // Import react-webcam

const AddVisitorPage = ({ handleClose }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const webcamRef = useRef(null);

  const [formdata, setFormdata] = useState({
    name: "",
    mobile: "",
    address: "",
    visitingpurpose: "",
    visitingperson: "",
    photo: "",
  });

  const handleTakePhoto = () => {
    setIsCameraActive(true);
  };

  // Function to capture the photo from the webcam
  const handleCapture = () => {
    if (webcamRef.current) {
      const imageData = webcamRef.current.getScreenshot(); // Capture image from webcam
      setPhoto(imageData); // Store the captured image in the state
      setFormdata((preve) => ({
        ...preve,
        photo: imageData,
      }));
    }
  };

  //selectlist
  const handlePersonChange = (value) => {
    setFormdata((preve) => ({
      ...preve,
      visitingperson: value,
    }));
  };
  const handlevisitingreason = (value) => {
    setFormdata((preve) => ({
      ...preve,
      visitingpurpose: value,
    }));
  };

  // Fetch employees from API
  const GetEmployees = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8090/api/employees");
      setEmployees(response.data); // Assuming response.data is an array of employees
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Run GetEmployees once on component mount
  useEffect(() => {
    GetEmployees();
  }, []); 

  // Map employees to options for the Select component
  const employeeOptions = employees.map((employee) => ({
    value: employee.name, // Assuming each employee has an 'id'
    label: employee.name, // Assuming each employee has a 'name'
  }));

  const purposevisitoptions = [
    {
      value: "Business",
      label: "Business",
    },
    {
      value: "Personal",
      label: "Personal",
    },
    // {
    //   value: "Interview",
    //   label: "Interview",
    // },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormdata((preve) => ({
      ...preve,
      [name]: value,
    }));
  };

  console.log("formdata", formdata);

  const handleAddvisitor = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "http://127.0.0.1:8090/api/addvisitor",
      formdata
    );

    const responseData = response.data;

    if (responseData.success) {
      alert("visitor added successfully");
      handleClose();
      setFormdata({
        name: "",
        mobile: "",
        address: "",
        visitingpurpose: "",
        visitingperson: "",
        photo: "",
      });
      window.location.reload();
    }

    if (responseData.error) {
      alert("all fields are required");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleAddvisitor}
        className="flex flex-col gap-4 lg:w-1/2 m-auto"
      >
        {/* Form Inputs */}
        <div>
          <label className="font-semibold">Fullname:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter Fullname"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="font-semibold">Mobile:</label>
          <input
            type="text"
            name="mobile"
            className="form-control"
            placeholder="Enter Mobile"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="font-semibold">Address:</label>
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder="Enter Address"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="font-semibold">Visiting:</label>
          <Select
            className="w-full h-10"
            showSearch
            listHeight={200}
            onChange={handlePersonChange}
            placeholder="Select visiting person"
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={employeeOptions}
          />
        </div>

        <div>
          <label className="font-semibold">Purpose of visit:</label>
          <Select
            className="w-full h-10"
            // showSearch
            listHeight={200}
            onChange={handlevisitingreason}
            placeholder="Select Purpose"
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={purposevisitoptions}
          />
        </div>

        {/* Take Photo Button */}
        <div className=" flex flex-col ">
          <label className="font-semibold">Photo:</label>

          {!isCameraActive ? (
            <button
              type="button"
              className=" btn btn-secondary w-1/3"
              onClick={handleTakePhoto}
            >
              Take Photo
            </button>
          ) : (
            <div>
              {/* Webcam */}
              <Webcam
                audio={false}
                screenshotFormat="image/jpeg"
                width="100%"
                videoConstraints={{
                  facingMode: "environment", // Front camera
                }}
                ref={webcamRef} // Attach ref to the webcam
              />

              {/* Capture Button */}
              <button
                type="button"
                className="btn btn-success mt-2"
                onClick={handleCapture}
              >
                Capture Photo
              </button>
            </div>
          )}
        </div>

        {/* Display Captured Photo */}
        {photo && (
          <div className="mt-4">
            <h3>Captured Photo:</h3>
            <img src={photo} alt="Captured" className="w-full" />
          </div>
        )}

        <div className=" w-full flex flex-row gap-4">
          <div className=" btn btn-light w-full" onClick={handleClose}>
            cancel
          </div>
          <button type="submit" className=" btn btn-primary w-full ">
            Add Visitor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVisitorPage;
