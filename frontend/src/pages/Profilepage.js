import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Profilepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state

  // Use effect to prevent body scroll when modal is open and to handle width adjustments
  useEffect(() => {
    if (isModalOpen) {
      // Add padding-right to prevent layout shift
      document.body.style.overflow = "hidden"; // Prevent body from scrolling
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`; // Add space for scrollbar
    } else {
      document.body.style.overflow = "auto"; // Restore scrolling
      document.body.style.paddingRight = "0px"; // Reset padding-right
    }

    // Clean up by restoring scroll and padding when modal is closed
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, [isModalOpen]);

  return (
    <div className="profile-page" style={{ marginTop: "80px" }}>
      <Header />
      <div
        className="profile-content"
        style={{ paddingTop: "100px", minHeight: "100vh" }}
      >
        {/* Your page content here */}
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

              <div className="flex flex-col justify-between md:w-1/6 gap-2 md:flex-row lg:flex-row lg:w-1/5 md:pr-1 ">
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
