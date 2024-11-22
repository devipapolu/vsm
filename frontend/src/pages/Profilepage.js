import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import { useCookies } from "react-cookie";
import { Link, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slice";
import { BsList } from "react-icons/bs";
import { Drawer } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import AddVisitorPage from "./Addvisitorpage";
import logo from "./../images/new logo blue.png";
import { Modal } from "rsuite";

const Profilepage = () => {
  const [openmodal, setOpenmodal] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const profileRef = useRef(null); // Ref for profile icon and dropdown
  const dropdownRef = useRef(null); // Ref for the dropdown menu

  const showDrawer = () => setOpen(true);
  const onCloseDrawer = () => setOpen(false);

  const [cookies, setCookies, removieCookie] = useCookies();

  const handleOpen = () => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth; // Get scrollbar width
    document.body.style.overflow = "hidden"; // Prevent body scrolling when modal is open
    document.body.style.paddingRight = `${scrollbarWidth}px`; // Add padding to prevent layout shift
    setOpenmodal(true);
  };

  const handleClose = () => {
    document.body.style.overflow = ""; // Reset body overflow to allow scrolling again
    document.body.style.paddingRight = ""; // Reset padding
    setOpenmodal(false);
  };

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    removieCookie("token");
    dispatch(
      setUser({
        _id: "",
        name: "",
        email: "",
        token: "",
      })
    );
  };

  // Close profile dropdown when on the profile page
  useEffect(() => {
    if (location.pathname === "/profile") {
      setIsOpen(false); // Close the dropdown when on the profile page
    }
  }, [location.pathname]);

  // Close dropdown when clicking outside the profile or dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false); // Close the dropdown if clicked outside
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="profile-page"
      style={{ marginTop: "80px", height: "150vh" }}
    >
      <div className="bg-neutral-300 fixed-top" style={{ zIndex: 1000 }}>
        <div
          className="lg:px-16 sm:px-6 px-5 pt-3 pb-1 mb-4"
          style={{ position: "relative" }}
        >
          <header className="flex justify-between items-center">
            {/* Logo Section */}
            <div>
              <Link to="/">
                <img
                  src={logo}
                  alt="Company Logo"
                  width="200px"
                  height="200px"
                />
              </Link>
            </div>

            {/* Navigation & Profile */}
            <div className="flex justify-between items-center gap-4 sm:gap-6 lg:gap-10">
              {/* Navigation Links for Large Screens */}
              <div className="hidden lg:flex gap-10">
                <Link
                  to="/"
                  className={location.pathname === "/" ? "active-link" : ""}
                  style={{ textDecoration: "none" }}
                >
                  Dashboard
                </Link>
                <Link
                  to="/employees"
                  className={
                    location.pathname === "/employees" ? "active-link" : ""
                  }
                  style={{ textDecoration: "none" }}
                >
                  Employees
                </Link>
                <div className="cursor-pointer" onClick={handleOpen}>
                  Add visitor
                </div>
              </div>

              {/* Profile Section */}
              <div className="cursor-pointer" ref={profileRef}>
                {/* Profile Icon */}
                <CgProfile size={30} onClick={handleToggle} />

                {/* Dropdown Menu */}
                {isOpen && (
                  <div
                    className="absolute bg-slate-200 py-1 gap-5 rounded-md px-3 top-16 end-5 shadow-lg transition-all duration-200 ease-in-out"
                    ref={dropdownRef}
                  >
                    <div
                      className="cursor-pointer hover:bg-slate-300 px-2 py-1 rounded-md"
                      onClick={() => {
                        setIsOpen(false); // Close the dropdown when "Profile" is clicked
                      }}
                    >
                      <Link to="/profile">Profile</Link>
                    </div>
                    <div
                      className="cursor-pointer hover:bg-slate-300 px-2 py-1 rounded-md"
                      onClick={handleLogout}
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer for Mobile Navigation */}
              <div className="lg:hidden">
                <BsList size={35} onClick={showDrawer} />
                <Drawer
                  title={
                    <div className="flex justify-between items-center w-full">
                      <span>Navigation</span>
                      <CloseOutlined
                        onClick={onCloseDrawer}
                        style={{ fontSize: "18px", cursor: "pointer" }}
                      />
                    </div>
                  }
                  placement="right"
                  closable={false}
                  onClose={onCloseDrawer}
                  open={open}
                  width={300}
                >
                  <div className="flex flex-col gap-4">
                    <Link
                      to="/"
                      className={location.pathname === "/" ? "active-link" : ""}
                      style={{ textDecoration: "none" }}
                      onClick={onCloseDrawer}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/employees"
                      className={
                        location.pathname === "/employees" ? "active-link" : ""
                      }
                      style={{ textDecoration: "none" }}
                      onClick={onCloseDrawer}
                    >
                      Employees
                    </Link>
                    <div className="cursor-pointer" onClick={handleOpen}>
                      Add Visitor
                    </div>
                  </div>
                </Drawer>
              </div>
            </div>
          </header>

          {/* Add Modal For Add Visitor */}
          <Modal
            size="lg"
            open={openmodal}
            onClose={handleClose}
            style={{
              zIndex: 2000, // Ensure it's on top of other elements
              marginTop: "20px", // Optional, add space between modal and the header
            }}
            className="lg:px-28 md:px-20"
          >
            <Modal.Header>
              <Modal.Title>Add a New Visitor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddVisitorPage handleClose={handleClose} />
            </Modal.Body>
          </Modal>

          {/* CSS for Active Link Styling */}
          <style>
            {`
              .active-link {
                color: #1890ff;
                border-bottom: 2px solid #1890ff;
              }
              .active-link:hover {
                color: #40a9ff;
              }
            `}
          </style>
        </div>
      </div>

      <div
        className="profile-content"
        style={{ paddingTop: "100px", minHeight: "100vh" }}
      >
        {/* Page content */}
        <div className="px-28">
          <div className="px-2">
            <h1 className="font-bold text-2xl">Visitors</h1>
            <p className="text-gray-500">
              All the visitors that are currently on the premises
            </p>
          </div>

          {/* Search Input */}
          <div className="lg:flex lg:flex-row lg:items-center px-2 lg:justify-between w-full mt-5">
            <div className="flex flex-col md:flex-row lg:flex-row w-full mt-16 lg:mt-1 gap-2">
              <div className="lg:w-4/5 md:w-4/6 sm:w-full">
                <div className="input-group" style={{ height: 40 }}>
                  <input
                    className="bg-slate-100 w-full focus:outline-none"
                    placeholder="Search Visitors..."
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between md:w-1/6 gap-2 md:flex-row lg:flex-row lg:w-1/5 md:pr-1">
                <div className="w-full">
                  <select placeholder="Purpose" className="h-10 w-full">
                    {/* Options here */}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
