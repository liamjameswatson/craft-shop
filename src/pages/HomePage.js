import React from "react";
import NavBar from "../components/NavBar";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <Carousel />
      <Categories />
      {/* HomePage <h1>The Craft shop</h1> */}
    </div>
  );
};

export default HomePage;
