import styles from "./featuredInfo.module.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { userRequest } from "../../requestMethod";
import { useState, useEffect } from "react";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [percent, setpercent] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/income");
        setIncome(res.data);
        setpercent((res.data[1].total * 100) / res.data[0].total - 100);
      } catch (err) {
        console.log(err);
      }
    };
    getIncome();
  }, []);

  console.log("income", income);
  console.log("income1111", income.total);
  console.log("percent", percent);
  return (
    <div className={styles.featured}>
      <div className={styles.featuredItem}>
        <span className={styles.featuredTitle}>Revnue</span>
        <div className={styles.featuredMoneyContainer}>
          {income.length > 0 && (
            <span className={styles.featuredMoney}>${income[1].total}</span>
          )}
          <span className={styles.featuredMoneyRate}>
            {Math.floor(percent)}%
            {percent < 0 ? (
              <ArrowDownwardIcon
                className={`${styles.featuredIcon} ${styles.negative}`}
              />
            ) : (
              <ArrowUpwardIcon className={styles.featuredIcon} />
            )}
          </span>
        </div>
        <span className={styles.featuredSub}>Compared to last month</span>
      </div>
      <div className={styles.featuredItem}>
        <span className={styles.featuredTitle}>Sales</span>
        <div className={styles.featuredMoneyContainer}>
          <span className={styles.featuredMoney}>$4,415</span>
          <span className={styles.featuredMoneyRate}>
            -1.4{" "}
            <ArrowDownwardIcon
              className={`${styles.featuredIcon} ${styles.negative}`}
            />
          </span>
        </div>
        <span className={styles.featuredSub}>Compared to last month</span>
      </div>
      <div className={styles.featuredItem}>
        <span className={styles.featuredTitle}>Cost</span>
        <div className={styles.featuredMoneyContainer}>
          <span className={styles.featuredMoney}>$2,225</span>
          <span className={styles.featuredMoneyRate}>
            +2.4 <ArrowUpwardIcon className={styles.featuredIcon} />
          </span>
        </div>
        <span className={styles.featuredSub}>Compared to last month</span>
      </div>
    </div>
  );
}
