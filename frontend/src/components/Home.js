import React, { useEffect, useState } from "react";
import { ButtonToolbar, Input, InputGroup, SelectPicker, VStack } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import "rsuite/dist/rsuite.min.css";
import { Dropdown } from "rsuite";
import Visitorprofile from "./Visitorprofile";
import Header from "../components/Header";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slice";
import { Select, Space } from "antd";
const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const Home = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [cookies, setCookies] = useCookies(["token"]);

  const [searchtext, setSearchtext] = useState(null);

  // Log the cookies to debug
  useEffect(() => {
    console.log("Cookies:", cookies.token); // Check if token is available here
  }, [cookies]);

  if (!cookies.token) {
    navigate("/signin");
  }

  useEffect(() => {
    const GetUser = async () => {
      const response = await axios.post("http://127.0.0.1:8090/api/getuser", {
        token: cookies.token,
      });

      const getuserData = response.data;

      if (getuserData.data.message === "Invalid token") {
        alert("invalid token");
      }

      dispatch(setUser(getuserData.data));

      console.log("userdata", getuserData);
    };

    GetUser();
  }, []);

  // Cookie check logic
  useEffect(() => {
    if (!cookies.token) {
      navigate("/signin"); // Redirect if token is not found
    }
  }, [cookies, navigate]);

  const options = [
    {
      value: "jack",
      label: "Jack",
    },
    {
      value: "lucy",
      label: "Lucy",
    },
    {
      value: "Yiminghe",
      label: "yiminghe",
    },
    {
      value: "disabled",
      label: "Disabled",
      disabled: true,
    },
  ];

  const handleQuerychange = async (value) => {
    const response = await axios.post(
      "http://127.0.0.1:8090/api/searchvisitorbyname",
      {
        query: value,
      }
    );

    const responseData = response.data;
    setSearchtext(responseData);
  };

  return (
    <div className=" pt-28">
      <Header />
      <div
        className="h-full w-full lg:px-28 md:px-2 sm:px-2 "
        style={{ height: "200vh" }}
      >
        {/* Header Section */}
        <div className=" ">
          <h1 className="font-bold text-2xl">Visitors</h1>
          <p className="text-gray-500">
            All the visitors that are currently on the premises
          </p>
        </div>

        {/* Main Section for Search and Dropdowns */}

        <div className="lg:flex lg:flex-row lg:items-center lg:justify-between w-full mt-5">
          {/* Search Input and Add Employee Button */}
          <div className="flex flex-col md:flex-row lg:flex-row  gap-2 w-full mt-16 lg:mt-10">
            {/* Search Input */}
            <div className="lg:w-4/6 md:w-4/6 sm:w-full px-2 ">
              <InputGroup style={{ width: "100%", height: 40 }}>
                <InputGroup.Addon className="bg-slate-100">
                  <SearchIcon />
                </InputGroup.Addon>
                <Input
                  className="bg-slate-100 w-full focus:outline-none"
                  placeholder="Search Visitors..."
                  // value={searchQuery} // Bind the input to searchQuery state
                  onChange={handleQuerychange} // Handle change
                />
              </InputGroup>
            </div>
            <div className=" flex lg:flex-row md:flex-row flex-col gap-2 md:w-2/6  lg:w-2/6  px-2">
              <div className=" w-full">
                <Select
                  defaultValue="lucy"
                  className="w-full h-10 "
                  onChange={handleChange}
                  variant="filled"
                  options={options}
                />
              </div>
              <div className=" w-full">
                <Select
                  defaultValue="lucy"
                  className="w-full h-10"
                  onChange={handleChange}
                  variant="filled"
                  options={options}
                />
              </div>
            </div>
          </div>
        </div>

        <Visitorprofile visitorssearchlist={searchtext} />
      </div>
    </div>
  );
};

export default Home;
