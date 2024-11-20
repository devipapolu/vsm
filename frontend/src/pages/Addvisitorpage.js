import React, { useState, useRef, useEffect } from "react";
import { Button, SelectPicker, VStack } from "rsuite";
import axios from "axios";
import Webcam from "react-webcam";

const AddVisitorPage = ({ handleClose }) => {
  const [data, setData] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [photo, setPhoto] = useState(null);
  const webcamRef = useRef(null);

  const [formdata, setFormdata] = useState({
    name: "",
    mobile: "",
    address: "",
    visitingperson: "",
    visitingpurpose: "",
    photo: "",
  });

  const GetEmployees = async () => {
    await axios.get("http://127.0.0.1:8090/api/employees").then((response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    GetEmployees();
  }, []);

  const purposeofvisit = ["Business", "Personal", "Interview"].map((item) => ({
    label: item,
    value: item,
  }));

  const person = data?.map((item) => ({ label: item.name, value: item.name }));

  // Handle the "Take Photo" button click
  const startCamera = () => {
    setIsCameraActive(true); // Activate the camera
  };

  // Capture the photo
  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot(); // Capture the screenshot
    setPhoto(imageSrc); // Store the photo
    setFormdata((preve) => ({
      ...preve,
      photo: imageSrc,
    }));
  };

  // Handle select changes (for the form fields)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormdata((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://127.0.0.1:8090/api/addvisitor",
      formdata
    );

    const responseData = response.data;

    if (responseData.success) {
      handleClose();
      alert("visitor added successfully");
    }

    console.log("form", formdata);
  };

  const handleVisitingperson = (value) => {
    setFormdata((preve) => ({
      ...preve,
      visitingperson: value,
    }));
  };

  const handlepurposeofvisit = (value) => {
    setFormdata((preve) => ({
      ...preve,
      visitingpurpose: value,
    }));
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="md:w-2/3 lg:w-1/2 w-full">
        <dl>
          {/* Fullname field */}
          <dt className="font-semibold" style={{ fontSize: 13 }}>
            Fullname:
          </dt>
          <dd>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              className="lg:w-full w-full px-2 py-2 border rounded-md outline-none"
              placeholder="Fullname"
              required
            />
          </dd>

          {/* Mobile field */}
          <dt className="font-semibold mt-4" style={{ fontSize: 13 }}>
            Mobile:
          </dt>
          <dd>
            <input
              onChange={handleChange}
              type="text"
              name="mobile"
              className="lg:w-full w-full px-2 py-2 border rounded-md outline-none"
              placeholder="Mobile"
              required
            />
          </dd>

          {/* Address field */}
          <dt className="font-semibold mt-4" style={{ fontSize: 13 }}>
            Address:
          </dt>
          <dd>
            <input
              onChange={handleChange}
              type="text"
              name="address"
              className="lg:w-full w-full px-2 py-2 border rounded-md outline-none"
              placeholder="Address"
              required
            />
          </dd>

          {/* Visiting person dropdown */}
          <dt className="font-semibold mt-4" style={{ fontSize: 13 }}>
            Visiting:
          </dt>
          <dd>
            <VStack>
              <SelectPicker
                menuMaxHeight={180}
                data={person}
                className="w-full"
                onChange={handleVisitingperson}
                placeholder="Select visiting person"
                required
              />
            </VStack>
          </dd>

          {/* Purpose of visit dropdown */}
          <dt className="font-semibold mt-4" style={{ fontSize: 13 }}>
            Purpose of visit:
          </dt>
          <dd>
            <VStack>
              <SelectPicker
                searchable={false}
                data={purposeofvisit}
                className="w-full outline-none"
                placeholder="Select purpose"
                onChange={handlepurposeofvisit}
              />
            </VStack>
          </dd>

          {/* Photo Section */}
          <dt className="font-semibold mt-4" style={{ fontSize: 13 }}>
            Photo:
          </dt>
          <dd>
            {!isCameraActive ? (
              <button
                type="button"
                onClick={startCamera}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Take Photo
              </button>
            ) : (
              <div className="camera-container">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width="100%"
                  videoConstraints={{
                    facingMode: "user", // Use the front-facing camera
                  }}
                />
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Capture Photo
                </button>
              </div>
            )}
          </dd>

          {/* Display the captured photo */}
          {photo && (
            <div className="mt-4">
              <h3>Captured Photo:</h3>
              <img
                src={photo}
                alt="Captured"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </div>
          )}
        </dl>
        <div className=" d-flex w-full gap-3  text-center">
          <Button onClick={handleClose} className="w-full" appearance="dark">
            Cancel
          </Button>
          <Button type="submit" className="w-full" appearance="primary">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddVisitorPage;
