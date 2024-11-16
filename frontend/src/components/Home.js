import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";

const Home = () => {
  const user = useSelector((state) => state.user);

  console.log("redux", user);

  return (
    <div>
      <Header />
      Home
    </div>
  );
};

export default Home;
