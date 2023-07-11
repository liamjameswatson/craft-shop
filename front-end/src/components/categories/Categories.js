import React from "react";
import { categories } from "../../data";
import styles from "./categories.module.css";
import CategoryItem from "../categoryItem/CategoryItem";

const Categories = () => {
  return (
    <div className={styles.container}>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Categories;
