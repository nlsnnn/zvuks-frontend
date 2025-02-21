import { Link } from "react-router-dom";
import styles from "./FriendCard.module.css";

export const FriendCard = ({ username, picturePath }) => {
  return (
    <div className={styles.container}>
      <img src={picturePath} className={styles.image} alt="Friend" />
      <h3 className={styles.title}>{username}</h3>
      <Link to='/chats'>
        <span className={styles.link}>Написать</span>
      </Link>
      <button className={styles.button}>Удалить</button>
    </div>
  );
};
