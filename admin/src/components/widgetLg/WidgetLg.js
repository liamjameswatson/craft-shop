import React, { useState, useEffect } from "react";
import styles from "./widgetLg.module.css";
import { format } from 'timeago.js';

import { userRequest } from "../../requestMethod";

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders/?new=true");
        setOrders(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);

  const Button = ({ type }) => {
    return <button className={`${styles.widgetLgButton} ${styles[type]}`}>{type}</button>;
  };

  return (
    <div className={styles.widgetLg}>
      <h3 className={styles.widgetLgTitle}>Latest transactions</h3>
      <table className={styles.widgetLgTable}>
        <tr className={styles.widgetLgTr}>
          <th className={styles.widgetLgTh}>Customer</th>
          <th className={styles.widgetLgTh}>Date</th>
          <th className={styles.widgetLgTh}>Amount</th>
          <th className={styles.widgetLgTh}>Status</th>
        </tr>
        {orders.map((order) => (
          <tr className={styles.widgetLgTr} key={order._id}>
            <td className={styles.widgetLgUser}>
              <img
                src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt=""
                className={styles.widgetLgImg}
              />
              <span className={styles.widgetLgName}>{order.userId}</span>
            </td>
            <td className={styles.widgetLgDate}>{format(order.createdAt)}</td>
            <td className={styles.widgetLgAmount}>{order.amount}</td>
            <td className={styles.widgetLgStatus}>
              <Button type={order.status} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
