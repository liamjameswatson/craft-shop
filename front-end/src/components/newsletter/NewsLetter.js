import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import styles from "./newsletter.module.css";

const NavBar = () => {
  const quantity = useSelector((state) => state.basket.quantity);
  console.log(quantity);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.searchContainer}>
            <input className={styles.input} type="text" placeholder="Search" />
            <SearchIcon style={{ color: "gray", fontSize: "16px" }} />
          </div>
        </div>
        <div className={styles.middle}>
          <h1 className={styles.logo}>The Craft Shop</h1>
        </div>
        <div className={styles.right}>
          <div className={styles.menuItem}>REGISTER</div>
          <div className={styles.menuItem}>SIGN IN</div>
          <Link to="/basket" className={styles.menuItem}>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingBasketOutlinedIcon />
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
