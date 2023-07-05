import React from "react";
import styles from "./Footer.module.css";

import FacebookIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.left} ${styles.mobile}`}>
        <h1 className={styles.logo}>The Craft Shop.</h1>
        <p className={styles.description}>
          Magna anim nulla fugiat ad. Laborum officia excepteur exercitation
          amet non aliquip officia consectetur et id anim nulla. Quis velit enim
          pariatur in minim incididunt amet laborum minim excepteur cupidatat ut
          ea exercitation. Culpa eiusmod do quis veniam nisi laboris sunt et
          commodo.
        </p>
      </div>
      <div className={styles.middle}>
        <h3 className={styles.title}>Useful Links</h3>
        <ul className={styles.list}>
          <li className={styles.listItem}>Home</li>
          <li className={styles.listItem}>Basket</li>
          <li className={styles.listItem}>My Account</li>
          <li className={styles.listItem}>Order Tracking</li>
          <li className={styles.listItem}>About</li>
          <li className={styles.listItem}>Terms</li>
        </ul>
      </div>
      <div className={`${styles.right} ${styles.mobile}`}>
        <h3 className={styles.title}>Contact </h3>
        <div className={styles.contactItem}>
          <EmailRoundedIcon style={{ margin: "10px" }} />
          contact@email.com
        </div>
        {/* <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" /> */}
        <div className={styles.socialContainer}>
          <div className={`${styles.socialIcon} ${styles.color1}`}>
            <FacebookIcon />
          </div>
          <div className={`${styles.socialIcon} ${styles.color2}`}>
            <InstagramIcon />
          </div>
          <div className={`${styles.socialIcon} ${styles.color3}`}>
            <TwitterIcon />
          </div>
          <div className={`${styles.socialIcon} ${styles.color4}`}>
            <PinterestIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
