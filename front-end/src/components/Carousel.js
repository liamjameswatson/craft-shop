import React, { useState } from "react";
import { carouselSlides } from "../data";
import styles from "./Carousel.module.css";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";

const Carousel = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    const lastIndex = carouselSlides.length - 1;
    if (direction === "left") {
      setSlideIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : lastIndex));
    } else {
      setSlideIndex((prevIndex) => (prevIndex < lastIndex ? prevIndex + 1 : 0));
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.arrow} ${styles.left}`} onClick={() => handleClick("left")}>
        <ArrowLeftRoundedIcon />
      </div>
      <div className={styles.wrapper} style={{ transform: `translateX(${slideIndex * -100}vw)` }}>
        {carouselSlides.map((item) => (
          <div className={styles.slide}>
            <div className={styles.imageContainer}>
              <img className={styles.image} src={item.image} alt="" />
            </div>
            <div className={styles.infoContainer}>
              <h1 className={styles.title}>{item.title}</h1>
              <p className={styles.description}>{item.description}</p>
              <button className={styles.button}>{item.buttonText}</button>
            </div>
          </div>
        ))}
      </div>
      <div className={`${styles.arrow} ${styles.right}`} onClick={() => handleClick("right")}>
        <ArrowRightRoundedIcon />
      </div>
    </div>
  );
};

export default Carousel;
