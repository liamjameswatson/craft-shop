import React from "react";
import NavBar from "../components/NavBar";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";
import Products from "../components/Products";
import NewsLetter from "../components/NewsLetter";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <Carousel />
      <Categories />
      <Products />
      <NewsLetter />
    </div>
  );
};

export default HomePage;
