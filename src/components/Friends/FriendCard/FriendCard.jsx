import { Link } from "react-router-dom";
import styles from "./FriendCard.module.css";
import { useState } from "react";

export const FriendCard = ({ type, username, picturePath, id }) => {
  const [topBtn, setTopBtn] = useState(null)
  const [downBtn, setDownBtn] = useState(null)

  if (type == 'my') {
    setTopBtn('Написать')
    setDownBtn('Удалить')
  } else if (type == 'pending') {
    setTopBtn('Отменить')
  } else {
    setTopBtn('Принять')
    setDownBtn('Отклонить')
  }
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


// TODO: Разные карточки для разного типа