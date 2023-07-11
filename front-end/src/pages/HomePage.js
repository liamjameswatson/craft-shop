import React from "react";
import NavBar from "../components/navbar/NavBar";
import Carousel from "../components/carousel/Carousel";
import Categories from "../components/categories/Categories";
import Products from "../components/products/Products";
import NewsLetter from "../components/newsletter/NewsLetter";
import Footer from "../components/footer/Footer";

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
