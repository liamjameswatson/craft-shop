import React from "react";
import NavBar from "../components/NavBar";
import Carousel from "../components/Carousel";
import Categories from "../components/Categories";
import Products from "../components/Products";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <Carousel />
      <Categories />
      <Products />
      <NewsLetter />
      <Footer/>
    </div>
  );
};

export default HomePage;
