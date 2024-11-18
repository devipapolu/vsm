import React, { useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";

const Addvisitorpage = () => {
  const navigate = useNavigate();

  // Get user state from Redux
  const user = useSelector((state) => state.user);

  // Get cookies from the cookies hook
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    // Check if the cookie exists and if the user is logged in
    if (!cookies.token) {
      navigate("/signin"); // Redirect to login page if no token or user is not authenticated
    }
  }, [cookies.token, user.name, navigate]); // Dependencies to rerun the effect when cookies or user state changes

  return (
    <div style={{ height: "200vh" }} className="pt-28">
      <Header />
      <p>Addvisitorpage dfghjkl;</p>
    </div>
  );
};

export default Addvisitorpage;
