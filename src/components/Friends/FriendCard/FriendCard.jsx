import { Link } from "react-router-dom";
import styles from "./FriendCard.module.css";
import { useEffect, useState } from "react";
import { friendStore } from "../../../store/friendStore";
import { userStore } from "../../../store/userStore";

export const FriendCard = ({ type, username, picturePath, id, status }) => {
  const [topBtn, setTopBtn] = useState(null)
  const [downBtn, setDownBtn] = useState(null)

  useEffect(() => {
    if (userStore.user && id === userStore.user.id) {
      console.log('kek');
      setTopBtn(null);
      setDownBtn(null);
    } else if (type === 'global') {
      switch (status) {
        case 'friends':
          setTopBtn('Написать');
          setDownBtn('Удалить');
          break;
        case 'pending':
          setTopBtn('Отменить заявку');
          setDownBtn(null);
          break;
        case 'none':
          setTopBtn('Добавить');
          setDownBtn(null);
          break;
        default:
          setTopBtn(null);
          setDownBtn(null);
      }
    } else if (type === 'my') {
      setTopBtn('Написать');
      setDownBtn('Удалить');
    } else if (type === 'sended') {
      setTopBtn('Отменить');
    } else if (type === 'pending') {
      setTopBtn('Принять');
      setDownBtn('Отклонить');
    }
  }, [type, status]);

  const handleTopBtn = async (userId) => {
    if (type == 'pending') {
      await friendStore.acceptRequest(userId);
      await friendStore.getPending();
    } else if (type == 'sended') {
      await friendStore.rejectRequest(userId);
      await friendStore.getSended();
    } else if (type == 'global') {
      if (status === "none") {
        await friendStore.sendRequest(userId);
        setTopBtn("Заявка отправлена!")
      } else if (status === 'pending') {
        await friendStore.rejectRequest(userId);
        setTopBtn("Добавить");
      }
    }
  }

  return (
    <div className={styles.container} id={id}>
      <img src={picturePath} className={styles.image} alt="Friend Image" />
      <h3 className={styles.title}>{username}</h3>
      {type === 'my' && topBtn && (
        <Link to='/chats'>
          <span className={styles.link}>{topBtn}</span>
        </Link>
      )}
      {type !== 'my' && topBtn && (
        <span className={styles.link} onClick={() => handleTopBtn(id)}>
          {topBtn}
        </span>
      )}
      {downBtn && <button className={styles.delete}>{downBtn}</button>}
    </div>
  );
};