import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Product from "../product/Product";
import styles from "./products.module.css";

const Products = ({ category, filter, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category
            ? `http://localhost:8000/api/products?category=${category}`
            : "http://localhost:8000/api/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    const applyFilter = () => {
      if (category) {
        setFilteredProducts(
          products.filter((item) =>
            Object.entries(filter).every(
              ([key, value]) => item[key] && item[key].includes(value)
            )
          )
        );
      } else {
        setFilteredProducts([]);
      }
    };

    applyFilter();
  }, [products, category, filter]);

  useEffect(() => {
    if (sort === "latest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === "desc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <div className={styles.container}>
      {category
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item._id} />)}
    </div>
  );
};

export default Products;
