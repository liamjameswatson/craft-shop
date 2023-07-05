import { useEffect, useState } from "react";
import styles from "./widgetSm.module.css";
import { userRequest } from "../../requestMethod";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        // get all and newest 5 users
        const res = await userRequest.get("users/?new=true");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  return (
    <div className={styles.widgetSm}>
      <span className={styles.widgetSmTitle}>New Join Members</span>
      <ul className={styles.widgetSmList}>
        {users.map((user) => (
          <li className={styles.widgetSmListItem} key={user._id}>
            <img
              src={
                user.img ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt=""
              className={styles.widgetSmImg}
            />
            <div className={styles.widgetSmUser}>
              <span className={styles.widgetSmUsername}>{user.userName}</span>
              <span className={styles.widgetSmUserTitle}>{user.email}</span>
            </div>
            <button className={styles.widgetSmButton}>
              <VisibilityIcon className={styles.widgetSmIcon} />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
