import React from "react";
import styles from "./categoryItem.module.css";

const CategoryItem = ({ item }) => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={item.image} alt="" />
      <div className={styles.info}>
        <h1 className={styles.title}>{item.title}</h1>
        <button className={styles.button}>SHOP NOW</button>
      </div>
    </div>
  );
};

export default CategoryItem;