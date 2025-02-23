import { Link } from "react-router-dom";
import styles from "./FriendCard.module.css";

export const FriendCard = ({ username, picturePath, id }) => {
  return (
    <div className={styles.container} id={id}>
      <img src={picturePath} className={styles.image} alt="Friend Image" />
      <h3 className={styles.title}>{username}</h3>
      <Link to='/chats'>
        <span className={styles.link}>Написать</span>
      </Link>
      <button className={styles.delete}>Удалить</button>
    </div>
  );
};
