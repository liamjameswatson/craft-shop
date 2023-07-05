import React from "react";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";
import styles from "./Product.module.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

const Product = ({ item }) => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={item.image} alt={item.title} />
      <h1 className={styles.title}>{item.title}</h1>
      <div className={styles.info}>
        <div className={styles.icon}>
          <ShoppingBasketOutlinedIcon />
        </div>
        <div className={styles.icon}>
          <Link to={`/product/${item._id}`}>
            <SearchIcon />
          </Link>
        </div>
        <div className={styles.icon}>
          <FavoriteRoundedIcon />
        </div>
      </div>
    </div>
  );
};

export default Product;
