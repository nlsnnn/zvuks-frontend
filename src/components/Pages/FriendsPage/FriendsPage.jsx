import { Header } from "../../Header/Header";
import { Friends } from "../../Friends/Friends";
import styles from "./FriendsPage.module.css";
import { useState } from "react";

export const FriendsPage = () => {
  const [friendsType, setFriendsType] = useState("my");
  
  return (
    <>
      <Header />
      <main className="container">
        <div className={styles.flexColCenter}>
          <div className={styles.flexRowSpaceBetween}>
            <div>
              <h2 className={styles.title}>Друзья</h2>
              <div
                className={`${styles.flexGap4} ${styles.flexColCenterSmRow}`}
              >
                <input
                  type="text"
                  className={styles.inputStyle}
                  placeholder="Имя..."
                />
                <button
                  className={`${styles.buttonStyle} ${styles.maxSmWidthHalf}`}
                >
                  Найти
                </button>
              </div>
            </div>

            <div className="flex gap-2 font-semibold">
              <span
                className={`cursor-pointer ${styles.hover}`}
                onClick={() => setFriendsType("sended")}
              >
                Исходящие
              </span>
              <span
                className={`cursor-pointer ${styles.hover}`}
                onClick={() => setFriendsType("pending")}
              >
                Подписчики
              </span>
            </div>
          </div>
        </div>
        <Friends type={friendsType} />
      </main>
    </>
  );
};
