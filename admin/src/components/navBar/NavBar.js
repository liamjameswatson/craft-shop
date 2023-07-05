import React from "react";
import styles from "./navbar.module.css";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";

export default function Navbar() {
  return (
    <div className={styles.Navbar}>
      <div className={styles.NavbarWrapper}>
        <div className={styles.topLeft}>
          <span className={styles.logo}>lamaadmin</span>
        </div>
        <div className={styles.topRight}>
          <div className={styles.NavbarIconContainer}>
            <NotificationsNone />
            <span className={styles.topIconBadge}>2</span>
          </div>
          <div className={styles.NavbarIconContainer}>
            <Language />
            <span className={styles.topIconBadge}>2</span>
          </div>
          <div className={styles.NavbarIconContainer}>
            <Settings />
          </div>
          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className={styles.topAvatar}
          />
        </div>
      </div>
    </div>
  );
}
