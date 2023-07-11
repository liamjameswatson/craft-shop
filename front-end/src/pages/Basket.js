import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../requestMethod";
import styles from "./basket.module.css";

const KEY =
  "pk_test_51NMb37E0M3VJHghm18HiuWzNJdpG7ey2TTIcW1WDQWChgaHoX0kBoiFkeWSNsXt2GRVRVS1qiHL9j01vwdmWXZQA00ZdC6H5Wc";

const Basket = () => {
  const basket = useSelector((state) => state.basket);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: basket.total * 100,
        });
        navigate.push("/success", { data: res.data });
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && basket.total >= 1 && makeRequest();
  }, [stripeToken, basket.total, navigate]);

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Your Basket</h1>
        <div className={styles.top}>
          <button className={styles.topButton}>Continue Shopping</button>
          <div className={styles.topTexts}>
            <span className={styles.topText}>Basket(2)</span>
            <span className={styles.topText}>Your Wishlist(0)</span>
          </div>
          <button className={`${styles.topButton} ${styles.filled}`}>
            Checkout Now
          </button>
        </div>
        <div className={styles.bottom}>
          <div className={styles.info}>
            {basket.products.map((product) => (
              <React.Fragment key={product._id}>
                <div className={styles.product}>
                  <div className={styles.productDetail}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className={styles.image}
                    />
                    <div className={styles.details}>
                      <span className={styles.productName}>
                        <strong>Product:</strong> {product.title}
                      </span>
                      <span className={styles.productId}>
                        <strong>ID:</strong> {product._id}
                      </span>
                      <span className={styles.productColor}></span>
                      <span className={styles.productSize}>
                        <strong>Size:</strong> {product.size}
                      </span>
                    </div>
                  </div>
                  <div className={styles.priceDetail}>
                    <div className={styles.productQuantityContainer}>
                      <AddIcon />
                      <span className={styles.productQuantity}>
                        {product.quantity}
                      </span>
                      <RemoveIcon />
                    </div>
                    <span className={styles.productPrice}>
                      {product.price * product.quantity}
                    </span>
                  </div>
                </div>
                <hr className={styles.hr} />
              </React.Fragment>
            ))}
            <hr className={styles.hr} />
          </div>
          <div className={styles.summary}>
            <h1 className={styles.summaryTitle}>Order Summary</h1>
            <div className={styles.summaryItem}>
              <span className={styles.summaryItemText}>Subtotal</span>
              <span className={styles.summaryItemPrice}>£ {basket.total}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryItemText}>Estimate Shipping</span>
              <span className={styles.summaryItemPrice}>£5.90</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryItemText}>Shipping Discount</span>
              <span className={styles.summaryItemPrice}>£-5.90</span>
            </div>
            <div className={styles.summaryItem} type="total">
              <span className={styles.summaryItemText}>Total</span>
             <span className={styles.summaryItemPrice}>{basket.total}</span>
            </div>
            <StripeCheckout
              name="Craft Shop"
              image="https://i.etsystatic.com/18891458/r/il/7f4f8d/3146030942/il_794xN.3146030942_5t2r.jpg"
              billingAddress
              shippingAddress
              description={`Your total is £${basket.total * 100}`}
              token={onToken}
              stripeKey={KEY}
            >
              <button className={styles.button}>Checkout Now</button>
            </StripeCheckout>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Basket;
