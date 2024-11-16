import React, { useState } from "react";
import logo from "./../images/new logo blue.png";
import { BsPersonCircle, BsList } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { Drawer } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { CgProfile } from "react-icons/cg";
import { Modal } from "antd"; // Import Modal from Ant Design
import Profilepage from "../pages/Profilepage";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false); // Modal visibility state
  const location = useLocation(); // Get the current route location

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const handleProfileClick = (popupState) => {
    setIsProfileModalVisible(true); // Show modal when profile is clicked
    popupState.close(); // Close the PopupState menu
  };

  const handleModalClose = () => {
    setIsProfileModalVisible(false); // Close modal
  };

  return (
    <div>
      <div className="lg:px-16 sm:px-6 px-5 pt-3 mb-4">
        <header className="flex justify-between items-center">
          {/* Logo Section */}
          <div>
            <Link to={"/"}>
              <img src={logo} alt="Company Logo" width="200px" height="200px" />
            </Link>
          </div>

          {/* Navigation & Profile */}
          <div className="flex justify-between items-center gap-4 sm:gap-6 lg:gap-10">
            {/* Navigation Links for Large Screens */}
            <div className="hidden lg:flex gap-10">
              {["/", "/employees", "/addvisitor"].map((path, index) => (
                <Link
                  key={index}
                  to={path}
                  className={location.pathname === path ? "active-link" : ""}
                >
                  {path === "/" ? "Dashboard" : path.replace("/", "")}
                </Link>
              ))}
            </div>

            {/* Profile Menu */}
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <div
                    style={{ cursor: "pointer" }}
                    {...bindTrigger(popupState)}
                  >
                    <CgProfile style={{ cursor: "pointer" }} size={30} />
                  </div>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={() => handleProfileClick(popupState)}>
                      Profile
                    </MenuItem>

                    <MenuItem onClick={popupState.close}>Logout</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>

            {/* Drawer for Mobile Navigation */}
            <div className="lg:hidden">
              <BsList size={35} onClick={showDrawer} />
              <Drawer
                title={
                  <div className="flex justify-between items-center w-full">
                    <span>Navigation</span>
                    <CloseOutlined
                      onClick={onClose}
                      style={{ fontSize: "18px", cursor: "pointer" }}
                    />
                  </div>
                }
                placement="right"
                closable={false}
                onClose={onClose}
                open={open}
                width={300}
              >
                <div className="flex flex-col gap-4">
                  {["/", "/employees", "/addvisitor"].map((path, index) => (
                    <Link
                      key={index}
                      to={path}
                      onClick={onClose}
                      className={
                        location.pathname === path ? "active-link" : ""
                      }
                    >
                      {path === "/" ? "Dashboard" : path.replace("/", "")}
                    </Link>
                  ))}
                </div>
              </Drawer>
            </div>
          </div>
        </header>

        {/* Profile Modal */}
        <Modal
          title="Profile"
          visible={isProfileModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="back" onClick={handleModalClose}>
              Close
            </Button>,
          ]}
        >
          <Profilepage />
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
  );
};

export default Header;
