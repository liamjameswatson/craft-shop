import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { mobile } from "../responsive";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { publicRequest } from "../requestMethod";
import { addProduct } from "../redux/basketRedux";

import styles from "./ProductPage.module.css";

const ProductPage = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleQuantity = (type) => {
    type === "decrease"
      ? quantity > 1 && setQuantity((prevQuantity) => prevQuantity - 1)
      : setQuantity((prevQuantity) => prevQuantity + 1);
    // quantity > stockQuantity : setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleAddToBasket = () => {
    //update basket
    dispatch(addProduct({ ...product, quantity }));
    // dispatch(addProduct({ ...product, quantity, color, size}));
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [productId]);

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          <img src={product.image} className={styles.image} alt="Product" />
        </div>
        <div className={styles.infoContainer}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.description}>{product.description}</p>
          <span className={styles.price}>{product.price}</span>

          <div className={styles.filterContainer}>
            <div className={styles.filter}>
              <span className={styles.filterTitle}>Colour</span>
              <div className={styles.filterColor} style={{ backgroundColor: "black" }}></div>
              <div className={styles.filterColor} style={{ backgroundColor: "darkblue" }}></div>
              <div className={styles.filterColor} style={{ backgroundColor: "grey" }}></div>
              <div className={styles.filterColor} style={{ backgroundColor: "white" }}></div>
            </div>
            <div className={styles.filter}>
              <span className={styles.filterTitle}>Size</span>
              <select className={styles.filterSize}>
                <option>25x25</option>
                <option>50x50</option>
                <option>75x75</option>
                <option>100x100</option>
                <option>150x150</option>
              </select>
            </div>
          </div>
          <div className={styles.purchaseContainer}>
            <div className={styles.quantityContainer}>
              <RemoveIcon className={styles.removeIcon} onClick={() => handleQuantity("decrease")} />
              <span className={styles.quantity}>{quantity}</span>
              <AddIcon className={styles.addIcon} onClick={() => handleQuantity("increase")} />
            </div>
            <button className={styles.button} onClick={handleAddToBasket}>Add to basket</button>
          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
