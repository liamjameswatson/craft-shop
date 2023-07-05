import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./product.module.css"; 
import Chart from "../../components/chart/Chart";
import { Publish } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { userRequest } from "../../requestMethod";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [productStats, setProductStats] = useState([]);

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get(
          "orders/income?productId=" + productId
        );
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.data.map((item) =>
          setProductStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);

  return (
    <div className={styles.product}>
      <div className={styles.productTitleContainer}>
        <h1 className={styles.productTitle}>Product</h1>
        <Link to="/newproduct">
          <button className={styles.productAddButton}>Create</button>
        </Link>
      </div>
      <div className={styles.productTop}>
        <div className={styles.productTopLeft}>
          <Chart
            data={productStats}
            dataKey="Sales"
            title="Sales Performance"
          />
        </div>
        <div className={styles.productTopRight}>
          <div className={styles.productInfoTop}>
            <img src={product.image} alt="" className={styles.productInfoImg} />
            <span className={styles.productName}>{product.name}</span>
          </div>
          <div className={styles.productInfoBottom}>
            <div className={styles.productInfoItem}>
              <span className={styles.productInfoKey}>id:</span>
              <span className={styles.productInfoValue}>{product._id}</span>
            </div>
            <div className={styles.productInfoItem}>
              <span className={styles.productInfoKey}>sales:</span>
              <span className={styles.productInfoValue}>5123</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.productBottom}>
        <form className={styles.productForm}>
          <div className={styles.productFormLeft}>
            <label>Product Name</label>
            <input type="text" placeholder={product.name} />
            <label>Product Description</label>
            <textarea type="text" placeholder={product.description} />
            <label>Price</label>
            <input placeholder={product.price} />

            <div className={styles.productFormRight}>
              <div className={styles.productUpload}>
                <img
                  src={product.image}
                  alt=""
                  className={styles.productUploadImg}
                />
                <label htmlFor="file">
                  <Publish />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className={styles.productButton}>Update</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
