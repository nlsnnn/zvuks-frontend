import { Link } from "react-router-dom";
import styles from "./FriendCard.module.css";
import { useEffect, useState } from "react";
import { friendStore } from "../../../store/friendStore";

export const FriendCard = ({ type, username, picturePath, id }) => {
  const [topBtn, setTopBtn] = useState(null)
  const [downBtn, setDownBtn] = useState(null)

  useEffect(() => {
    if (type == 'my') {
      setTopBtn('Написать')
      setDownBtn('Удалить')
    } else if (type == 'sended') {
      setTopBtn('Отменить')
    } else {
      setTopBtn('Принять')
      setDownBtn('Отклонить')
    }
  }, [type])

  const handleTopBtn = async (userId) => {
    if (type == 'pending') {
      await friendStore.acceptRequest(userId);
      await friendStore.getPending();
    } else if (type == 'sended') {
      console.log(userId);
    }
  }

  return (
    <div className={styles.container} id={id}>
      <img src={picturePath} className={styles.image} alt="Friend Image" />
      <h3 className={styles.title}>{username}</h3>
      {type == 'my' && 
      <Link to='/chats'>
        <span className={styles.link}>{topBtn}</span>
      </Link>}
      {type != 'my' &&
      <span className={styles.link} onClick={() => handleTopBtn(id)}>{topBtn}</span> 
      }
      {downBtn && <button className={styles.delete}>{downBtn}</button>}
    </div>
  );
};